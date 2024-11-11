import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/auth/transaction-history', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(response.data);
            } catch (err) {
                setError('Failed to fetch transaction history');
            }
        };
        fetchTransactionHistory();
    }, []);

    

    return (
        <div className="container">
            <h2>Transaction History</h2>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Product Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.type}</td>
                            <td>{transaction.productName}</td>
                            <td>{transaction.amount} tokens</td>
                            <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistoryPage;
