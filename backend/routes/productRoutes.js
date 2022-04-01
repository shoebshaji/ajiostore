import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc fetch all products
//@route GET /api/products
//@access to public


  router.get('/', asyncHandler(async(req, res) => {
     const products = await Product.find({})
     res.json(products)
  }))


//@desc fetch single products
//@route GET /api/product/:id
//@access to public

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
      res.json(product)
  } else {
      res.status(404)
      throw new Error('Product not found') 
  }
}))

export default router