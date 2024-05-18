import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'; // Import CORS module

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Secret key for signing JWT

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Sample user data (for demonstration purposes)
const users = [
  { id: 1, username: 'matthew', password: '1' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password (insecure, use proper authentication)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, userName: user.username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
