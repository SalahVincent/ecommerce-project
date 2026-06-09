import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [categoryFilter, searchQuery]);

  const loadProducts = async () => {
    const data = await api.getProducts(categoryFilter, searchQuery);
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.createProduct(formData);
    setFormData({ name: '', category: '', price: '', description: '' });
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await api.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Product Content Management</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
        <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer' }}>Add Item</button>
      </form>

      <hr />

      <div style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
        <div>
          <label>Filter by Category: </label>
          <input 
            type="text" 
            placeholder="e.g. gadgets" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)} 
          />
        </div>
        <div>
          <label>Search Name: </label>
          <input 
            type="text" 
            placeholder="Search keywords..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No products found.</td>
            </tr>
          ) : (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><span style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{p.category}</span></td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleDelete(p.id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                  <button onClick={() => handle}></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;