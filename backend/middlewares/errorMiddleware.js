const { failedResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        status : false,
        message: err.message,
    });
    
};

const routeNotFound = (req , res)=>{
    return res.status(404).json(failedResponse('NOT FOUND : This Route doesnt exists !'));
}


module.exports = { errorHandler, routeNotFound }