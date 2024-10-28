const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'productdb',
  password: 'Govindh@7',
  port: 5432,
});

const seedData = async () => {
  try {
    await pool.query(`
      INSERT INTO items (name, description, price, category, image_url, features, rating, review_count) VALUES
      ('LEOTUDE', 'A stylish dress for all occasions.', 49.99, 'fashion', 'http://localhost:3000/images/dress.jpg', ARRAY['Cotton', 'Washable'], 4.5, 12),
      ('Running Shoes', 'Comfortable running shoes with great grip.', 79.99, 'sports', 'https://example.com/shoes.jpg', ARRAY['Synthetic', 'Waterproof'], 4.8, 20),
      ('Toy Car', 'A small toy car for kids.', 19.99, 'toys', 'https://example.com/toycar.jpg', ARRAY['Plastic', 'Battery Powered'], 4.0, 30)
    `);
    console.log("Data successfully seeded!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    pool.end();
  }
};

seedData();
