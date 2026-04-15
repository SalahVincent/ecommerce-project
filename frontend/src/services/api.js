const BASE_URL = 'http://localhost:5000/api/products';

const api = {

  getProducts: async (category = '', search = '') => {
    const response = await fetch(`${BASE_URL}?category=${category}&search=${search}`);
    return response.json();
  },

  createProduct: async (productData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    return response.json();
  }
};

export default api