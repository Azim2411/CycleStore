const express=require("express")
const { getalluser, createUser, login, updateUser, logout, getDashboardDetails } = require("../Controller/user")
const { verifySuperAdmin, Verifyjwt } = require("../middleware")
const router=express.Router()

router.post("/login",login)
router.use(Verifyjwt)
router.get("/getalluser",verifySuperAdmin,getalluser)
router.post("/createUser",verifySuperAdmin,createUser)
router.patch("/updateUser/:id",updateUser)
router.post("/logout",logout)
router.get("/getDashboardDetails",getDashboardDetails)

module.exports=router