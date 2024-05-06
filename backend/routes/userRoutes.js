
const express = require('express');
const {getUser } = require("../controllers/userController.js");
const { getUserValidation } = require('../validation/userValidation.js');

const router = express.Router();

router.route("/:id").get(getUserValidation , getUser);


module.exports = router;