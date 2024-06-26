const Stats = require('../models/statsModel');
const User = require("../models/userModel");
const { successResponse, failedResponse } = require('../utils/apiResponse');
const asyncHandler = require('express-async-handler');


const addStats = asyncHandler(async (req, res) => {

    const { wpm, errors, timeTaken, mode } = req.body;
    const userId = req.user._id;
    try {
        const stat = await Stats.create({
            userId,
            wpm,
            errors,
            timeTaken,
            mode,
        });
        let user = await User.findById(userId);
        if (user) {
            if (user.highScore < wpm) {
                user.highScore = wpm;
                await user.save();
            }
        }
        else{
            res.status(400);
            throw new Error("Failed to add the stats!");
        }
        if (stat) {
            return res.status(201).json(successResponse("Stats created successfully !", stat));
        }
        else {
            res.status(400);
            throw new Error("Failed to add the stats!");
        }
    } catch (error) {
        throw new Error("Internal server error!");
    }

});


const getGraphData = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let result = [];

    try {

        const playedEasy = await Stats.find({ userId: userId, mode: 'easy' });
        const errorsEasy = playedEasy.reduce((acc, currValue) => {
            return acc + currValue.errors;
        }, 0);
        const easyCount = await Stats.countDocuments({ userId: userId, mode: 'easy' });
        const averageEasyErrors = Math.floor(errorsEasy / easyCount);
        result = [...result, { name: "easy", played: easyCount, AvgErrors: averageEasyErrors }];


        const playedMedium = await Stats.find({ userId: userId, mode: 'medium' });
        const errorsMedium = playedMedium.reduce((acc, currValue) => {
            return acc + currValue.errors;
        }, 0);
        const mediumCount = await Stats.countDocuments({ userId: userId, mode: 'medium' });
        const averageMediumErrors = Math.floor(errorsMedium / mediumCount);

        result = [...result, { name: "medium", played: mediumCount, AvgErrors: averageMediumErrors }];



        const playedDifficult = await Stats.find({ userId: userId, mode: 'difficult' });
        const errorsDifficult = playedDifficult.reduce((acc, currValue) => {
            return acc + currValue.errors;
        }, 0);
        const difficultCount = await Stats.countDocuments({ userId: userId, mode: 'difficult' });
        const averageDifficultErrors = Math.floor(errorsDifficult / difficultCount);

        result = [...result, { name: "difficult", played: difficultCount, AvgErrors: averageDifficultErrors }];

        // const allStatsOfUser = await Stats.find({userId: userId});
        // const finalStats = [allStatsOfUser , result];

        return res.status(200).json(successResponse("Data found Successfully !", result));


    } catch (error) {
        throw new Error("Internal server error !");
    }

});


const getAllstats = asyncHandler(async (req ,res)=>{
    const {userId} = req.params;
try {
    const allData = await Stats.find({userId : userId});
    if(allData){
        res.status(200).json(successResponse('Data Found Successfully !', allData));
    }else{
        return res.status(400).json(failedResponse('Error while getting the data!'));
    }
} catch (error) {
    throw new Error("Internal server error!"); 
    
}
});



module.exports = { addStats, getGraphData, getAllstats }