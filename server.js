let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 4555;

io.on('connection', (socket) => {
    console.log('user connected',socket.id);

    socket.on('new-message', (message) => {
        console.log("recived msg",message)
        io.emit('new-message', message.text+ Math.random());
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});