const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const { successResponse, failedResponse } = require("../utils/apiResponse");

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
            res.status(201).json(successResponse('success', 'User created Successfully !', user));
        } else {
            res.status(400).json(failedResponse('Error while creating the user'));
        }

    } catch (err) {
        throw new Error('Internal serer error while creating the User');
    }
});


module.exports = { registerUser }