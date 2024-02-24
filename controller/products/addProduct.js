const { ctrlWrapper } = require("../../helpers");
const { createProduct } = require("../../services");
const { updateDatabase } = require("../../services/updateDatabase");
const { sendInCloudinary } = require("../../services");
const { clearTemp } = require("../../services");
const { makeCopyProductFoto } = require("../../services");

const addCopyToFilename = (url) => {
  const filenameWithCopy = `${url}.copy.jpg`;
  return filenameWithCopy;
};

const addProduct = async (req, res) => {
  try {
    const requestBodyObject = JSON.parse(req.body.requestBody);
    // const { images } = requestBodyObject.product[0];

    const productNewURLs = [];
    // console.log("request BODY".yellow, requestBodyObject.product[0]);
    const { picture } = req.body;

    console.log("picture :>> ", picture);
    // console.log("req.files :>> ", req.files);
    // const test = JSON.parse(picture);
    // console.log("test", test);
    if (req.files && req.files.length > 0) {
      for (const item of req.files) {
        if (item instanceof Object) {
          const { path: tempUpload, filename } = item;
          const cloudinaryResponse = await sendInCloudinary(
            tempUpload,
            filename
          );
          const thumbnail = await makeCopyProductFoto(tempUpload, filename);
          productNewURLs.push({
            full: cloudinaryResponse.secure_url,
            copy: thumbnail,
          });
        } else if ("url" in item) {
          productNewURLs.push(item.url);
        }
      }
    }

    if (Array.isArray(picture)) {
      console.log("Це масив.");
    } else {
      console.log("Це не масив.");
    }

    if (picture) {
      if (picture && Array.isArray(picture)) {
        const parsedPictures = picture.map((item) => {
          return JSON.parse(item);
          console.log("parsedPictures array".violet, parsedPictures);
        });

        const pictureURLs = parsedPictures.map((item) => {
          if (item.url !== "") {
            return { full: item.url, copy: addCopyToFilename(item.url) };
          } else if (productNewURLs.length > 0) {
            return productNewURLs.shift();
          } else {
            return "test";
          }
        });
        console.log("pictureURLs".blue, pictureURLs);

        if (pictureURLs.length) {
          const imagesWithFullsize = pictureURLs.map(({ full, copy }) => ({
            fullsize: full,
            thumbnail: copy,
          }));
          requestBodyObject.product[0].images = imagesWithFullsize;
        }
      } else {
        const parsedPictures = JSON.parse(picture);
        const parsedPicture = [parsedPictures];
        console.log("parsedPicture object:>> ".red, parsedPicture);
        console.log("productNewURLs object:>> ".red, productNewURLs);
        if (parsedPicture.length) {
          const pictureURLs = parsedPicture.map((item) => {
            if (item.url !== "") {
              return { full: item.url, copy: addCopyToFilename(item.url) };
            } else if (productNewURLs.length > 0) {
              return productNewURLs.shift();
            } else {
              return "test";
            }
          });
          console.log("pictureURLs object :>> ".red, pictureURLs);
          const pictureURL = [pictureURLs];

          const imagesWithFullsize = pictureURLs.map(({ full, copy }) => ({
            fullsize: full,
            thumbnail: copy,
          }));
          console.log("imagesWithFullsize", imagesWithFullsize);
          requestBodyObject.product[0].images = imagesWithFullsize;
        }
        // const { full, copy } = pictureURLs;
        // console.log(full, copy);
        // const imagesWithFullsize = {
        //   fullsize: full,
        //   thumbnail: copy,
        // };
      }
    } else {
      const pictureURLs = [];
      requestBodyObject.product[0].images = pictureURLs;
    }



    // -----old 1------

    // if (picture && Array.isArray(picture))

    // if (picture && Array.isArray(picture)) {
    //   console.log("picture :>> ".green, picture);

    //   const parsedPictures = picture.map((item) => {
    //     return JSON.parse(item);
    //   });

    //   const pictureURLs = parsedPictures.map((item) => {
    //     if (item.url !== "") {
    //       return { full: item.url };
    //     } else if (productNewURLs.length > 0) {
    //       return productNewURLs.shift();
    //     } else {
    //       return "test";
    //     }
    //   });

    //   // if (images && images.length > 0) {
    //   //   for (const full of images) {
    //   //     productURLs.push({ full });
    //   //   }
    //   // }

    //   if (pictureURLs.length) {
    //     const imagesWithFullsize = pictureURLs.map(({ full, copy }) => ({
    //       fullsize: full,
    //       thumbnail: copy,
    //     }));
    //     requestBodyObject.product[0].images = imagesWithFullsize;
    //   }
    // } else {
    //   console.log("picture :>> ".red, picture);
    //   if (picture) {
    //     parsedPicture = JSON.parse(picture);
    //     console.log("picture :>> ".blue, parsedPicture);
    //   }
    //   if (picture && productNewURLs) {
    //     console.log("picture :>> ".blue, productNewURLs);
    //     const { full, copy } = productNewURLs;
    //     console.log("copy, full", productNewURLs.copy, productNewURLs.full);
    //     const imagesWithFullsiz = {
    //       fullsize: productNewURLs.full,
    //       thumbnail: productNewURLs.copy,
    //     };
    //     console.log("imagesWithFullsiz:>>", imagesWithFullsiz);
    //     requestBodyObject.product[0].images = imagesWithFullsiz;
    //   }
    // }

    const update = req.query.update;

    const response = await createProduct(requestBodyObject);

    await updateDatabase(update);
    await clearTemp();
    res.status(201).json({
      status: response.data.status,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
