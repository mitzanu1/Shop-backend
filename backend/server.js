import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const app = express()
const dbUrl = 'mongodb://cluster1.j5uhq.mongodb.net/eShop';
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(dbUrl || 'mongodb://localhost/eShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/', (req,res) => {
    res.send('Server is ready')
})



app.use ((err,req,res,next) =>{
    res.status(500).send({message:err.message})
})

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})

