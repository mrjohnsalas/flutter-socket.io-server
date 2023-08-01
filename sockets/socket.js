const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

// Socket messages
io.on('connection', (client) => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands());

    client.on('event', (data) => {
        console.log('Connected client');
    });
    
    client.on('disconnect', () => {
        console.log('Disconnected client');
    });

    client.on('sendMessage', (payload) => {
        io.emit('sendMessage', payload);
    });
    
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
});