// server.js - Express REST API for Product Management Assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'my-secret-key';

// ==========================
// 🔹 Middleware Setup
// ==========================

// Log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Parse JSON bodies
app.use(bodyParser.json());

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
};

// ==========================
// 🔹 Sample In-memory Database
// ==========================
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// ==========================
// 🔹 Root Route
// ==========================
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to view products.');
});

// ==========================
// 🔹 Protected Routes (require API key)
// ==========================
app.use('/api/products', authMiddleware);

// ==========================
// 🔹 Validation Middleware
// ==========================
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing product name' });
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing product price' });
  }
  next();
};

// ==========================
// 🔹 Route Definitions
// ==========================

// GET /api/products - Get all products (with filters, search, pagination)
app.get('/api/products', (req, res) => {
  let filtered = [...products];

  // Filter by category
  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }

  // Search by name
  if (req.query.search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const results = filtered.slice(startIndex, endIndex);

  res.json({
    total: filtered.length,
    page,
    limit,
    products: results,
  });
});

// GET /api/products/:id - Get one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// GET /api/products/stats - Category stats
app.get('/api/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// POST /api/products - Create new product
app.post('/api/products', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update existing product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
});

// DELETE /api/products/:id - Remove a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(index, 1);
  res.status(204).send();
});

// ==========================
// 🔹 Error Handling Middleware
// ==========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
  });
});

// ==========================
// 🔹 Start Server
// ==========================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Export for testing 
module.exports = app;
