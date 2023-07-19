const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false,
    },
    color:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    images:[
        {
            type:String,
            required:false
        }
    ]
},{
    timestamps:true
})

const Product=mongoose.model("Product",productSchema)

module.exports={Product}