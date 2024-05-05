const express =  require("express");
const {registerUser} = require('../controllers/authController');
const { registerValidation } = require("../validation/authValidation");

const router = express.Router();

router.route('/register').post(registerValidation , registerUser);


module.exports = router;