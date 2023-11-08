const multer = require("multer");
const path = require("path");

const storeEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        console.log("--------------------file")
        cb(null, path.join(__dirname, "..", "/upload"))
    },
    filename: (req, file, cb) => {
        console.log(file, "--------------------file");
        cb(null, `file_${Date.now()}_${file.originalname}`)
    }
})
const checkFile = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype)
    console.log(extName, mimeType, "----------------mimeType");
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error:Image cant uploaded")
    }
}
const uploadImages = multer({
    storage: storeEngine,
    limits: { fileSize: 100000 },
    fileFilter: checkFile,
})

module.exports = uploadImages;