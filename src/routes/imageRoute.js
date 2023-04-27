const express = require("express");
const {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
  upload,
  uploadImage,
} = require("../controllers/imageController");
const { authentication } = require("../controllers/authController");
const imageRouter = express.Router();

imageRouter.get("/get-image", getImage);
imageRouter.get("/get-image/:imageId", getImageById);
imageRouter.post("/create-image", authentication, createImage);
imageRouter.put("/update-image", authentication, updateImage);
imageRouter.delete("/delete-image", authentication, deleteImage);
imageRouter.post(
  "/upload-image",
  authentication,
  upload.single("file"),
  uploadImage
);

module.exports = imageRouter;
