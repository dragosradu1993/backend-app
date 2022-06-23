const util = require("util");
const multer = require("multer");
const path = require('path')
const multiparty = require('multiparty');
const uploadUtils = require("./utils/upload.utils");
const maxSize = 2 * 1024 * 1024;



let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //console.log("cb:", req, file, cb)
    console.log(req.query)
    cb(null, path.resolve(`./resources/${req.query.env}/upload/${req.query.type}`));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
console.log(uploadFile)
let uploadFileService = util.promisify(uploadFile);
module.exports = uploadFileService;