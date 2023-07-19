require('dotenv').config();
const cookieParser = require('cookie-parser');
const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose");
const { Verifyjwt } = require('./middleware');
const bodyparser=require("body-parser")
const jsonparser=bodyparser.json()
app.use(jsonparser)
app.use(cors(({
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true // Allow credentials
  })))
app.use(express.json())
app.use(cookieParser());
mongoose.connect(process.env.DATABASE_URL).then((res)=>{
    if(res){
        console.log("database connected")
        app.listen(4000,()=>{
            console.log("server start at port 4000")
        })
    }
})

app.use("/api/contact", require("./Routes/contact"))
app.use("/api/user",require("./Routes/user"))
app.use("/api/product",require("./Routes/product"))
app.use("/api/s3",require("./Routes/s3"))

