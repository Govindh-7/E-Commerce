const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
}));
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'e_commerce',
  password: 'Govindh@7',
  port: 5432,
});

// Middleware for authenticating user based on token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the request headers
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Attach user info to request
    next();
  });
};

// Registration Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [username, email, hashedPassword]);
    
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23505') { // Unique violation error code
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ token, userId: user.id }); // Include userId in the response
      }
    }
    res.status(401).json({ message: 'Invalid credentials.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error logging in.' });
  }
});

// GET user details
// GET user details
app.get('/api/user/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;

  // Check if userId is valid
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' }); // Bad Request
  }

  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      res.json({ user: result.rows[0] });
    } else {
      res.status(404).json({ message: 'User not found.' }); // Return 404 if user not found
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.sendStatus(500); // Internal Server Error
  }
});



// Update User Details Route
app.put('/api/user/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const query = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *';
    const result = await pool.query(query, [username, email, id]);
    
    if (result.rows.length > 0) {
      res.status(200).json({ user: result.rows[0] });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error updating user.' });
  }
});

// Delete Account Route
app.delete('/api/user/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error deleting user.' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
