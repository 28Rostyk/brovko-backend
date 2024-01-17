const express = require("express");
const productsRouter = express.Router();


// const multer = require('multer');
// const path = require('path');

// const tempDir = path.join(__dirname, '../', 'temp');

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });


const {
  getAllProducts,
  getProductsByCategory,
  findProductById,
  addProduct,
  removeProducts,
  getProductsByKeywords,
} = require("../../controller");

const { upload, fileOrUrlHandler } = require("../../middlewares");
// const { checkNewProductData, upload } = require("../../middlewares");
// const { addProductSchema, validateBody } = require("../../schemas");

productsRouter.get("/", getAllProducts);
productsRouter.get("/category/:categoryId", getProductsByCategory);
productsRouter.get("/product/:productId", findProductById);
productsRouter.post('/add-product', async (req, res) => {
  try {
    const urlMap = new Map();

    const processPromises = [];

    // Process URLs
    const urls = req.body.urls ? JSON.parse(req.body.urls) : [];
    for (const item of urls) {
      urlMap.set(item.url, null); // Use URL as a key
      processPromises.push(item.url);
    }

    // Process file uploads
    const files = req.files;
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadPromise = new Promise((resolve, reject) => {
          upload.single('picture')(req, res, (err) => {
            if (err) {
              reject(err);
            } else {
              // Store the file path with corresponding URL
              const url = processPromises.shift();
              urlMap.set(url, req.file.path);
              resolve(url);
            }
          });
        });
        processPromises.push(uploadPromise);
      }
    }

    const results = await Promise.all(processPromises);

    // Map URLs to their respective file paths
    const finalUrls = results.map((url) => urlMap.get(url));
    // Rest of your code

    res.status(200).json({ message: 'Products added successfully', urls: finalUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}, addProduct);
productsRouter.post("/remove-product", removeProducts);
productsRouter.get("/search", getProductsByKeywords);

module.exports = { productsRouter };
