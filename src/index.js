const express = require('express');
const cors = require('cors');
const io = require('socket.io');
const test = require('./routes/cryptoRequest');

const routes = require('./routes/index');

const app = express();

<<<<<<< HEAD

// io.on('connection', (socket) => {
//    socket.on('chat message', (msg) => {
//      console.log('message: ' + msg);
//    });
//  });
=======
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });
>>>>>>> 8b226c4eba974ac63c6ada0d0688e79717c4117b

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
