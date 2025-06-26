import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import userModel from './model.js';
import dotenv from 'dotenv';
dotenv.config();
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (GOOGLE_CALLBACK_URL === undefined) {
    console.log('No Google Callback URL found');
    process.exit(1);
}
if (process.env.GOOGLE_CLIENT_ID === undefined || process.env.GOOGLE_CLIENT_SECRET === undefined) {
    console.log('No Google Client ID or Client Secret found');
    process.exit(1);
}
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
            user = new userModel({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, null);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
});
module.exports = passport;
