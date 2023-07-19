const { Product } = require("../Modal/product")

const getallproduct=async(req,res)=>{
    try{
        const allproducts=await Product.find({}).sort({createdAt:-1})
        return res.json({
            message:"Product fetch successfully",
            success:true,
            allproducts
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const getSingleProduct=async(req,res)=>{
    try{
        const product=await Product.findOne({_id:req.params.id})
        if(!product){
            return res.json({
                message:"product not found",
                success:false
            })
        }
        return res.json({
            message:"Product fetch successfully",
            product,
            success:true
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findOne({_id:req.params.id})
        if(!product){
            return res.json({
                message:"product not found",
                success:false
            })
        }
        const deleteProduct=await Product.findByIdAndDelete({_id:req.params.id})
        return res.json({
            success:true,
            message:"Product Deleted Successfully"
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const createProdcut=async(req,res)=>{
    try{
        const createProdcut=await Product.create({...req.body})
        return res.json({
            message:"Product created successfully",
            success:true
        })

    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const updateProduct=async(req,res)=>{
    try{
        const product=await Product.findOne({_id:req.params.id})
        if(!user){
            return res.json({
                success:false,
                message:"Product Not Found"
            })
        }
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        return res.json({
            success:true,
            message:"Product Updated Successfully",
            product:updatedProduct
        })
    }catch(err){
       return res.json({
        success:false,
        message:err.message
       })
    }
}
module.exports={getallproduct,getSingleProduct,deleteProduct,updateProduct,createProdcut}