const express = require('express');
const router = express.Router();

const {PaymentService} = require('../services/PaymentService');
const AuthService = require('../services/AuthService');
console.log(AuthService);

// Middleware for checking JWT authentication
const {isAuthenticated} = require('../src/modules/userAuth');
console.log(isAuthenticated);

router.get('/transactions', AuthService.isAdmin, async (req, res) => {
  try {
    if (!isAuthenticated(req.user)) {
      return res.status(403).send('Forbidden');
    }
    else{
      const transactions = await PaymentService.getAllTransactions();
      res.send(transactions);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


// Make a repayment

router.post('/repay', AuthService.isAdmin, async (req, res) => {
    const { lenderId, amount } = req.body;
    try {
      if (!isAuthenticated(req.user)) {
        return res.status(403).send('Forbidden');
      }
      else{
        await PaymentService.makeRepayment(lenderId, amount);
        res.send('Repayment successful');
      }
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = router;
/*
This module defines two routes: /transactions and /repay. The /transactions route retrieves all transactions, and the /repay route makes a repayment to a lender.

The isAuthenticated middleware is used to ensure that only authenticated users can make these requests. This middleware should verify the JWT in the Authorization header of the request and add the authenticated user's details to req.user.

The AuthService.isAdmin middleware is used to ensure that only admin users can make these requests. This middleware should check the req.user object to determine if the user is an admin.

This adminRoutes.js module can be used in your server's main file to handle admin-related requests. For example, you could mount this router at the /api/admin path to handle requests to /api/admin/transactions and /api/admin/repay.
*/