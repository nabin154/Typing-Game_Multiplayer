const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN } = require('../utils/envData');
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const { failedResponse } = require('../utils/apiResponse');

const auth = asyncHandler(async (req, res, next) => {
    try {
        let accessToken = req.header("Authorization")?.split(" ")[1] || req.cookies?.accessToken;

        if (!accessToken) {
            return res.status(404).json(failedResponse("Token is missing !"));
        }

        const isVerified = jwt.verify(accessToken, JWT_ACCESS_TOKEN);
        if (isVerified) {
            const user = await User.findById(isVerified._id);
            if (!user) {
                return res.status(404).json(failedResponse("User not found : wrong token !"));
            }
            req.user = user;
            next();
        } else {
            return res.status(401).json(failedResponse("Unauthorized :Token is invalid or expired! "));
        }
    } catch (error) {
        throw new Error("Unauthorized : Internal server error !");
    }
});

module.exports = auth;
