const express = require("express");
const router = express.Router();
const food_items = require("../models/FoodSchema");

router.get("/food_items",async(req,res)=>{
    console.log(global.food_category);
    res.status(201).send([global.food_items, global.food_category]);
})

module.exports = router;