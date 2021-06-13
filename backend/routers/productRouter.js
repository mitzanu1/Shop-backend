import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import { isAuth } from '../utils.js'

const productRouter = express.Router()

productRouter.get('/', 
expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/seed',
    isAuth,
    expressAsyncHandler(async(req,res)=>{
    
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        numReviews: req.body.numReviews,
        rating: req.body.rating,
        inStock: req.body.inStock
    })
    const createdProduct = await product.save()
    res.status(201).send({createdProduct})
}))

productRouter.get('/:id',
    expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
}))

export default productRouter