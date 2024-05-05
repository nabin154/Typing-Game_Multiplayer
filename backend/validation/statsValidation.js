const joi = require("joi");


const addStatsValidationSchema = joi.object({
    wpm: joi.number().required(),
    timeTaken: joi.required(),
    errors: joi.number().required(),
    mode: joi.string().required(),

});


const addStatsValidation = async (req, res, next) => {
    
    const { error } = addStatsValidationSchema.validate(req.body);
    if (error) {
        return next(error);
    }
    next()
};


module.exports = { addStatsValidation }