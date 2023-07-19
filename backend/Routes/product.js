const express=require("express")
const { createProdcut, getallproduct, deleteProduct ,getSingleProduct} = require("../Controller/product")
const { Verifyjwt } = require("../middleware")
const router=express.Router()

router.get("/getallproducts",getallproduct)
router.get("/getSingleProduct/:id",getSingleProduct)
router.use(Verifyjwt)
router.post("/uploadProduct",createProdcut)
router.post("/deleteProduct/:id",deleteProduct)
module.exports=router