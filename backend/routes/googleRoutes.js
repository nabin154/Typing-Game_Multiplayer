const passport = require("passport");
const User = require("../models/userModel");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REACT_APP_URL } = require("../utils/envData");
const { googleSuccessLogin } = require("../controllers/authController");
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
    successRedirect: `${REACT_APP_URL}/googlelogin`,
    failureRedirect: `${REACT_APP_URL}/`
}));

router.get("/google-login-success", googleSuccessLogin)

router.get("/google-login-failure", (req, res) => {
    res.status(401).json({ message: "Google login failed." });
});

module.exports = router;
