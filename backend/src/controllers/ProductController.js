import Product from '../models/product.js';
import { Op } from 'sequelize';

export const productController = {

  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    }
    catch (error) {
      res.status(400).json({ error: 'Failed to create product. Check your data.' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { category, search } = req.query;
      let queryOptions = { where: {} };

      if (category) {
        queryOptions.where.category = category;
      }

      if (search) {
        queryOptions.where.name = { [Op.iLike]: `%${search}%` };
      }

      const products = await Product.findAll(queryOptions);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching products' });
    }
  },
  
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      
      await product.update(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Deletion failed' });
    }
  }
}

