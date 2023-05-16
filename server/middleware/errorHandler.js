module.exports = function (err, req, res, next) {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500);
    res.json({ error: err.message || 'An error occurred' });
};
/*
This middleware logs the error stack trace, then checks if the headers have already been sent. If they have, it delegates the error to the next middleware (if one exists). If the headers haven't been sent yet, it sets the status code and sends a JSON response with the error message.

You can use this middleware at the end of your middleware stack to catch and handle any errors that occur during the execution of your route handlers. For example:

javascript
Copy code
const express = require('express');
const app = express();

const errorHandler = require('./middleware/errorHandler');

// Your routes here...

// Use the error handler middleware last
app.use(errorHandler);
In this example, app.use(errorHandler); is the last middleware used in the application. This ensures that any errors that occur during the execution of the route handlers are passed to errorHandler, which logs the error and sends a response to the client.
*/