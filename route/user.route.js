const express= require("express")
const {userModel}= require("../model/user.model")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const userRouter= express.Router()
require("dotenv").config

userRouter.post("/register",async(req,res)=>{
    const {name, email, password ,gender,age}= (req.body)
    try{
        //for hatching the pass
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err) {
                res.send({"msg":"Something went wrong","error":err.message})
            }else {
                let user= new userModel({name, email,password:hash,gender,age})
                await user.save()
                res.send({"msg":"New users has been register"})
            }
        });
       
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
   
})

userRouter.get("/",async(req,res)=>{
    try{
        const data= await userModel.find()
        res.send(data)

    }
    catch(err){
        console.log(err);
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body

    try{
        const user= await userModel.find({email})
        const hash_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password, hash_pass, (err, result)=> {
               if(result){
                    let token= jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in","token":token})
               }else{
                    res.send({"msg":"wrong Credintials"})
               }
            });
            
        }else{
            res.send({"msg":"wrong Credintials"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }

    
})

module.exports={
    userRouter
}