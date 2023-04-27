const express = require("express");
const userRouter = require("./userRoute");
const imageRouter = require("./imageRoute");
const saveImageRouter = require("./saveImageRoute");
const reviewRouter = require("./reviewRoute");

const rootRouter = express.Router(); // khởi tạo Router

rootRouter.use("/user", userRouter);
rootRouter.use("/image", imageRouter);
rootRouter.use("/save-image", saveImageRouter);
rootRouter.use("/review", reviewRouter);

module.exports = rootRouter;
