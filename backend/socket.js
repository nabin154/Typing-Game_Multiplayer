const socketIo = require('socket.io');
const { REACT_APP_URL } = require('./utils/envData');

const initializeSocket = (server) => {

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

        socket.on('setup', (userData) => {
            socket.join(userData._id);
            onlineUsers.set(socket.id, userData);
            console.log("user connected", userData._id);
            io.emit("online users", Array.from(onlineUsers));
        });

        socket.on('challenge', (data) => {
            const { id, user } = data;
            socket.to(id).emit('challenge received', user);
        })
        socket.on('challenge accepted', (data) => {
            const { challenger, user } = data;
            socket.to(challenger._id).emit('challenge connected', user);
        })
        socket.on('challenge rejected', (friend) => {
            socket.to(friend._id).emit('challenge cancelled', friend);
        })
        socket.on('game started', (data) => {
            console.log('aayio')
            const { user } = data;
            socket.to(user._id).emit('test started', data);
        })
        socket.on('margin', (data) => {
            console.log('margin')
            const { id, margin } = data;
            socket.to(id).emit('take margin', data);
        })
        socket.on('completed', (data) => {
            console.log('completed')
            const { id } = data;
            socket.to(id).emit('completed game', data);
        });

        socket.on("update status", ({ userId, status }) => {

            const userSocketId = Array.from(onlineUsers.entries()).find(
                ([_, user]) => user._id === userId
            )?.[0];
            console.log(userSocketId)

            if (userSocketId) {
                const user = onlineUsers.get(userSocketId);
                onlineUsers.set(userSocketId, { ...user, status });
                console.log(onlineUsers);
                io.emit("online users", Array.from(onlineUsers));
            }
        });


        socket.on("logout", (userData) => {
            const socketIdToRemove = Array.from(onlineUsers.entries()).find(
                ([_, user]) => user._id === userData._id
            )?.[0];

            if (socketIdToRemove) {
                onlineUsers.delete(socketIdToRemove);
                io.emit("online users", Array.from(onlineUsers));

                socket.leave(userData._id);
            }
        });

        socket.on("disconnect", () => {
            onlineUsers.delete(socket.id);
            io.emit("online users", Array.from(onlineUsers));
        });
        socket.off("setup", () => {

            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });


};

module.exports = initializeSocket;