const express = require("express");
const {
  getSaveImage,
  handleImage,
} = require("../controllers/saveImageController");
const saveImageRouter = express.Router();

saveImageRouter.get("/get-save", getSaveImage);
saveImageRouter.post("/save", handleImage);

module.exports = saveImageRouter;
