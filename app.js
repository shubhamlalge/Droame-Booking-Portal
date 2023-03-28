const express = require("express");
const app=express();
const mysql = require("mysql2");
const cors=require("cors");
require("./db/conn")
const router=require("./Router/router");

const port=8001;


// app.get("/",(req,res)=>{
//     res.send("server start")
// })


// Middleware
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, ()=>{
    console.log("server strat at port number is" + port)
})
