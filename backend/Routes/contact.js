const express=require("express")
const router=express.Router()
const { createContact } = require("../Controller/contact")


router.post("/createContact",createContact)

module.exports=router