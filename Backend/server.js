const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Root route to test server
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/signup', (req, res) => {
    const userData = req.body; // this contains the JSON sent in the request body
    const error = validateSignup(userData); // pass the body to validation
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    res.status(201).json({
      message: 'User registered successfully',
      user: userData,
    });
  });
// Helper function to validate input
function validateSignup(data) {
  const { username, email, password, dob } = data;

  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return 'Invalid email format';
  }

  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  if (!dob || !dobRegex.test(dob)) {
    return 'Date of Birth must be in YYYY-MM-DD format';
  }

  return null;
}

// ✅ Signup endpoint (IMPLEMENT HERE)
app.post('/signup', (req, res) => {
  const error = validateSignup(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  // In real apps, save user to DB here
  res.status(201).json({
    message: 'User registered successfully',
    user: req.body,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
