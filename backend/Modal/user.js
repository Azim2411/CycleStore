const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
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
    userType:{
        type:String,
        required:false,
        default:"admin"
    },
    active:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)
module.exports={User}