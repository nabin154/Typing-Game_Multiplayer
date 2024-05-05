const express =  require("express");
const { registerUser, loginUser, createNewToken, logoutUser } = require('../controllers/authController');
const { registerValidation, loginValidation } = require("../validation/authValidation");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/register').post(registerValidation , registerUser);
router.route('/login').post(loginValidation , loginUser);
router.route('/refresh-token').post(createNewToken);
router.route('/logout').post(auth ,logoutUser);


module.exports = router;