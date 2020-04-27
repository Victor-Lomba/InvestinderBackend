const express = require('express');
const cors = require('cors');

const test = require('./routes/cryptoRequest');

const routes = require('./routes/index');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    const { id } = socket.handshake.query
    connectedUsers[id] = socket.id
    console.log('Client connectet:', id )

})

io.on('connection', (socket) => {
   socket.on('chat message', (msg) => {
     console.log('message: ' + msg);
   });
 });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
