const express = require("express");
const router = express.Router();
const Orderdata = require("../models/Orders");

router.post("/orders", async (req, res) => {
  let data = req.body.order_data;
  console.log("Data from frontend is:", data);
  await data.splice(0, 0, { Order_Date: req.body.order_date });
  let emailId = await Orderdata.findOne({ email: req.body.email });
  console.log("The email id is:", req.body.email);
  console.log("The mail id is\n", emailId);
  if (emailId === null) {
    try {
      await Orderdata.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.send({ success: true, Orderdata: data });
        console.log("Data is sent to orders section!");
      });
    } catch (err) {
      res.send({ success: false, data: data });
    }
  } else {
    try {
      await Orderdata.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data },
        }
      ).then(() => {
        res.json({ success: true, order_data: data });
      });
    } catch (err) {
      res.json({ success: false, err: err });
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Orderdata.findOne({ email: req.body.email });
    res.json({ success: true, data: myData });
  } catch (err) {
    res.json({ success: false, err: err });
    }
});

module.exports = router;
