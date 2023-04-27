const express = require("express");
const {
  getSaveImage,
  handleImage,
} = require("../controllers/saveImageController");

const { authentication } = require("../controllers/authController");
const saveImageRouter = express.Router();

saveImageRouter.get("/get-save", authentication, getSaveImage);
saveImageRouter.post("/save", handleImage);

module.exports = saveImageRouter;
