const mongoose= require("mongoose")

const postSchema= mongoose.Schema({
    title: String,
    body: String,
    userID: String,
    device : String,
    no_if_comments : Number
})

const postModel= mongoose.model("note",postSchema)

module.exports={
    postModel
}