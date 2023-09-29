const mongoose = require("mongoose")


const todoSchema = mongoose.Schema({
    title: String,
    desc: String,
    status: Boolean,
    priority: String,
    userID:String,
    user: String
},{
    versionKey: false
})


const TodoModel = mongoose.model("todo",todoSchema)


module.exports = {
    TodoModel
}