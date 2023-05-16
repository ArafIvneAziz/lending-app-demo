// Sure, here is a simple Dashboard component using React hooks and function-based components:
// jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const Dashboard = () => {
  const cookies = new Cookies();
  const [owedAmount, setOwedAmount] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const cookieValue = cookies.get('User_ID');
  console.log(cookieValue)

  useEffect(() => {
    // Mock fetch owed amount from API
    const fetchOwedAmount = async () => {
      const response = await fetch(`http://localhost:4000/api/paymentTracking/total-owed/${cookieValue}`); // replace with real API endpoint
      const data = await response.json();
      console.log(data)
      setOwedAmount(data.totalOwed);
    };

    fetchOwedAmount();
  }, []);

  const handleSendAmountChange = (event) => {
    setSendAmount(event.target.value);
  };

  const handleSendAmountSubmit = async (event) => {
    event.preventDefault();

    // Mock send amount to API
    const response = await fetch(`http://localhost:4000/api/payments/send-owed-amount/${cookieValue}`, { // replace with real API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: sendAmount }),
    });

    if (response.ok) {
      setOwedAmount(owedAmount - sendAmount);
      setSendAmount('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-4">Amount owed: ${owedAmount}</p>
      <form onSubmit={handleSendAmountSubmit}>
        <input
          type="number"
          value={sendAmount}
          onChange={handleSendAmountChange}
          className="border p-2 mr-2"
          min="0"
          step="0.01"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default Dashboard;


// In this example, we use React's `useState` and `useEffect` hooks to manage state and side effects in our function component. We also simulate fetching the owed amount from an API with `fetch` and use controlled components to handle form inputs and submission.

// Please note that in a real-world scenario, you would replace the `/api/owed-amount` and `/api/send-amount` endpoints with the actual endpoints in your application's backend API.

// The style classes used are from Tailwind CSS. You can adjust them to fit your design requirements.

/*
In this example, we use React's useState and useEffect hooks to manage state and side effects in our function component. We also simulate fetching the owed amount from an API with fetch and use controlled components to handle form inputs and submission.

Please note that in a real-world scenario, you would replace the /api/owed-amount and /api/send-amount endpoints with the actual endpoints in your application's backend API.

The style classes used are from Tailwind CSS. You can adjust them to fit your design requirements.
*/