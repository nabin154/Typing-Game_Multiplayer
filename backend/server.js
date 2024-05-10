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
const http = require('http');
const session = require("express-session");
const passport = require("passport");
const initializeSocket = require("./socket");
const googleAuthRoutes = require("./routes/googleRoutes");


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: REACT_APP_URL,
    credentials: true
}));

app.use(session({
    secret: "hfjksdh7668",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
connectDB();

app.get('/', (req, res) => {
    res.send(" hello from the server.")
});

app.use(googleAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);
app.use(routeNotFound);
app.use(errorHandler);

initializeSocket(server);
const port = PORT || 5001;
server.listen(port, () => {
    console.log(`Server is listening at port ${port}`.yellow.bold);
});
