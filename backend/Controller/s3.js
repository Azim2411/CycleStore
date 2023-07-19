const config = require("config");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
});

const uploadMultipleFiles = async (req, res) => {
    try {
      let files = req.files;
      if (!files.length) {
        return res.json({
          success: false,
          message: "Please Select Files"
        });
      }
  
      let uploads = req.files.map(async (file) => {
        let randomNumber = Date.now();
        let filename =
          randomNumber +
          "_" +
          file.originalname.toLowerCase().split(" ").join("-");
        const params = {
          Bucket: config.AWS.bucket,
          Key: filename,
          Body: file.buffer,
        };
        return new Promise((resolve, reject) => {
          s3.upload(params, async (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });
      });
  
      let responses = await Promise.all(uploads);
      console.log(responses);
      return res.json({
        success: true,
        message: "Files Uploaded Successfully",
        files: responses.map(file=>file.key),
      });
    } catch (err) {
      return res.json({
        message: err.message,
        success: false,
      });
    }
  };

  const uploadFile=async(req,res)=>{
    try{
      const file=req.file
      
      if(!file){
        return res.json({
          success:false,
          message:"please select file"
        })
      }
      const s3= new AWS.S3({
        secretAccessKey:config.AWS.secretAccessKey,
        accessKeyId:config.AWS.accessKeyId
      })
      let randomNumber = Date.now();
      const filename=randomNumber +
      "_" +
      req.file.originalname.toLowerCase().split(" ").join("-");

      const params={
        Bucket:config.AWS.bucket,
        Key: filename,
        Body: req.file.buffer,
      }
      const obj=await new Promise((resolve, reject) => {
        s3.upload(params, async (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
      return res.json({
        success: true,
        message: "File Uploaded Successfully",
        files:obj ,
      });

    }catch(err){
      return res.json({
        success:false,
        message:err.message
      })
    }
  }
  const getImage=(req,res)=>{
    try{
      const url=req.query.url
      const s3=new AWS.S3({
        secretAccessKey:config.AWS.secretAccessKey,
        accessKeyId:config.AWS.accessKeyId
      })
      s3
      .getObject({ Bucket: config.AWS.bucket, Key:url })
      .createReadStream()
      .pipe(res)
      .on("error", (err) => {
          console.log(err);
          res.json({
              success: false,
              message: "Image Could not be fetched",
              Error: err.message,
          });
          // Catching NoSuchKey & StreamContentLengthMismatch
      });
    }catch(err){
      return res.json({
        success:false,
        message:err.message
      })
    }
  }
module.exports={uploadMultipleFiles,uploadFile,getImage}