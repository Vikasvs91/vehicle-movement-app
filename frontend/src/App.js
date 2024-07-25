import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import MapComponent from './components/MapComponent';

const App = () => {
    const [vehicleData, setVehicleData] = useState([]);

    useEffect(() => {
        // Fetch initial data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehicle');
                setVehicleData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // WebSocket connection
        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('message', data => {
            setVehicleData(JSON.parse(data));
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Vehicle Movement Map</h1>
            <MapComponent vehicleData={vehicleData} />
        </div>
    );
};

export default App;
