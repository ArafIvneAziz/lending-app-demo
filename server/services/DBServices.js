const mongoose = require('mongoose');

// Replace this with your MongoDB connection string
const connectionString = process.env.MONGODB_CONNECTION_STRING;

class DBServices {
    constructor() {
        this.connectionOptions = {
            useNewUrlParser: true, useUnifiedTopology: true
        };
    }

    async connect() {
        try {
            await mongoose.connect(connectionString, this.connectionOptions);
            console.log('Successfully connected to the MongoDB database');
        } catch (err) {
            console.error('Error connecting to the MongoDB database:', err);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Successfully disconnected from the MongoDB database');
        } catch (err) {
            console.error('Error disconnecting from the MongoDB database:', err);
        }
    }
}

module.exports = DBServices;
/*
This DBServices class provides two methods: connect() and disconnect(). The connect() method is used to establish a connection with the MongoDB database, and the disconnect() method is used to close the connection.

You'll need to replace process.env.MONGODB_CONNECTION_STRING with your actual MongoDB connection string. This connection string can be found in the MongoDB Atlas dashboard if you're using MongoDB Atlas, or it can be a local connection string if you're hosting the MongoDB database on your own server.

You can use this DBServices class in your server's main file to connect to the database when the server starts, and to disconnect from the database when the server stops.
*/