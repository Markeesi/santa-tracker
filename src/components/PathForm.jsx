import React, { useState } from 'react';
import opencage from 'opencage-api-client';

const PathForm = ({ onPathSubmit, defaultValue }) => {
    const [path, setPath] = useState(defaultValue || '');

    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    const apiKey = import.meta.env.VITE_API_KEY;

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const cities = path.split(',');
        const coordinates = [];

        for (const city of cities) {
          const response = await opencage.geocode({ q: city.trim(), key: apiKey });
          if (response.results && response.results.length > 0 && response.results[0].geometry && response.results[0].geometry.lat && response.results[0].geometry.lng) {
            const { lat, lng } = response.results[0].geometry;
            coordinates.push([lat, lng]);
            await delay(2000); // Delay for 2 second
          }
        }
        onPathSubmit(coordinates);
      };
   

  return (
    <form onSubmit={handleSubmit} className="navbar">
      <label>
        Enter Santa's path (cities):
        <input type="text" value={path} onChange={event => setPath(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PathForm;