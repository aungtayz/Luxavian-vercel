import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import userModel from './model.js';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (!GOOGLE_CLIENT_SECRET) {
    throw new Error('GOOGLE_CLIENT_SECRET is not defined in the environment variables');
}

if(GOOGLE_CALLBACK_URL === undefined) {
    console.log('No Google Callback URL found');
    process.exit(1);
}
if(GOOGLE_CLIENT_ID === undefined) {
    console.log('No Google Client ID found');
    process.exit(1);
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID ,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['profile', 'email']
  },


    async (req, accessToken:any, refreshToken: any, profile: any, done:any) => {
      console.log('GoogleStrategy callback triggered'); 
      console.log(profile.id)
      try {
        let user = await userModel.findOne({googleId: profile.id});

        if(!user) {
         user = new userModel({
             googleId: profile.id,
             email: profile.emails[0]?.value || '',
             name: profile.displayName,
             avatar: profile.photos[0]?.value || ''
         })
         console.log('User created:', user);
         await user.save();
        }
        return done(null, user);
      }catch (err) {

        console.log(err);
        return done(err,null)
      }
    }
));

passport.serializeUser((user: any, done: any) => {
  console.log('Serializing user:', user.googleId);
    done(null, user.googleId);
});

passport.deserializeUser(async (id, done:any) => {
  console.log('Deserializing user with googleId:', id);
  try {
    const user = await userModel.findOne({ googleId: id });
    if(!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  }catch (err) {
    done(err,null)
  }
});

console.log("Google strategy has been initialized!"); // Debugging log
export default passport
