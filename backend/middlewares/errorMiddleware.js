const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        status : false,
        message: err.message,
    });
    
};


module.exports = {errorHandler}