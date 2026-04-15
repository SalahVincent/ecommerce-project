import {React, useState, useEffect} from 'react'
import api from '../services/api'


const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
    console.log(data)
  };

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard