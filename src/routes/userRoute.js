const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
} = require("../controllers/userController");
const { authentication } = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.get("/get-user", authentication, getUser);
userRouter.get("/get-user/:userId", getUserById);
userRouter.post("/create-user", authentication, createUser);
userRouter.put("/update-user/:userId", authentication, updateUser);
userRouter.delete("/delete-user/:userId", authentication, deleteUser);

module.exports = userRouter;
