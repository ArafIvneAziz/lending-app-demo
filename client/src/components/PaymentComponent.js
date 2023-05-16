import React, { useState } from 'react';
import PaymentService from '../services/PaymentService';

const PaymentComponent = () => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      const Payment = await PaymentService.makePayment(amount);
      setAmount('');
      alert('Payment Successful');
    } catch (error) {
      alert('Payment Failed');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Make a Payment</h1>
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="border p-2 mr-2"
          min="0"
          step="0.01"
          placeholder="Enter amount"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white">
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;

/*
In this example, we use React's useState hook to manage the state for the payment amount. We also simulate making a payment with fetch. Upon successful payment, we reset the payment amount and display a success alert. If the payment fails, we display a failure alert.

Again, in a real-world scenario, you would replace the /api/make-payment endpoint with the actual endpoint in your application's backend API.

The style classes used are from Tailwind CSS. You can adjust them to fit your design requirements.
*/