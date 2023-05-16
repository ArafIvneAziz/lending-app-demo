const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const DBServices = require('../../services/DBServices');
const dbService = new DBServices();
dbService.connect();

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLender: { type: Boolean, default: false },
    isBorrower: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    bankAccountId: { type: String },
}, { collection: 'User' });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Check if password is valid
UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
/*
In this module, we define a Mongoose schema for our User model. Each user has an email, password, a boolean flag indicating if they are a lender, a boolean flag indicating if they are a borrower, a Stripe customer ID, and a bank account ID.

We use a pre-save middleware to hash the user's password before it's saved to the database. We also define an instance method isValidPassword(password) for checking if a given password matches the hashed password stored in the database.

This User model can be used throughout your application to create, retrieve, update, and delete users in your MongoDB database.
*/