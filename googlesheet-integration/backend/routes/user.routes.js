const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
var jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User Already exists!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          const user = new UserModel({ name, password: hash, email });
          await user.save();
          res.status(200).json({ msg: "User registered successfully" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (email) {
      bcrypt.compare(password, user.password, function (err, result) {
        if(result){
            const token = jwt.sign(
                { user: user.name, userID: user._id },
                `${process.env.SECRET_KEY}`,
                {
                  expiresIn: "7d",
                }
              );
              res.status(200).json({ msg: "Login successful", token });
        }else{
            res.status(400).json({ msg: "wrong credentials!" });
        }
      });
      
    } else {
        res.status(400).json({ msg: "User not found!" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = {
  userRouter,
};
