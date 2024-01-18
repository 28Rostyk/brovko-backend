const { sendInCloudinary } = require("../services");

const changeImage = async (body, files) => {
  // try {
  //   const requestBodyObject = JSON.parse(body);
  //   const productURLs = [];
  //   if (files && files.length > 0) {
  //     for (const item of files) {
  //       if (item instanceof Object) {
  //         const { path: tempUpload, filename } = item;
  //         const cloudinaryResponse = await sendInCloudinary(
  //           tempUpload,
  //           filename
  //         );
  //         productURLs.push(cloudinaryResponse.secure_url);
  //       } else if ("url" in item) {
  //         console.log("item.url", item.url);
  //         productURLs.push(item.url);
  //       }
  //     }
  //   }
  //   if (productURLs.length) {
  //     const imagesWithFullsize = productURLs.map((url, index) => ({
  //       fullsize: url,
  //       thumbnail: index,
  //     }));
  //     requestBodyObject.product[0].images = imagesWithFullsize;
  //   }
  //   return requestBodyObject;
  // } catch (error) {
  //   console.error("Error updating image in cloudinary:", error);
  //   throw new Error("Внутренняя ошибка сервера");
  // }
};

module.exports = { changeImage };
