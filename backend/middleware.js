const jwt=require("jsonwebtoken")
const { User } = require("./Modal/user")

const Verifyjwt=(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.json({
                message:"UnAuthorised Please login",
                success:false
            })
        }
        
        jwt.verify(String(token),process.env.SECRET_KEY,(err,data)=>{
            if(err){
                return res.json({
                    message:"UnAuthorised Invalid Credential",
                    success:false
                })
            }
           if(data){
            req.User_id=data.id
           }
        })
        next()
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
const verifySuperAdmin=async(req,res,next)=>{
    try{
        const user=await User.findById(req.User_id)
        if(!user){
            return res.json({
                message:"Please Login",
                success:false
            })
        }

        if(user.userType != "superadmin"){
            return res.json({
                message:"You not have access this route Please Login with superadmin Credential",
                success:false
            })
        }
        next()
    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })
    }
}
module.exports={Verifyjwt,verifySuperAdmin}