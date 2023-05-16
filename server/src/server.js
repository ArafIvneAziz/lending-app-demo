const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('../routes/userRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const adminRoutes = require('../routes/adminRoutes');
const paymentTracking = require('./modules/paymentTracking');

const authMiddleware = require('../middleware/authMiddleware');
const errorHandler = require('../middleware/errorHandler');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Use the routes
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/api/users', userRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/paymentTracking', authMiddleware, paymentTracking);
app.use('/api/admin', authMiddleware, adminRoutes);

// Use the error handler middleware last
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/*
In this server.js file, we:

Import the required modules.
Configure the environment variables with dotenv.
Import our route modules.
Import our middleware.
Create an Express.js application.
Set the port for the server.
Use cors and express.json middleware to handle cross-origin requests and JSON request bodies, respectively.
Use our routes, mounting them at the specified paths.
Use the errorHandler middleware last to catch any errors that occur during request handling.
Start the server, listening on the specified port.
*/