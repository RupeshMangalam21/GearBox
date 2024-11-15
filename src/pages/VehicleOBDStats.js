import React, { useState } from 'react';

const VehicleOBDStats = () => {
  const [vehicleRegistered, setVehicleRegistered] = useState(false);
  const [vehicleStats, setVehicleStats] = useState({});

  const handleRegisterVehicle = () => {
    setVehicleRegistered(true);
    // Logic to register the vehicle and fetch OBD stats
    setVehicleStats({ engineStatus: "Normal", fuelLevel: "Full", speed: "0 mph" });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {!vehicleRegistered ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Register Your Vehicle</h3>
          <button
            onClick={handleRegisterVehicle}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register Vehicle
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">Vehicle OBD Stats</h3>
          <div className="mb-2">Engine Status: {vehicleStats.engineStatus}</div>
          <div className="mb-2">Fuel Level: {vehicleStats.fuelLevel}</div>
          <div>Speed: {vehicleStats.speed}</div>
        </div>
      )}
    </div>
  );
};

export default VehicleOBDStats;
