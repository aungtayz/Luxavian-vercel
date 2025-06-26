import express from 'express';
import { createServer } from 'http';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './lib/passport.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import sharedsession from 'express-socket.io-session';
import usersRoute from './api/usersRoute.js';
import postRoute from './api/postRoute.js';
import messageModel from './lib/message.js';
import protectedRoute from './api/protectedRoute.js';
import profileRoute from './api/porfileRoute.js';
import messageRoute from './api/messageRoute.js';
dotenv.config();
// Environment variables
const { SESSION_SECRET, CORS_ORIGIN, MONGO_URI, NODE_ENV } = process.env;
if (!SESSION_SECRET || !CORS_ORIGIN || !MONGO_URI) {
    console.error('Missing required environment variables');
    process.exit(1);
}
// Initialize Express app
const app = express();
const server = createServer(app);
// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
// MongoDB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
// Middleware
app.use((req, res, next) => {
    console.log(`🚀 Incoming Request: ${req.method} ${req.url}`);
    next();
});
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
const expressSection = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: 'lax' },
});
app.use(expressSection);
io.use(sharedsession(expressSection, { autoSave: true }));
app.use(passport.initialize());
app.use(passport.session());
io.on('connection', (socket) => {
    console.log('🧪 New client connected with id:', socket.id);
    io.emit('connection', ' connected with id: ' + socket.id);
    socket.on('private_room', (room) => {
        socket.join(room);
        console.log(`✅ ${socket.id} joined room ${room}`);
        const clients = Array.from(io.sockets.adapter.rooms.get(room) || []);
        console.log(`🧑‍🤝‍🧑 Clients in ${room}:`, clients);
    });
    socket.on('set_username', (username) => {
        socket.username = username;
    });
    socket.on('message', (message, room) => {
        console.log(`📨 Message received: ${message} from ${room}`);
        const payload = {
            message,
            room,
            sender: socket.username || 'Anonymous',
        };
        try {
            const savedMessage = new messageModel(payload);
            savedMessage.save();
            if (!room) {
                io.emit('message', message, socket.username);
            }
            else {
                socket.to(room).emit('message', message, socket.username);
                socket.emit('message', message, socket.username);
            }
        }
        catch (err) {
            throw new Error('Error saving message to database');
        }
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected with id:', socket.id);
    });
});
// Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    if (!req.user) {
        return res.status(500).json({ message: 'Server Error' });
    }
    res.redirect(`${CORS_ORIGIN}/app/profile`);
});
app.get('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        // ✅ Clear the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Session destruction failed' });
            }
            // ✅ Clear the cookie
            res.clearCookie('connect.sid', { path: '/' });
            console.log('User logged out and session destroyed');
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});
app.use('/api/users', usersRoute);
app.use('/api/posts', postRoute);
app.use('/api/protected', protectedRoute);
app.use('/api/profile', profileRoute);
app.use('/api/message', messageRoute);
// Start the server
const startServer = async () => {
    await connectToDatabase();
    const PORT = 5000;
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};
startServer();
