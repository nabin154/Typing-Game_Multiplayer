const joi = require('joi');


const registerValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    image: joi.string().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")).required()

});



const registerValidation = (req , res , next) => {
    const { error } = registerValidationSchema.validate(req.body);
    if(error){
        return next(error);
    }
    next()
}


module.exports = { registerValidation }