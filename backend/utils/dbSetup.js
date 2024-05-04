const mongoose = require('mongoose');
const { MONGODB_URI } = require('./envData');

const connectDB = async () => {
    try {

        const isConnected = await mongoose.connect(MONGODB_URI);
        if (isConnected) {
            console.log('MongDB connected successfully !'.bgBlue);
        }
        else {
            console.log('Error connecting to the database!'.red, error.message);
        }

    } catch (error) {
        console.log('Error connecting to the database!'.red, error.message);
    }
}

module.exports = connectDB;