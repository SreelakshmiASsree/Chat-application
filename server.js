const express = require('express');
const path = require('path');
const dotenv = require("dotenv").config();
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (Socket) => {
    console.log("user connected");


    Socket.on('chat message', (msg) => {
         io.emit('chat message', msg);
        // Socket.broadcast.emit(' chat message', msg);
        console.log('chat message:' + msg);
    })
})

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
})