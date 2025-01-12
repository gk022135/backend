# QR-based Entry-Exit System (Backend)

This repository contains the **backend** part of the QR-based Entry-Exit System, which securely handles user authentication, QR code data processing, and entry/exit logging for university campuses.

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Code Snippets](#code-snippets)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user and log data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcrypt.js**: Library for password hashing.

---

## Features
- User registration and authentication with password hashing.
- QR code-based entry and exit logging.
- Secure RESTful API for frontend communication.

---

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed or access to a cloud-based MongoDB instance.

### Steps
1. Clone the repository:
   ```bash
   git clone 
   ```
2. Navigate to the project directory:
   ```bash
   cd qr-entry-exit-system-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### **Authentication**
#### Register User
**POST** `/api/auth/register`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User
**POST** `/api/auth/login`
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### **Entry/Exit Logging**
#### Log Entry or Exit
**POST** `/api/logs`
- Headers:
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- Request Body:
  ```json
  {
    "qrCode": "sample_qr_code_data"
  }
  ```
- Response:
  ```json
  {
    "message": "Entry logged successfully",
    "log": {
      "userId": "user_id_here",
      "timestamp": "2025-01-12T10:00:00Z"
    }
  }
  ```

---

## Code Snippets

### User Schema with Mongoose
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

---

## Future Enhancements
- **Role-Based Access Control**: Implement admin roles for better management.
- **Activity Reporting**: Add detailed reports for entry/exit logs.
- **WebSockets**: Enable real-time updates for logs.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

