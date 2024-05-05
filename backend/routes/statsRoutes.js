
const express = require('express');
const { addStats, getGraphData, getAllstats } = require("../controllers/statsController.js");
const { addStatsValidation } = require('../validation/statsValidation.js');
const auth = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route("/").get(auth, getGraphData);
router.route("/:userId").get(auth, getAllstats);
router.route("/addstats").post(auth , addStatsValidation , addStats);


module.exports = router;