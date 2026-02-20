import express from 'express'
import { productController } from '../controllers/ProductController.js'

const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router