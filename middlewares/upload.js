const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const imageFileFilter = (req, file, cb) => {
//   const allowedFormats = ["jpg", "jpeg", "png"];
//   const fileFormat = path.extname(file.originalname).toLowerCase().substring(1);
//   if (allowedFormats.includes(fileFormat)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file format. Allowed formats: JPG, JPEG, PNG."));
//   }
// };

const upload = multer({
  storage: multerConfig,
  // limits: { fileSize: '5MB' },
  // fileFilter: imageFileFilter,
});

const fileOrUrlHandler = (req, res, next) => {
  if (req.file) {
    req.body.file = req.file;
    console.log('file', req.file)
  } else if (req.body.url) {
    req.body.file = req.body.url;
    console.log(url, req.body.url)
  }

  next();
};

module.exports = { upload, fileOrUrlHandler };