const mongoose = require('mongoose');
const DBServices = require('../../services/DBServices');
const dbService = new DBServices();
dbService.connect();

const TransactionSchema = new mongoose.Schema({
    lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Transaction' });

module.exports = mongoose.model('Transaction', TransactionSchema);
/*
In this module, we define a Mongoose schema for our Transaction model. Each transaction includes a lender (reference to User), borrower (reference to User), amount of the transaction, paymentIntentId (from Stripe), and a timestamp for when the transaction was created.

This Transaction model can be used throughout your application to create, retrieve, update, and delete transactions in your MongoDB database.
*/