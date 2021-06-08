import express from 'express'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'

const userRouter = express.Router()



userRouter.post('/signin',
    expressAsyncHandler(
    async(req,res) =>{
       const user = await User.findOne({email: req.body.email})
       console.log(req)
       if(user) {
           if(bcrypt.compareSync(req.body.password, user.password)) {
               res.send({
                   _id: user._id,
                   name: user.name,
                   email: user.email,
                   isAdmin: user.isAdmin,
                   token: generateToken(user)
               })
               return
           }
       }
       res.status(401).send({message: 'Invalid user or password'})
    })
)

userRouter.post('/register', 
    expressAsyncHandler(
        async(req,res) =>{
            const user = new User({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, 8)
            })
        const createUser = await user.save()
        res.send({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            isAdmin: createUser.isAdmin,
            token: generateToken(createUser)
        })    
    })
)
export default userRouter