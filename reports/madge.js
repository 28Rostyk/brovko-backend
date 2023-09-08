const madge = require("madge");
const path = require("path");

const { exec } = require("child_process");

const currentPath = __dirname;
const appLocation = "../app.js";
const imageLocation = "./dependencies.png";
const pathToApp = path.join(currentPath, appLocation);
const pathToImage = path.join(currentPath, imageLocation);

const graphVizOptions = {
  G: 'size="8,10"', // Розмір в форматі "ширина,висота"
};

const options = {
  fontSize: "24px",
  graphVizOptions: graphVizOptions,
};

madge(pathToApp).then((res) => {
  console.log(res.circular());
});

madge(pathToApp, options)
  .then((res) => res.image(pathToImage))
  .then((writtenImagePath) => {
    console.log("Image written to " + writtenImagePath);

    exec(`start ${pathToImage}`);
  });
