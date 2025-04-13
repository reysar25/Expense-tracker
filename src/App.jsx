import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'High Standard', category: 'Technology (Lx Lx)', name: 'Total', amount: 100, date: '2015-6-10' },
    { id: 2, description: 'High Standard', category: 'Smart Smart', name: 'Airbus', amount: 2000, date: '2025-6-12' },
    { id: 3, description: 'Key Smart', category: 'Active by digital solutions', name: 'proposed', amount: 3000, date: '2025-6-16' },
    { id: 4, description: 'Key Smart', category: 'ASM for digital solutions', name: 'growth', amount: 10400, date: '2025-6-07' },
  ]);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    name: '',
    amount: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    
    const newExpense = {
      id: expenses.length + 1,
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    setExpenses([...expenses, newExpense]);
    setFormData({
      description: '',
      category: '',
      name: '',
      amount: '',
      date: ''
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find(expense => expense.id === id);
    if (expenseToEdit) {
      setFormData({
        description: expenseToEdit.description,
        category: expenseToEdit.category,
        name: expenseToEdit.name,
        amount: expenseToEdit.amount.toString(),
        date: expenseToEdit.date
      });
      handleDeleteExpense(id);
    }
  };


  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <p>Startup and start-up performance with a focus on the development of a tracking and monitoring strategy.</p>
      
      <section className="add-expense">
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
          <div className="form-group">
            <label>Description:</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="submit" className="add-button">Add Expense</button>
        </form>
      </section>

      <section className="performance">
        <h3>Active Performance</h3>
        <ul>
          <li>Time to execute:
            <ul>.expense-tracker {

}
              <li>1 day before completion:</li>
              <li>2 days before completion:</li>
              <li>3 days before completion:</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="expenses-list">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.name}</td>
                <td>${expense.amount.toLocaleString()}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleEditExpense(expense.id)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteExpense(expense.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App
