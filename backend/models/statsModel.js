
const mongoose = require('mongoose');


const statsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    wpm: { type: Number, required: true },
    errors: { type: Number, required: true },
    mode: { type: String, required: true },
    timeTaken: { type: Number, required: true },
},
    {
        timestamps: true,
    });

    const Stats = new mongoose.model("Stats" ,statsSchema);

    module.exports = Stats;