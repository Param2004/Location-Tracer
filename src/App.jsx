import React, { useState } from 'react';
import './App.css';
import LocationTracker from './components/location';

function App() {
  const [fetchLocation, setFetchLocation] = useState(false);

  const handleFetchLocation = () => {
    setFetchLocation(true);
  };

  return (
    <>
      <h1>Track Location ⬇️</h1>
      <div className="card">
        <button onClick={handleFetchLocation}>
          Fetch & Send
        </button>
        {fetchLocation && <LocationTracker />}
      </div>
    </>
  );
}

export default App;
