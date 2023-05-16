const jwt = require('jsonwebtoken');
const User = require('../src/modules/user');

module.exports = async function (req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by their ID
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send('Invalid token');
        }

        // Add the user to the request
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
/*
This middleware checks for a JWT in the Authorization header of the request. If a token is found, it verifies the token, retrieves the user from the database, and adds the user's details to req.user. If the token is not valid or no token is provided, it sends a 401 or 400 status code and a corresponding error message.

You'll need to replace process.env.JWT_SECRET with your actual JWT secret.

You can use this middleware in your routes to ensure that only authenticated users can make certain requests. For example, you can use it like this:

javascript
Copy code
const express = require('express');
const router = express.Router();

const isAuthenticated = require('./middleware/authMiddleware');

router.post('/some-protected-route', isAuthenticated, (req, res) => {
    // Handle the request
});
In this example, isAuthenticated is used as middleware for the /some-protected-route route. This means that only users who have provided a valid JWT in the Authorization header of their request will be able to access this route.
*/