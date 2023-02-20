const express= require("express")
const {postModel}= require("../model/post.model")
const postRoute= express.Router()

postRoute.get("/",async(req,res)=>{
    try{
        let obj= {}
        // obj.userID= user
        const device= req.query.device;
        if(device){
            obj.device= device
        }
        obj.userID=req.body.userID 
        // const data= await postModel.find({userID:user})
        const data= await postModel.find(obj)
        const count= await postModel.find(obj).countDocuments();
        res.send({"data":data, "count":count})
        res.send(data)
    }
    catch(err){
        console.log(err);
    }
})


postRoute.post("/create",async(req,res)=>{
    const payload= req.body
    const note= new postModel(payload)
    await note.save()
    res.send({"msg":"Post Created"})
})


postRoute.patch("/update/:id",async(req,res)=>{
    const id= req.params.id
    const data= req.body
    const post= await postModel.findOne({"_id":id})
    const userID_in_post= post.userID
    const userID_making_req= req.body.userID

    try{
        if(userID_making_req!==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }else{
            await postModel.findByIdAndUpdate({"_id":id},data)
            res.send({"msg":`Post with id:${id} has been update`})
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
    
})


postRoute.delete("/delete/:id",async(req,res)=>{
    const id= req.params.id
    const post= await postModel.findOne({"_id":id})
    const userID_in_post= post.userID
    const userID_making_req= req.body.userID
    try{
        if(userID_making_req!==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }else{
            await postModel.findByIdAndDelete({"_id":id})
            res.send({"msg":`Post with id:${id} has been delete`})
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
    
})
module.exports={
    postRoute
}