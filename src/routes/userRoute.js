const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/get-user", getUser);
userRouter.get("/get-user/:userId", getUserById);
userRouter.post("/create-user", createUser);
userRouter.put("/update-user/:userId", updateUser);
userRouter.delete("/delete-user/:userId", deleteUser);

module.exports = userRouter;
