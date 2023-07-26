const { io } = require('../index');

// Socket messages
io.on('connection', (client) => {
    client.on('event', (data) => {
        console.log('Connected client');
    });
    
    client.on('disconnect', () => {
        console.log('Desconected client');
    });

    client.on('sendMessage', (data, callback) => {
        console.log('data', data);
    });
});