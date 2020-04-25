const express = require('express');
const cors = require('cors');
const io = require('socket.io');
const test = require('./routes/cryptoRequest');

const routes = require('./routes/index');

const app = express();


// io.on('connection', (socket) => {
//    socket.on('chat message', (msg) => {
//      console.log('message: ' + msg);
//    });
//  });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
