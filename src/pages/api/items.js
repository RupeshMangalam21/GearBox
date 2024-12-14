// pages/api/items.js

import prisma from '../../lib/prisma.schema';  
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, description, userId } = req.body;

    // Basic validation
    if (!name || !price || !description || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Save the item to the database using Prisma
      const newItem = await prisma.item.create({
        data: {
          name,
          price: parseFloat(price),
          description,
          userId: parseInt(userId),
        },
      });

      return res.status(201).json(newItem);  // Return the saved item
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while saving the item' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
