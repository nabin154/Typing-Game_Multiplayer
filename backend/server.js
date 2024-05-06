const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const colors = require('colors');
const { PORT, REACT_APP_URL } = require("./utils/envData");
const connectDB = require("./utils/dbSetup");
const authRoutes = require("./routes/authRoutes");
const statsRoutes = require("./routes/statsRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, routeNotFound } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: REACT_APP_URL,
    credentials  : true
}))
connectDB();

app.get('/' , (req, res)=>{
    res.send(" hello from the server.")
});


app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);


app.use(routeNotFound);
app.use(errorHandler);

const port = PORT || 5001;
app.listen(port , ()=>{
    console.log(`Server is listening at port ${port}`.yellow.bold);
});

