// var http = require('https');
const express = require('express');
const app = express();
app.use(express.static("public"));

const server = app.listen(process.env.PORT || 5004, () => {
    console.log("listening on port 5004");
});

const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log("user id: ",socket.id)
    //receive from the client
    socket.on('crazyMode', (data) => {
        console.log(data);
        console.log("got data from server")

    })
});
