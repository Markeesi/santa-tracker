// Map.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Santa from './Santa';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map = ({ santaPath }) => {
  const [santaPosition, setSantaPosition] = useState([68.0736, 29.3153]);
  const [pathIndex, setPathIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(santaPath)) return; // Add this line

    const interval = setInterval(() => {
      setPathIndex((pathIndex + 1) % santaPath.length);
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [pathIndex, santaPath.length]);

  useEffect(() => {
    if (!Array.isArray(santaPath)) return; // Add this line

    setSantaPosition(santaPath[pathIndex]);
  }, [pathIndex, santaPath]);

  return (
    <MapContainer center={santaPosition} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <ChangeView center={santaPosition} zoom={6} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Santa position={santaPosition} />
    </MapContainer>
  );
};

export default Map;