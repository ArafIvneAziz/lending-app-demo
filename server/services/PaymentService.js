const mongoose = require('mongoose');
const Payment = require('../src/models/Payment');
const transaction = require('../src/modules/transaction');

class PaymentService {
  constructor() {
    this.paymentModel = Payment;
  }
  constructor() {
    this.transactions = transaction;
  }

  getAllTransactions() {
    // return this.paymentModel.find();
    return this.transactions.find();
  }

  addTransaction(transactionData) {
    const transaction = new this.paymentModel(transactionData);
    return transaction.save();
  }
}

module.exports = PaymentService;
