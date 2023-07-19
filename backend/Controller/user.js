const {User} =require("../Modal/user")
const bycrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const { Product } = require("../Modal/product")

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({$and:[{email:email},{active:true}]})
        if(!user){
            return res.json({
                message:"User Not Found",
                success:false
            })
        }
        const checkpass=req.body.password==user.password

        if(req.body.password != user.password){
                return res.json({
                    message:"Invalid Credential",
                    success:false
                })
        }
        let token=jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn:"7d"
        })
        await res.cookie("token",token)
        
        return res.json({
            success:true,
            message:"Login SuccessFull",
            user
        })
    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}
const logout=async(req,res)=>{
    try{
        res.clearCookie('token');
        return res.json({
            message:"Logout Sucessfully",
            success:true
        })
    }catch(Err){
        return res.json({
            message:Err.message,
            success:false
        })
    }
}
const createUser=async(req,res)=>{
    try{
        let {name,phone,email,userType,active,password}=req.body
        if(!name || !phone || !email || !userType ){
            return res.json({
                success:false,
                message:"Please Enter Data Properly"
            })
        }
        const userExist=await User.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})
        if(userExist){
            return res.json({
                message:"User Already Exist",
            success:false
            })
        }
        //  req.body.password= await bycrypt.hashSync(password)
        const user= await User.create({...req.body})
        return res.json({
            success:true,
            message:"User Created Successfully"
        })
    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}
const getalluser=async(req,res)=>{
    try{
        const users=await User.find({}).sort({createdAt:-1})
        return res.json({
            message:"User fetch successfully",
            success:true,
            users
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const updateUser=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.params.id})
        if(!user){
            return res.json({
                success:false,
                message:"User Not Found"
            })
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        return res.json({
            success:true,
            message:"User Updated Successfully",
            user:updatedUser
        })
    }catch(err){
       return res.json({
        success:false,
        message:err.message
       })
    }
}
const deleteUser=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.params.id})
        if(!user){
            return res.json({
                success:false,
                message:"User not Found"
            })
        }
        const deleteUser=await User.findByIdAndDelete(req.params.id)

        return res.json({
            success:true,
            message:"User Deleted Successfully"
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const getDashboardDetails=async(req,res)=>{
    try{
        let totaladmin=await User.find({}).count()
        let totalProduct=await Product
        .find({}).count()
        return res.json({
            message:"dashboard details fetch successfully",
            totaladmin,
            totalProduct
        })
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
module.exports={createUser,updateUser,deleteUser,getalluser,login,logout,getDashboardDetails}