const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { successResponse, failedResponse } = require('../utils/apiResponse');



const getUser = asyncHandler(async(req, res)=>{

    const {id} = req.params;
    try {
        const user = await User.findById(id).select("-password -refreshToken");
        if(user){
            return res.status(200).json(successResponse('Data found!',user));
        }else{
            return res.status(400).json(failedResponse("Failed fetching the user!"));
        }
    } catch (error) {
        throw new Error("Internal server error!");
    }


});

module.exports = { getUser }