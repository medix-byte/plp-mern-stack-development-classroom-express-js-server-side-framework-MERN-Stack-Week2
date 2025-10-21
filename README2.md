# 🛍️ Product Management REST API (Express.js)

This project is a simple RESTful API built with **Express.js** for managing product data.  
It demonstrates routing, middleware (logging, authentication, validation, error handling), and in-memory data storage.

---

## 🚀 Features
- RESTful CRUD operations for products  
- API key authentication middleware  
- Request logging middleware  
- Product validation  
- Search, filter, and pagination support  
- Error handling middleware  
- Example `.env` file for configuration  

---

## 🧰 Technologies Used
- **Node.js**
- **Express.js**
- **UUID** (for generating unique product IDs)
- **Body-parser**

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/medix-byte/plp-mern-stack-development-classroom-express-js-server-side-framework-MERN-Stack-Week2.git
cd plp-mern-stack-development-classroom-express-js-server-side-framework-MERN-Stack-Week2
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=3000
API_KEY=my-secret-key
```
You can also copy from `.env.example`:
```bash
cp .env.example .env
```

### 4️⃣ Run the Server
```bash
npm start
```
or, for development with automatic restarts:
```bash
npx nodemon server.js
```

### 5️⃣ Access the API
Server runs on:  
👉 http://localhost:3000

---

## 🧩 API Endpoints Documentation

All routes under `/api/products` are protected and require an **API key** in headers:

```
x-api-key: my-secret-key
```

---

### 🔹 GET `/`
**Description:**  
Welcome route showing API info.

**Response Example:**
```text
Welcome to the Product API! Go to /api/products to view products.
```

---

### 🔹 GET `/api/products`
**Description:**  
Fetch all products with optional filtering, searching, and pagination.

**Query Parameters:**
| Parameter | Type | Description |
|------------|------|-------------|
| `category` | string | Filter by product category |
| `search` | string | Search by product name |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 5) |

**Example Request:**
```
GET /api/products?category=electronics&search=laptop&page=1&limit=2
```

**Example Response:**
```json
{
  "total": 2,
  "page": 1,
  "limit": 2,
  "products": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 🔹 GET `/api/products/:id`
**Description:**  
Retrieve a single product by ID.

**Example Request:**
```
GET /api/products/1
```

**Example Response:**
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

### 🔹 GET `/api/products/stats`
**Description:**  
Get product count grouped by category.

**Response Example:**
```json
{
  "electronics": 2,
  "kitchen": 1
}
```

---

### 🔹 POST `/api/products`
**Description:**  
Add a new product.

**Example Request:**
```
POST /api/products
x-api-key: my-secret-key
Content-Type: application/json

{
  "name": "Tablet",
  "description": "10-inch display tablet",
  "price": 500,
  "category": "electronics",
  "inStock": true
}
```

**Example Response:**
```json
{
  "id": "uuid-generated",
  "name": "Tablet",
  "description": "10-inch display tablet",
  "price": 500,
  "category": "electronics",
  "inStock": true
}
```

---

### 🔹 PUT `/api/products/:id`
**Description:**  
Update a product by ID.

**Example Request:**
```
PUT /api/products/1
x-api-key: my-secret-key
Content-Type: application/json

{
  "price": 1100,
  "inStock": false
}
```

**Example Response:**
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1100,
  "category": "electronics",
  "inStock": false
}
```

---

### 🔹 DELETE `/api/products/:id`
**Description:**  
Delete a product by ID.

**Example Request:**
```
DELETE /api/products/3
x-api-key: my-secret-key
```

**Response:**
```
204 No Content
```

---

## 🧠 Error Handling
| Status Code | Message |
|--------------|----------|
| 400 | Invalid or missing input |
| 401 | Unauthorized: Invalid API key |
| 404 | Product not found |
| 500 | Internal Server Error |

---

## 🧪 Testing
You can test API endpoints using:
- Postman
- Thunder Client (VS Code)
- curl in terminal

---

## 📁 Project Structure
```
project-root
├── server.js
├── package.json
├── README.md
├── .env.example
└── node_modules/
```

---

## 👨‍💻 Author
David Gikonyo Kabunyi (medix-byte)
PLP MERN Stack Development — Week 2 Assignment

---

## 📜 License
MIT License © 2025 medix-byte
