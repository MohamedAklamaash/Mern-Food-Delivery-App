const express=require("express");
const app = express();
const mongoDb=require("./connection.js")();
const cors=require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}))
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Flow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })
app.use("/Food",require("./routes/DisplayFood"));
app.use("/api",require("./routes/CreateUser"));

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api",require("./routes/OrderData.js"));

app.listen(5000,()=>{
    console.log("Server is Running on port 5000!");
})