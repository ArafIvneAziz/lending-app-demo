const mongoose = require('mongoose');
const DBServices = require('../../services/DBServices');
const dbService = new DBServices();
dbService.connect();

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentsMade: {
    type: Number,
    required: true,
    default: 0
  },
  loanAmount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Payment' });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
