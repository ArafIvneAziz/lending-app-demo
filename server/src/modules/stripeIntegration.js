const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// This should be replaced with your User model
const User = require('../models/User');

// Create a Stripe customer
router.post('/create-customer', async (req, res) => {
    const { email } = req.body;

    const customer = await stripe.customers.create({ email });

    res.send({ customerId: customer.id });
});

// Link bank account to Stripe
router.post('/link-bank', async (req, res) => {
    const { customerId, bankAccountId } = req.body;

    const bankAccount = await stripe.customers.createSource(customerId, {
        source: bankAccountId,
    });

    res.send({ bankAccountId: bankAccount.id });
});

module.exports = router;
/*
In this module, we're defining two routes: /create-customer and /link-bank. The /create-customer route creates a new customer in Stripe. The /link-bank route links a bank account to a Stripe customer.

Please replace User with your actual User model and process.env.STRIPE_SECRET_KEY with your actual Stripe secret key. Note that you'll need to handle retrieving the bankAccountId from your front-end and verifying it before passing it to the link-bank route.
*/