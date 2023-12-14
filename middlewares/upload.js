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

module.exports = { upload };
