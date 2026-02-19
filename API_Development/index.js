const express = require("express");
const mongoose=require("mongoose");


const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes=require("./routes/orderRoutes")

dotenv.config(); 
const app = express();

connectDB();

app.use(express.json());
app.use("/api/orders", orderRoutes);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server started at port: ${port}`);
    

})


