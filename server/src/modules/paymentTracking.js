const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const newLocal = '../models/User';
// This should be replaced with your Payment and User models
const User = require(newLocal);
const Payment = require('../models/Payment');

// Get total amount owed by a user
router.get('/total-owed/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
      console.log(userId)
    const totalOwed = await Payment.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    // console.log(totalOwed)
    if (!totalOwed.length) {
      return res.status(404).send('No payments found for this user');
    }
    console.log(totalOwed[0].total)
    res.send({ totalOwed: totalOwed[0].total });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get all payments made by a user
router.get('/payments/:userId', async (req, res) => {
    const { userId } = req.params;

    const payments = await Payment.find({ userId });

    if (!payments.length) return res.status(404).send('No payments found for this user');

    res.send(payments);
});

module.exports = router;
/*
In this module, we're defining two routes: /total-owed/:userId and /payments/:userId. The /total-owed/:userId route gets the total amount owed by a user. The /payments/:userId route gets all the payments made by a user.

Please replace User and Payment with your actual User and Payment models. Note that you'll need to match the userId field in your Payment model with the parameter we're using here.
*/