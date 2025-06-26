import messageModel from "../lib/message.js";
import express from "express";
const messageRoute = express.Router();
messageRoute.route('/').get(async (req, res) => {
    const room = req.query.roomid;
    console.log(room);
    try {
        const messages = await messageModel.find({ room: room }).sort({ timestamp: -1 }).limit(50);
        if (!messages) {
            return res.json({ message: 'No messages found' });
        }
        return res.json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
export default messageRoute;
