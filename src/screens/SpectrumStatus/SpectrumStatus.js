import React, { useState, useEffect } from "react";
import { SpectrumStatusAPI } from "../../constant";
import "./SpectrumStatus.css";

const SpectrumStatus = () => {
  const [sensorData, setSensorData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SpectrumStatusAPI);
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Spectrum Sensor Monitor</h1>
      {sensorData && (
        <div className="data-container">
          <p className="data">Velocity: {sensorData.velocity} m/s</p>
          <p className="data">Altitude: {sensorData.altitude} meters</p>
          <p className="data">Temperature: {sensorData.temperature} °C</p>
          <p className="data">Status: {sensorData.status}</p>
          <p className="data">
            Ascending: {sensorData.ascending ? "Yes" : "No"}
          </p>
          <p className="data">
            Requires User Action: {sensorData.requiresAction ? "Yes" : "No"}
          </p>
        </div>
      )}
      <button className="button" onClick={fetchData}>
        Refresh Data
      </button>
    </div>
  );
};

export default SpectrumStatus;
