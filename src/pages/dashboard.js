import React, { useState } from 'react';
import ListItemForm from './ListItemForm';
import dynamic from 'next/dynamic';
import EcommerceListings from './EcommerceListings';
import Header from '../components/header';
import { useClerk } from '@clerk/clerk-react';

const GoogleMapsIntegration = dynamic(() => import('./GoogleMapsIntegration'), {
  ssr: false,
  loading: () => <div>Loading Google Maps...</div>, // Fallback during load
});

const VehicleOBDStats = dynamic(() => import('./VehicleOBDStats'), {
  ssr: false,
  loading: () => <div>Loading Vehicle Stats...</div>, // Fallback during load
});

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState('ecommerce');
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Header />
      <div className="flex flex-col lg:flex-row mt-8">
        
        {/* Left Section */}
        <div className="lg:w-1/4 w-full p-4 bg-green-950 text-black dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] bg-opacity-40 backdrop-blur-lg rounded-lg">
          <div className="mb-8 mt-4">
            <h2 className="bg-green-600 px-4 py-2 rounded-lg text-white text-center lg:text-left">List New Item</h2>
            <ListItemForm />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-center lg:text-left">Nearby Auto Shops</h2>
            <GoogleMapsIntegration />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-3/4 w-full p-4 bg-black dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] rounded-lg">
          <div className="mb-8 flex justify-center lg:justify-start space-x-4">
            <button
              onClick={() => setActiveFeature('ecommerce')}
              className={`px-4 py-2 rounded-md transition ${
                activeFeature === 'ecommerce' ? 'bg-green-600' : 'bg-green-500'
              } text-white hover:bg-green-700`}
            >
              E-Commerce Listings
            </button>
            <button
              onClick={() => setActiveFeature('vehicle')}
              className={`px-4 py-2 rounded-md transition ${
                activeFeature === 'vehicle' ? 'bg-green-600' : 'bg-green-500'
              } text-white hover:bg-green-700`}
            >
              Vehicle OBD Stats
            </button>
          </div>

          {/* Display Active Feature */}
          <div className="mb-8">
            {activeFeature === 'ecommerce' ? <EcommerceListings /> : <VehicleOBDStats />}
          </div>

          {/* Log Out Button */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-yellow-600 text-white rounded-md mt-4 hover:bg-yellow-700 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
