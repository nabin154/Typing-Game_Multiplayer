const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { successResponse, failedResponse } = require('../utils/apiResponse');
const Stats = require('../models/statsModel');



const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findById(id).select("-password -refreshToken");
        if (!user) {
            return res.status(404).json(failedResponse("User not found!"));
        }

        const userStats = await Stats.find({ userId: id });
        let avgSpeed = null;

        if (userStats && userStats.length > 0) {
            const totalSpeed = userStats.reduce((acc, currValue) => acc + currValue.wpm, 0);
            const playedCount = userStats.length;
            avgSpeed = totalSpeed / playedCount;
        }

        return res.status(200).json(successResponse('Data found!', { ...user.toObject(), avgSpeed }));
    } catch (error) {
        return res.status(500).json(failedResponse("Internal server error!"));
    }
});


module.exports = { getUser }