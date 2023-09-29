const mongoose = require("mongoose");
const food_items = require("./models/FoodSchema");
const food_category = require("./models/Foodcategory");
const url = `mongodb+srv://aklamaash:akla123@food.5lyephx.mongodb.net/Food?retryWrites=true&w=majority`;
const mongoConnect = async () => {
  mongoose
    .connect(url)
    .then(async(res, err) => {
      if(err) return err;
      console.log("Mongoose Connected!");
      global.food_items = await food_items.find({});
      global.food_category = await food_category.find({});
    })
    .catch((err) => {
      console.log("Not Connected");
    });
};

module.exports = mongoConnect;