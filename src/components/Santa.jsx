import React from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import santa from "../assets/santa.png";

// Define the Santa icon
const santaIcon = new L.Icon({
  iconUrl: santa,
  iconRetinaUrl: santa,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
 // className: 'leaflet-div-icon'
});

const Santa = ({ position }) => {
  const map = useMap();

  // Center the map on Santa's position
  map.setView(position);

  return <Marker position={position} icon={santaIcon} />;
};

export default Santa;