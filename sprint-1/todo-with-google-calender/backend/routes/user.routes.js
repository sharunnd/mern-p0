const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const jwt = require('jsonwebtoken');

require("dotenv").config()

// Registration/signup route
userRouter.post("/signup",async(req,res)=>{
    const { email, name, password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(400).json({msg:"User already exists!"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.status(400).json({error:err.message})
                }else{
                    const user =new UserModel({name,email,password:hash})
                    await user.save()
                    res.status(200).json({msg:"Registration successful",user:req.body})
                }
            });
        }
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

// login route
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user =await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(result){
                    let token = jwt.sign({ userID: user._id,user:user.name }, `${process.env.SECRET_KEY}`,{
                        expiresIn:"7d"
                    });
                    res.status(200).json({msg:"Login successful",token,role:user.role})
                }else{
                    res.status(400).json({msg:"wrong credentials!"})
                }
            })
        }else{
          res.status(400).json({msg:"User Not Found!"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}) 

module.exports ={
    userRouter
} 