const express = require("express")
const { connectDB } = require("./db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const cors = require("cors")
const app = express()


app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.get("/",async(req,res)=>{
    res.send("hi")
})
connectDB().then(()=>{
    app.listen(process.env.port,()=>{
        try {
            console.log(`Server running at port ${process.env.PORT}`);
        } catch (error) {
            console.log(error);
            console.log("Something went wrong");
        }
    })
})