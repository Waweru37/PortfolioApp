const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// Sample API endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Welcome to the system!' });
});

// To add new routes:
// 1. Create a new file in a 'routes' folder, e.g., routes/users.js
// 2. Define routes, e.g., router.get('/users', (req, res) => { ... })
// 3. Import and use in this file: app.use('/api', require('./routes/users'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// To run: Install Node.js, then run `npm install express cors` and `node server.js`
// Optional: Use `npm install nodemon` and run `nodemon server.js` for auto-restart