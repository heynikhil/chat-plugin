const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => { res.send("Welcome to paradisextrade") })

const server = app.listen(4555, () => {
    console.log('Magic Started on:: '+ ":" + 4555)
})
const io = socketIO(server, {
    pingInterval: 2000,
    pingTimeout: 60000
});
io.on('connection', (socket) => {
    console.log('user connected',socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: Math.random()});    
    });
});
