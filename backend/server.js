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
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

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
server.listen(port , ()=>{
    console.log(`Server is listening at port ${port}`.yellow.bold);
});


const onlineUsers = new Map();
const io = socketIo(server, {
    pingTimeout: 60000,
    cors: {
        origin: REACT_APP_URL,
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log('socket connected');

    socket.on('setup' ,(userData)=>{
        socket.join(userData._id);
        onlineUsers.set(socket.id , userData);
        console.log("user connected", userData._id);
        io.emit("online users" , Array.from(onlineUsers));
    });

    socket.on('challenge',(data)=>{
        const {id , user} = data;
socket.to(id).emit('challenge received', user);
    })
    socket.on('challenge accepted', (data)=>{
        const { challenger, user } = data;
socket.to(challenger._id).emit('challenge connected', user);
    })
    socket.on('challenge rejected',(friend)=>{
socket.to(friend._id).emit('challenge cancelled', friend);
    })


    socket.on("disconnect", () => {
        onlineUsers.delete(socket.id);
        io.emit("online users", Array.from(onlineUsers));
    });
    socket.off("setup", () => {

        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
