const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5, max: 100 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async function (req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    try {
      const salt=await bcrypt.genSalt(10);
      const securepass=await bcrypt.hash(req.body.password,salt);
      await user.create({
        name: req.body.name,
        password:securepass,
        email: req.body.email,
        location: req.body.location,
      });
      res.status(201).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(401).json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async function (req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    try {
      let email = req.body.email;
      let userData = await user.findOne({email});
      if(!userData)
      {
        return res.status(400).json({user:"Not valid Credentials"});
      }
      const secpass = bcrypt.compare(req.body.password, userData.password);
      if (!secpass) {
        return res.status(404).send("Enter Valid Password");
      }
      const data={
        user:{
          id : userData.id,  
        }
      }
      const authToken = jwt.sign(data,"secret");//signing in a json web token requires any of the unique field
      return res.status(201).json({success:true,authToken});
    } catch (err) {
      console.log(err);
      res.status(401).json({ success: false });
    }
  }
);

module.exports = router;
