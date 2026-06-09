import Product from '../models/product.js';
import { Op } from 'sequelize';

export const productController = {

  createProduct: async (req, res, next) => {
    try {
      const { name, category, price, description, imageUrl } = req.body;
      
      const newProduct = await Product.create({
        name,
        category,
        price,
        description,
        imageUrl
      });

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const { category, search } = req.query;
      let queryOptions = { where: {} };

      if (category) {
        queryOptions.where.category = { [Op.iLike]: `%${category}%` };
      }

      if (search) {
        queryOptions.where.name = { [Op.iLike]: `%${search}%` };
      }

      const products = await Product.findAll(queryOptions);
      res.status(200).json(products);
    } catch (error) {
      next(error);
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

