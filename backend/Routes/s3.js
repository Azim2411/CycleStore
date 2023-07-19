const express = require("express");
const multer = require("multer");
const { uploadMultipleFiles, uploadFile,getImage } = require("../Controller/s3");
const { Verifyjwt } = require("../middleware");
// const { uploadFile,uploadGallery,getImage} = require("../controller/s3");
const router = express.Router();

const fileengine = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, "");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});
const MaxSize = 10 * 1024 * 1024;
const upload = multer({
    storage: fileengine,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/webp" ||
            file.mimetype == "application/pdf" ||
            file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype == "application/vnd.ms-excel" 
        ) {
            cb(null, true);
        } else {
            req.fileValidationError = "Only .png, .jpg and .jpeg format allowed!";
             return cb(null, true);
            // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
        // check file size
        if (file.size > MaxSize) {
            req.fileValidationError = "Max file size exceeded (10Mb)!";
            return cb(null, true);
            // return cb(new Error("Max file size exceeded (10Mb)!"));
        }
    },
    limits:{
        fileSize:MaxSize
    }
});

const PDF_MAXSIZE = 8 * 1024 * 1024;

const uploadMultiple = multer({
    storage: fileengine,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "application/pdf" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ) {
            cb(null, true);
        } else {
            req.fileValidationError = "Only pdf format allowed!";
            return cb(null, false);
            // return cb(new Error("Only pdf format allowed!"));
        }
    },
    limits:{
        fileSize:PDF_MAXSIZE
    }
});

// router.get("/getImage", getImage);
// router.use(verifyJwt);
// router.post("/upload", upload.single('File'), uploadFile, (error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//       // Multer error occurred
//       if (error.code === 'LIMIT_FILE_SIZE') {
//         // File size limit exceeded
//        return  res.status(200).json({ success: false, message: 'File size limit exceeded 10 MB' });
//       } else {
//         // Other Multer errors
//        return  res.status(200).json({ success: false, message: 'Multer error: ' + error.message });
//       }
//     } else {
//       // Other error occurred
//      return  res.status(200).json({ success: false, message: 'Internal server error' });
//     }
//   });
router.use(Verifyjwt)
router.post("/upload",upload.single("file"),uploadFile)
router.post("/uploadMultiple",uploadMultiple.array("files",20),uploadMultipleFiles);
router.get("/getImage",getImage)
module.exports = router;
