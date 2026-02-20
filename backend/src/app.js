import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import sequelize from './config/db.js'
import './models/product.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/ProductRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('🐘 Connection to PostgreSQL has been established successfully.')

    await sequelize.sync({ alter: true })
    console.log('📦 Database models synced.')

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error)
    process.exit(1)
  }
}

startServer()