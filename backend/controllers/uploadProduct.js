const uploadProductRouter = require('express').Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/products")
  },
  filename: (req, file, cb) => {
    const fileExp = file.originalname.split('.')[1];
    const fileNewName = require('crypto').randomBytes(12).toString('hex')
    cb(null, `${fileNewName}.${fileExp}`)
  }   
})
const upload = multer({ storage });

uploadProductRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`${req.file.filename}`)  
})

module.exports = uploadProductRouter