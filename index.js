const express = require('express');
const path = require('path');
require('dotenv').config();

// Express app
const app = express();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) => {
    
    if (error) throw new Error('Something bad happened...', error);

    console.log('Server is running at port:', process.env.PORT);
});