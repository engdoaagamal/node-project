const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const uniquename = Date.now() + "-" + Math.round(Math.random() * 100000);
        cb(null, uniquename+path.extname(file.originalname));
    }
});
const upload=multer({storage});
const uploadfileimage=upload.single("profileimage");
module.exports=uploadfileimage;
