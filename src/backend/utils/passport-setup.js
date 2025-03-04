const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/UserModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // Must match the redirect URI in Google Console
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in the database
        let existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // User already exists, log them in
            return done(null, existingUser);
        }
        
        // If not, create a new user account in the database
        const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            // Additional fields can be added (e.g., userClass, registration date)
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        console.error('Google Strategy Error', error);
        done(error, null);
    }
}));