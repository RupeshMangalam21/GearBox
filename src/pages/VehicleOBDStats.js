import React, { useState } from 'react';

const VehicleOBDStats = () => {
  const [vehicleRegistered, setVehicleRegistered] = useState(false);
  const [vehicleStats, setVehicleStats] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegisterVehicle = () => {
    setLoading(true);
    setVehicleRegistered(true);
    // Simulate fetching OBD stats
    setTimeout(() => {
      setVehicleStats({ engineStatus: "Normal", fuelLevel: "Full", speed: "0 mph" });
      setLoading(false);
    }, 1000);
    useEffect(() => {
      const fetchVehicleStats = async () => {
        const response = await fetch('/api/vehicle');
        const data = await response.json();
        setVehicleStats(data);
      };
  
      fetchVehicleStats();
    }, []);
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
          {vehicleStats.map((stat) => (
        <div key={stat.id}>
          <div>Engine Status: {stat.engineStatus}</div>
          <div>Fuel Level: {stat.fuelLevel}</div>
          <div>Speed: {stat.speed}</div>
        </div>
      ))}
        </div>
      )}
    </div>
  );
};

export default VehicleOBDStats;
