// auth/googleAuth.js
const passport = require("passport");
const User = require("../models/userModel");
const { successResponse } = require("../utils/apiResponse");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../utils/envData");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const clientId = GOOGLE_CLIENT_ID;
const clientSecret = GOOGLE_CLIENT_SECRET;

passport.use(
    new OAuth2Strategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });
                if (!user) {
                    user = new User({
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        image: profile.photos[0].value,
                        password: 'www',
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const router = require("express").Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/googlelogin",
    failureRedirect: "http://localhost:5173/"
}));

router.get("/google-login-success", async (req, res) => {
    const { _id, name, email, image } = req.user;
    const user = await User.findById(_id);
    const accessToken = await user.generateToken();
    const refreshToken = await user.generateRefreshToken();

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    const response = {
        _id,
        name,
        email,
        image,
        token: accessToken,
    };
    res.status(200).json(successResponse('Logged in successfully!', response));
});

router.get("/google-login-failure", (req, res) => {
    res.status(401).json({ message: "Google login failed." });
});

module.exports = router;
