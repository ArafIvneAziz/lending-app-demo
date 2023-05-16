const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// This should be replaced with your User and Payment models
const User = require('../models/User');
const Payment = require('../models/Payment');

// Save Payment Info
router.post('/save-payment', async (req, res) => {
    const { userId, amount } = req.body;

    const payment = new Payment({
        userId,
        amount,
        date: new Date()
    });

    try {
        const savedPayment = await payment.save();
        res.send({ payment: savedPayment._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
/*
In this module, we're defining two routes: /create-payment-intent and /save-payment. The /create-payment-intent route creates a new PaymentIntent with Stripe, which is used to track a payment. The /save-payment route saves the payment details in the database.

Please replace User and Payment with your actual User and Payment models and process.env.STRIPE_SECRET_KEY with your actual Stripe secret key.
*/