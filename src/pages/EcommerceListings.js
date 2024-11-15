import React, { useState } from 'react';

const EcommerceListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const listings = [
    { id: 1, name: "Porsche 911 Engine", price: "$10,000" },
    { id: 2, name: "Car Battery", price: "$150" },
    // Add more listings here
  ];

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Search listings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <div>
        {filteredListings.map((listing) => (
          <div key={listing.id} className="mb-4">
            <h3 className="text-lg font-semibold">{listing.name}</h3>
            <p className="text-sm text-gray-600">{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcommerceListings;
