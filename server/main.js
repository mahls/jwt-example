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

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Create new user (in a real application, you should hash the password)
  const newUser = {
    id: users.length + 1, // Simple ID assignment
    username: username,
    password: password
  };

  users.push(newUser);

  // Optionally, directly log the user in by returning a token
  const token = jwt.sign({ userId: newUser.id, userName: newUser.username }, SECRET_KEY);
  res.status(201).json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
