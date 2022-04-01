import express from 'express'
import dotenv from 'dotenv'
// import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandle } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

connectDB()

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandle)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
