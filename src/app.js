// Expense Tracker App (basic clean version)

import React, { useState, useEffect } from 'react';

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('expenses');
    return localData ? JSON.parse(localData) : [];
  });

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toLocaleDateString()
    };
    setExpenses([newExpense, ...expenses]);
    setAmount('');
    setDescription('');
    setCategory('Food');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker App</h1>

      <form onSubmit={handleAddExpense} className="expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <h2>Total Spent: ₹{totalAmount.toFixed(2)}</h2>

      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.date} | {expense.category} | ₹{expense.amount.toFixed(2)} - {expense.description}</span>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
