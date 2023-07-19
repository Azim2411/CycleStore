const { timeStamp } = require("console")
const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false,
    },
    phone:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false
    }
},{
    timestamps:true
})
const Contact=mongoose.model("Contact",contactSchema)
module.exports={Contact}