const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const StripeService = require('../services/StripeService');
const PaymentService = require('../services/PaymentService');

// Middleware for checking JWT authentication
const auth = require('../src/modules/userAuth');
const Payment = require('../src/models/Payment');


// Create the route for the /postrequest endpoint
router.post("/send-owed-amount/:userId", async (req, res) => {
  // Get the user ID from the request body
  const userId = req.params.userId;
  console.log(userId)
  // Find all payments for the user
  const payments = await Payment.find({ userId });

  // Get the total amount of all payments
  const totalAmount = await Payment.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  console.log(totalAmount)
  // Get the user value from the request body
  const userValue = req.body.userValue;
  console.log(userValue)
  // Check if the user value is greater than the total amount
  if (userValue > totalAmount) {
    res.status(400).send("User value is greater than total amount");
    return;
  }

  // Divide the user value by the number of payments
  const perPaymentAmount = userValue / payments.length;

  // Iterate over the payments and update the amount
  for (const paymen of payments) {
    // Check if the payment amount is greater than the per payment amount
    if (paymen.amount > perPaymentAmount) {
      // Update the payment amount
      paymen.amount -= perPaymentAmount;
      paymen.paymentsMade += perPaymentAmount;

    } else {
      // The payment amount is less than the per payment amount, so we can just set it to 0
      paymen.amount = 0;
    }

    // Save the payment
    await paymen.save();
  }

  // Send a success response
  res.status(200).send("Payments updated successfully");
});

// Create a payment intent
// Create a payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
    const { amount } = req.body;
    console.log(amount)
    
    // Create a new instance of the PaymentService class
    const paymentService = new PaymentService();
    
    // Call the addTransaction() method on the PaymentService instance, passing in the transaction data
    const transaction = await paymentService.addTransaction({
        amount,
        loanAmount: amount,
        paymentsMade: 0,
        userId: req.user.id,
        paymentDate: new Date()
    });
    
    // Save the transaction to the database
    await transaction.save();
    
    // Create a payment intent with Stripe
    const paymentIntent = await StripeService.createPaymentIntent(amount);
    
    // Send the payment intent to the client
    res.send({ clientSecret: paymentIntent });
});

// Handle successful payment
router.post('/successful-payment', auth, async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        await PaymentService.handleSuccessfulPayment(req.user, paymentIntentId);
        res.send('Payment successful');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
/*
This module defines two routes: /create-payment-intent and /successful-payment. The /create-payment-intent route creates a new payment intent with Stripe, and the /successful-payment route handles a successful payment by recording the payment in the database and updating the user's balance.

The isAuthenticated middleware is used to ensure that only authenticated users can make these requests. This middleware should verify the JWT in the Authorization header of the request and add the authenticated user's details to req.user.

This paymentRoutes.js module can be used in your server's main file to handle payment-related requests. For example, you could mount this router at the /api/payments path to handle requests to /api/payments/create-payment-intent and /api/payments/successful-payment.
*/