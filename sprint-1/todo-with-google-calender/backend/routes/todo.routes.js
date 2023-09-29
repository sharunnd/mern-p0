const express = require("express");
const { TodoModel } = require("../models/todo.model");
const { auth } = require("../middlewares/auth.middleware");

const todoRouter = express.Router()


todoRouter.post("/create",auth, async(req,res)=>{
    try {
        const todo = new TodoModel({...req.body,status:false})   
        await todo.save()
        res.status(200).json({msg:"New todo has been added", todo})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

todoRouter.get("/",auth, async(req,res)=>{
    try {
      const todo = await TodoModel.find({userID:req.body.userID})   
      res.send(todo)
  } catch (err) {
      res.json({error:err.message})
  }
})

todoRouter.patch("/update/:todoID",auth, async(req,res)=>{

    const userIDinUserDoc = req.body.userID;
    const {todoID} = req.params;
    try {
        const todo = await TodoModel.findOne({_id:todoID})
        const userIDinTodoDoc = todo.userID;
    if(userIDinUserDoc === userIDinTodoDoc){
        await TodoModel.findByIdAndUpdate({_id:todoID},req.body)
        res.json({msg:`Todo has been updated`})
    }else{
      res.json({msg:"Not Authorized"})
    }
    } catch (error) {
      res.json({error:error.message})
    }
})

todoRouter.delete("/delete/:todoID",auth, async(req,res)=>{

    const userIDinUserDoc = req.body.userID;
    const {todoID} = req.params;
    try {
        const todo = await TodoModel.findOne({_id:todoID})
        const userIDinTodoDoc = todo.userID;
    if(userIDinUserDoc === userIDinTodoDoc){
        await TodoModel.findByIdAndDelete({_id:todoID})
        res.json({msg:`Todo has been deleted`})
    }else{
      res.json({msg:"Not Authorized"})
    }
    } catch (error) {
      res.json({error:error.message})
    }
})

module.exports = {
    todoRouter
}