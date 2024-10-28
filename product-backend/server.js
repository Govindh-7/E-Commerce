const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const router = express.Router(); // Define routernode

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));


// PostgreSQL pool connection setup with direct details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'productdb',
  password: 'Govindh@7',
  port: 5432,
});

// Define a route to get all items
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Post an order
router.post('/api/orders', async (req, res) => {
  const { userId, items, total, shippingAddress } = req.body; // Destructure from request body

  try {
      const result = await pool.query(
          'INSERT INTO orders (user_id, items, total, shipping_address) VALUES ($1, $2, $3, $4) RETURNING *',
          [userId, items, total, shippingAddress]
      );

      res.status(201).json({ order: result.rows[0] }); // Send back the created order
  } catch (err) {
      console.error('Error creating order:', err); // Log error
      res.status(500).json({ error: 'Failed to create order' }); // Send error response
  }
});


// Route to fetch orders for a user
app.get('/api/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.json({ orders: result.rows });
  } catch (err) {
    console.error('Error fetching orders:', err.message); // Log error message
    console.error('Full error:', err); // Log full error for more details
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});




// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
