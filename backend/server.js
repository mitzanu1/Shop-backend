import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
import cors from 'cors'

dotenv.config()

const app = express()
const dbUrl = 'mongodb+srv://mitzanu:250786aa@cluster1.j5uhq.mongodb.net/eShop?retryWrites=true&w=majority';
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(dbUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


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
    console.log(`Serve at port:${port}`)
})

