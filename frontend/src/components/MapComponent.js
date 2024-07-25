import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ vehicleData }) => {
    const position = vehicleData.length ? [vehicleData[0].latitude, vehicleData[0].longitude] : [0, 0];
    const polylinePositions = vehicleData.map(data => [data.latitude, data.longitude]);

    return (
        <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {vehicleData.map((data, index) => (
                <Marker key={index} position={[data.latitude, data.longitude]} />
            ))}
            <Polyline positions={polylinePositions} color="blue" />
        </MapContainer>
    );
};

export default MapComponent;
