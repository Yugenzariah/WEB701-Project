import React from 'react';
import axios from 'axios';

const Dashboard = () => {
  const handleTransaction = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/token/transaction',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Transaction successful:', response.data);
    } catch (error) {
      console.error('Transaction failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleTransaction}>Make a Transaction</button>
    </div>
  );
};

export default Dashboard;
