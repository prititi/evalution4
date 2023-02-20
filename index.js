const express= require("express")
const { connection } = require("./db")
const {userRouter}= require("./route/user.route")
const { authentication } = require("./middleware/authentication")
const {postRoute}= require("./route/post.route")
const cors= require("cors")

require("dotenv").config()
const app= express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})
app.use("/users",userRouter)
app.use(authentication)
app.use("/post",postRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port no: ${process.env.port}`);
})
