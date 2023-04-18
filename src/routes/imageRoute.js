const express = require("express");
const {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/imageController");
const imageRouter = express.Router();

imageRouter.get("/get-image", getImage);
imageRouter.get("/get-image/:imageId", getImageById);
imageRouter.post("/create-image", createImage);
imageRouter.put("/update-image", updateImage);
imageRouter.delete("/delete-image", deleteImage);

module.exports = imageRouter;
