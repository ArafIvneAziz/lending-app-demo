import React, { useState, useEffect } from 'react';


const AdminInterface = () => {
  const [lenders, setLenders] = useState([]);
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [selectedLender, setSelectedLender] = useState('');

  useEffect(() => {
    // Mock fetch lenders from API
    const fetchLenders = async () => {
      const response = await fetch('/api/lenders'); // replace with real API endpoint
      const data = await response.json();
      setLenders(data.lenders);
    };

    fetchLenders();
  }, []);

  const handleRepaymentAmountChange = (event) => {
    setRepaymentAmount(event.target.value);
  };

  const handleRepaymentSubmit = async (event) => {
    event.preventDefault();

    // Mock send repayment to API
    const response = await fetch('/api/repayment', { // replace with real API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lenderId: selectedLender, amount: repaymentAmount }),
    });

    if (response.ok) {
      setRepaymentAmount('');
      alert('Repayment Successful');
    } else {
      alert('Repayment Failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Interface</h1>
      <ul>
        {lenders.map((lender) => (
          <li key={lender.id}>
            <p>Name: {lender.name}</p>
            <p>Loan Amount: {lender.loanAmount}</p>
            <p>Remaining Amount: {lender.remainingAmount}</p>
            <p>Payments Made: {lender.paymentsMade}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleRepaymentSubmit}>
        <label>
          Select Lender:
          <select value={selectedLender} onChange={(e) => setSelectedLender(e.target.value)}>
            {lenders.map((lender) => (
              <option key={lender.id} value={lender.id}>{lender.name}</option>
            ))}
          </select>
        </label>
        <input
          type="number"
          value={repaymentAmount}
          onChange={handleRepaymentAmountChange}
          className="border p-2 mr-2"
          min="0"
          step="0.01"
          placeholder="Enter repayment amount"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white">
          Submit Repayment
        </button>
      </form>
    </div>
  );
};

export default AdminInterface;
/*
In this example, we're fetching a list of lenders from the backend when the component is first loaded using the useEffect hook. We display each lender's information in a list and provide a form to submit a repayment.

As with the previous examples, you would replace the /api/lenders and /api/repayment endpoints with the actual endpoints in your application's backend API.

The style classes used are from Tailwind CSS. You can adjust them to fit your design requirements.
*/