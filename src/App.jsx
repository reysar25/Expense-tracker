import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Accessories', category: 'livingroom accessory', name: 'Paintings', amount: 1000, date: '2015-6-10' },
    { id: 2, description: 'Tech Gears', category: 'Laptop ', name: 'Hp', amount: 200, date: '2025-6-12' },
    { id: 3, description: 'Skin Care', category: 'Make up', name: 'Concelear', amount: 30, date: '2025-6-16' },
    { id: 4, description: 'food', category: 'Grocery', name: 'Vegetables', amount: 104, date: '2025-6-07' },
  ]);

  const [formData, setFormData] = useState({
    description: '',
    category: '',
    name: '',
    amount: '',
    date: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <p>Start taking control of your expenses and your life.Its time to track where yourmoney is spent!.</p>

      <div className="content-wrapper">
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

        <section className="expenses-list">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.name}</td>
                  <td>${expense.amount.toLocaleString()}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default App;
