import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SpectrumWSAPI } from "../../constant";
import "./SpectrumMonitor.css";

const SpectrumMonitor = () => {
  const [sensorData, setSensorData] = useState({});
  const [isActionRequired, setIsActionRequired] = useState(false);

  useEffect(() => {
    const socket = new W3CWebSocket(SpectrumWSAPI);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update sensor data
      setSensorData(data);

      // Check if action is required
      if (data.isActionRequired) {
        // Inform the user about critical status change
        alert("Critical status change: Action is required!");

        // Set the state to handle UI updates
        setIsActionRequired(true);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleActOnSpectrum = () => {
    // Implement the logic to act on Spectrum using the ActOnSpectrum endpoint
    // You can make a POST request to the ActOnSpectrum endpoint.
    // Example:
    // fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ action: 'your-action-here' }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response if needed
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="container">
      <h1 className="heading">Spectrum Monitor</h1>
      <div className="data-container">
        <div className="data">Velocity: {sensorData.Velocity}</div>
        <div className="data">Altitude: {sensorData.Altitude}</div>
        <div className="data">Temperature: {sensorData.Temperature}</div>
        {/* Add more sensor data fields as needed */}
      </div>
      {isActionRequired && (
        <div>
          <strong>Attention:</strong> Critical status change - Action is
          required!
          <button onClick={handleActOnSpectrum}>Act on Spectrum</button>
        </div>
      )}
    </div>
  );
};

export default SpectrumMonitor;
