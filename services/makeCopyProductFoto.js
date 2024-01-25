// const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const makeCopyProductFoto = async (tempPath, filename) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(tempPath, {
      public_id: `${filename}copy`,
      transformation: { width: 100, height: 100, crop: "fill" },
    });

    const thumbnailURL = uploadResponse.secure_url;
    return thumbnailURL;
    // // Создайте уменьшенную копию изображения
    // const thumbnailBuffer = await sharp(tempPath)
    //   .resize({ width: 100, height: 100 })
    //   .toBuffer();

    // // Создайте промис для upload_stream
    // const uploadStreamPromise = new Promise((resolve, reject) => {
    //   const uploadStream = cloudinary.uploader.upload_stream(
    //     { public_id: filename + "copy", resource_type: "raw" },
    //     (error, result) => {
    //       if (error) {
    //         console.error("Error uploading to Cloudinary:", error.message);
    //         reject(error);
    //       }
    //       resolve(result);
    //     }
    //   );

    //   uploadStream.end(thumbnailBuffer);
    // });

    // // Дождитесь выполнения промиса с таймаутом в 10 секунд
    // const timeoutPromise = new Promise((resolve) => {
    //   setTimeout(resolve, 10000); // 10 секунд
    // });

    // const thumbnailResponse = await Promise.race([
    //   uploadStreamPromise,
    //   timeoutPromise,
    // ]);

    // if (!thumbnailResponse) {
    //   throw new Error("Timeout: Cloudinary upload took too long");
    // }

    // console.log("thumbnailResponse.secure_url", thumbnailResponse.secure_url);

    // return thumbnailResponse.secure_url || tempPath; // Вернуть исходное изображение, если thumbnail не был создан
  } catch (error) {
    console.error("Error creating thumbnail:", error.message);
    throw error;
  }
};

module.exports = { makeCopyProductFoto };
