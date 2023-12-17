import React, { useState } from 'react';
import Map from './components/Map';
import PathForm from './components/PathForm';
import "./App.css";

function App() {
  // Initialize santaPath with a default position
  const [santaPath, setSantaPath] = useState([[68.0736, 29.3153]]);


  function interpolate(start, end, steps) {
    if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
        throw new Error('Start and end must be arrays of two numbers.');
    }
    if (!Number.isInteger(steps) || steps <= 0) {
        throw new Error('Steps must be a positive integer.');
    }

    const latStep = (end[0] - start[0]) / steps;
    const lngStep = (end[1] - start[1]) / steps;
  
    const path = [];
    for (let i = 0; i <= steps; i++) {
        const lat = start[0] + i * latStep;
        const lng = start[1] + i * lngStep;
        path.push([lat, lng]);
    }
  
    return path;
}

  const handlePathSubmit = (path) => {
    const steps = 12; // Number of steps between each pair of coordinates
    const interpolatedPath = [];
  
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      const segment = interpolate(start, end, steps);
  
      // Add the interpolated segment to the path, excluding the last point because it will be the start point of the next segment
      interpolatedPath.push(...segment.slice(0, -1));
    }
  
    // Add the last point of the last segment
    interpolatedPath.push(path[path.length - 1]);
  
    setSantaPath(interpolatedPath);
  };

  return (
    <div className="App">
  
      <PathForm onPathSubmit={handlePathSubmit} defaultValue="Korvatunturi" />
      
      <Map santaPath={santaPath}/>
    </div>
  );
}

export default App;
