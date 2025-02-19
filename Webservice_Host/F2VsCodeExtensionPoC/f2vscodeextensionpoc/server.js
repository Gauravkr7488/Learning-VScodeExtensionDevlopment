const express = require('express');
const EventEmitter = require('events');

const app = express();
const eventEmitter = new EventEmitter()
app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from VS Code Extension!', status: 'success' });
});

app.post('/api/data', (req, res) => {
    const receivedData = req.body; // Get data from request body
    console.log('Received Data:', receivedData);
    const message = receivedData?.message || 'No message received';
    eventEmitter.emit('messageUpdated', message);
    res.json({
        message
    });
});

function StartServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}



module.exports = { StartServer, eventEmitter };