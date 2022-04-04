import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {getProducts,getProductById} from '../controllers/productController.js'

//@desc fetch all products
//@route GET /api/products
//@access to public


  router.route('/').get(getProducts)


//@desc fetch single products
//@route GET /api/product/:id
//@access to public

router.route('/:id').get(getProductById)

export default router