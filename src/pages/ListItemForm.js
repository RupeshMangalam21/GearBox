import React, { useState } from 'react';

const ListItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle item submission logic (e.g., send data to the backend)
    console.log('Item Listed:', { itemName, itemPrice, itemDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Price</label>
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        List Item
      </button>
    </form>
  );
};

export default ListItemForm;
