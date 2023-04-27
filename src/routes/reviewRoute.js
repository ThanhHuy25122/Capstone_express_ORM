const express = require("express");
const {
  getReview,
  saveReview,
  updateReview,
} = require("../controllers/reviewController");
const { authentication } = require("../controllers/authController");
const reviewRouter = express.Router();

reviewRouter.get("/get-review", getReview);
reviewRouter.post("/save-review", authentication, saveReview);
reviewRouter.put("/update-review", authentication, updateReview);

module.exports = reviewRouter;
