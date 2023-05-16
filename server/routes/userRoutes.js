const express = require('express');
const User = require('../src/modules/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../src/modules/userAuth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();

    // Generate a JWT for the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    console.log(newUser._id.toString());

    console.log(token)
    res.send({ token, userId: newUser._id.toString() });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by their email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  // Validate the user's password
  try {
    const isValidPassword = await user.isValidPassword(password);
  } catch (err) {
    console.error(err);
  }

  // Generate a JWT for the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  console.log(user._id.toString())
  console.log(token)
  
  // Send the token in the response body
  res.send({ token, userId: user._id.toString() });
});


// Example protected route
// router.get('/me', auth, async (req, res) => {
//   console.log(JSON.stringify(req.headers));
//   res.send(req.user);
// });

module.exports = router;

/*
This module defines two routes: /register and /login. The /register route registers a new user and the /login route logs in an existing user. Both routes generate a JWT for the user upon successful registration or login.

You'll need to replace process.env.JWT_SECRET with your actual JWT secret. This can be any string of your choosing, but it should be kept secure as it's used to sign and verify the JWTs.

You can use this userRoutes.js module in your server's main file to handle user-related requests. For example, you could mount this router at the /api/users path to handle requests to /api/users/register and /api/users/login.
*/