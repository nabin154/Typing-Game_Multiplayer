const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const { successResponse, failedResponse } = require("../utils/apiResponse");
const { JWT_REFRESH_TOKEN, JWT_ACCESS_TOKEN } = require("../utils/envData");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, image, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exist for given email !");
    }
    try {
        const user = await User.create({
            name,
            email,
            image,
            password
        });
        if (user) {
            res.status(201).json(successResponse('User created Successfully !', user));
        } else {
            res.status(400).json(failedResponse('Error while creating the user'));
        }

    } catch (err) {
        throw new Error('Internal server error while creating the User');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("User doesn't exist for the given email!");
        }
        const isVerified = await user.comparePassword(password);
        if (isVerified) {
            const accessToken = await user.generateToken();
            const refreshToken = await user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save();

            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                secure: true,
                sameSite: 'none',
                // sameSite: 'strict', 
            };

            res.cookie('accessToken', accessToken, cookieOptions);
            res.cookie('refreshToken', refreshToken, cookieOptions);

            const response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: accessToken,
                image: user.image,
            };
            res.status(200).json(successResponse('Logged in successfully!', response));
        } else {
            res.status(400).json(failedResponse('Invalid credentials!'));
        }
    } catch (error) {
        throw new Error("Invalid email or password!")
    }
});


const createNewToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(403).json(failedResponse('RefreshToken is missing!'));
    }

    try {
        const decoded = await jwt.verify(refreshToken, JWT_REFRESH_TOKEN);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json(failedResponse('Invalid refresh Token!'));
        }

        if (refreshToken !== user.refreshToken) {
            return res.status(402).json(failedResponse('Expired or used refresh Token!'));
        }

        const accessToken = await jwt.sign({ _id: decoded._id, email: decoded.email }, JWT_ACCESS_TOKEN, { expiresIn: "10m" });
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: 'none',
            // sameSite: 'strict', 
        };
        res.cookie("accessToken", accessToken, cookieOptions);

        return res.status(200).json(successResponse('New Access Token created!', { accessToken: accessToken }));
    } catch (error) {
        res.status(403);
        throw new Error("Internal server error while creating token !")
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    try {
        await User.findByIdAndUpdate(id, {
            $unset: {
                refreshToken: 1,
            }
        }, {
            new: true
        });

        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out, please try again.' });
            }
            res.clearCookie('accessToken', { httpOnly: true });
            res.clearCookie('refreshToken', { httpOnly: true });
            res.clearCookie('connect.sid', { httpOnly: true });

            res.status(200).json(successResponse("Logged Out successfully!"));
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Internal server error!" });
    }
});


const googleSuccessLogin = async (req, res) => {
    const { _id, name, email, image } = req.user;
    const user = await User.findById(_id);
    const accessToken = await user.generateToken();
    const refreshToken = await user.generateRefreshToken();

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'none',
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
};




module.exports = { registerUser, loginUser, createNewToken, logoutUser, googleSuccessLogin }