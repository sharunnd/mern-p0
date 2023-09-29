const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    title: String,
    desc: String,
    status: Boolean,
    priority: String
},{
    versionKey: false
})


const UserModel = mongoose.model("user",userSchema)


module.exports = {
    UserModel
}