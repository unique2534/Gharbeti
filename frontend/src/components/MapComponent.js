import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations data from your Django API
    fetch('http://localhost:8000/api/locations/')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[0, 0]} // Set your initial map center coordinates
        zoom={5} // Set your initial map zoom level
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Use OpenStreetMap as the map provider
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
