const express = require("express");
const dotenv = require('dotenv').config();
const colors = require('colors');
const { PORT } = require("./utils/envData");
const connectDB = require("./utils/dbSetup");
const app = express();

app.use(express.json());

app.get('/' , (req, res)=>{
    res.send(" hello from the server.")
});

connectDB();
const port = PORT || 5001;
app.listen(port , ()=>{
    console.log(`Server is listening at port ${port}`.yellow.bold);
});

