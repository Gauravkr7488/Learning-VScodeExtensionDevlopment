const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from VS Code Extension!', status: 'success' });
});

app.post('/api/data', (req, res) => {
    const receivedData = req.body; // Get data from request body
    console.log('Received Data:', receivedData);

    res.json({
        message: 'Data received successfully!',
        received: receivedData,
    });
});

function StartServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });

    console.log("what???")
}

module.exports = { StartServer };