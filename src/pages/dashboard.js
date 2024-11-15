import React, { useState } from 'react';
import ListItemForm from './ListItemForm';
import GoogleMapsIntegration from './GoogleMapsIntegration';
import EcommerceListings from './EcommerceListings';
import VehicleOBDStats from './VehicleOBDStats';
import Header from '../components/header';
import { useClerk } from '@clerk/clerk-react';

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState('ecommerce'); 
  const { signOut } = useClerk();
  return (
    <div>
    <Header />
    <div className="flex mt-8 ">
      {/* Left Section */}
      <div className="w-1/4 p-4 dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] bg-green-950 text-black bg-opacity-40 backdrop-blur-lg">
        {/* List Item Form */}
        <div className="mb-8 mt-4">
          <h2 className="bg-green-600 px-4 py-2 rounded-lg text-white">List New Item</h2>
          <ListItemForm />
        </div>

        {/* Google Maps Integration */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Nearby Auto Shops</h2>
          <GoogleMapsIntegration />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/4 p-4 dark:bg-black bg-black  dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] ">
        {/* Toggleable Features */}
        <div className="mb-8">
          <button
            onClick={() => setActiveFeature('ecommerce')}
            className={`px-4 py-2 mr-4 text-white rounded-md ${activeFeature === 'ecommerce' ? 'bg-green-600' : 'bg-green-500'}`}
          >
            E-Commerce Listings
          </button>
          <button
            onClick={() => setActiveFeature('vehicle')}
            className={`px-4 py-2 text-white rounded-md ${activeFeature === 'vehicle' ? 'bg-green-600' : 'bg-green-500'}`}
          >
            Vehicle OBD Stats
          </button>
        </div>

        {/* Display Active Feature */}
        {activeFeature === 'ecommerce' ? (
          <EcommerceListings />
        ) : (
          <VehicleOBDStats />
        )}
        <button 
            onClick={() => signOut()}  
            className="px-6 py-3 bg-yellow-600 text-white rounded-md mt-4 hover:bg-yellow-700 transition"
          >
            Log Out
          </button>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
