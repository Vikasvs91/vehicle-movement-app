const express = require('express');
const cors = require('cors');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();
const PORT = 5000;

app.use(cors());

// Serve initial data
app.get('/api/vehicle', (req, res) => {
    fs.readFile('./data/vehicleData.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected');
    
    // Send real-time data to clients
    setInterval(() => {
        fs.readFile('./data/vehicleData.json', (err, data) => {
            if (err) {
                console.error('Error reading data');
            } else {
                ws.send(data);
            }
        });
    }, 5000); // Send data every 5 seconds

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
