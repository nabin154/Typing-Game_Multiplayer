const joi = require("joi");


const getUserValidationSchema = joi.object({
    id: joi.string().required(),
  

});


const getUserValidation = async (req, res, next) => {

    const { error } = getUserValidationSchema.validate(req.params);
    if (error) {
        res.status(400);
        return next(error);
    }
    next()
};


module.exports = { getUserValidation }