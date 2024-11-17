import React, { useState } from 'react';

const ListItemForm = ({ userId }) => {  // Make sure to pass the userId to the form
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !itemDescription) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true); // Set loading to true before sending the request

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemName,
          price: itemPrice,
          description: itemDescription,
          userId: userId, // Send the userId
        }),
      });

      if (response.ok) {
        alert('Item listed successfully');
      } else {
        alert('Failed to list item');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while listing the item');
    }

    setLoading(false); // Reset loading state after request is finished
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
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {loading ? 'Listing Item...' : 'List Item'}
      </button>
    </form>
  );
};

export default ListItemForm;
