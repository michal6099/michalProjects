const User = require("../models/User")
const jwt = require('jsonwebtoken')

const saveUser = async (req, res) => {
    let user = new User(req.body);
    try {
        let token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET)
        let newUser = await user.save();
        res.status(200).json({ user:newUser, token:token })
    }
    catch (err) {
        res.status(500).json({ err: err })
    }
}

const getUserByEmailAndPassword = async (req, res) => {
  try {
      let token = jwt.sign({email: req.params.email, password: req.params.password }, process.env.SECRET)
      let user = await User.find({ email:req.params.email ,password:req.params.password } )
      if (user) {
          res.status(200).json({ user:user, token:token }) 
      }
      else{
          res.status(404)
      } 
  }
  catch (err) {
      res.status(500).json({ err: err })
  }
}
const updateUserByPasswordAndEmail = async (req, res) => {
        let user;
        try {
        user = await User.findOneAndUpdate(req.params.email, req.body)
          // user= await User.update({name:req.params.userName}, { $set: { password: req.body.myPassword } });
          res.status(200).send("the user is updated")
        } catch (err) {
          res.status(500).json({ err: err.message })
        }

    }
const getAllUsers = async (req, res) => {
  try {
      let user = await User.find();
      res.status(200).json({ user: user })
  }
  catch (err) {
      res.status(500).json({ err: err })
  }

}

module.exports = { getAllUsers, saveUser, getUserByEmailAndPassword,updateUserByPasswordAndEmail}