const { Contact } = require("../Modal/contacts")
// {
//     "AWS":{
//         "accessKeyId": "AKIASZQF2RJSCXIUV4MB",
//         "secretAccessKey": "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",
//         "region": "ap-south-1",
//         "bucket":"vickythebucket"
//     }
// }
const getllallcontact=async(req,res)=>{
    try{
        const allcontacts=await Contact.find({}).sort({createdAt:-1})
    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}

const createContact= async(req,res)=>{
    try{
        const {email,phone,message,name}=req.body
        const contact=await Contact.findOne({$or:[{email:email},{phone:phone}]})
        if(contact){
            return res.json({
                success:false,
                message:"Your Contact already Saved"
            })
        }
        const createContact=await Contact.create({...req.body})
        return res.json({
            success:true,
            message:"Thank you for contacting us"
        })
    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}

module.exports={getllallcontact,createContact}