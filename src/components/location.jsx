import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LocationTracker() {
  const [place, setPlace] = useState('');
  useEffect(() => {
    // Function to fetch the user's current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationToBackend);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    // Function to send the location data to the backend
    const sendLocationToBackend = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ba76f9c1634b42c096c5d0b57d9c18e0`);
        
        if (response) {
          const placeName = response.data.features[0].properties.formatted;
          console.log('Place Name:', placeName);
          setPlace(placeName);
          
          // Send the location data along with place name to the backend
          // await axios.post('/backend-url', { latitude, longitude, placeName });
          
          console.log('Location data sent successfully.');
        } else {
          console.error('Failed to retrieve place name.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Call the function to get the current location
    getCurrentLocation();

  }, []);

  return (
    <>
      <h3>{place}</h3>
    </>
  ); // This component doesn't render anything visible
}

export default LocationTracker;
