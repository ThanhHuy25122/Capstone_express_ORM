const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../config/response");
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  try {
    const data = await prisma.nguoi_dung.findMany();
    successCode(res, data, "success get user");
  } catch (error) {
    failCode(res);
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: Number(userId) },
    });
    successCode(res, user, `success get user`);
  } catch (error) {
    failCode(res);
  }
};

const createUser = async (req, res) => {
  const { email, password, fullName, age, avatar } = req.body;
  const data = {
    email: email,
    mat_khau: password,
    ho_ten: fullName,
    tuoi: age,
    anh_dai_dien: avatar,
  };
  if (
    email !== "" &&
    password !== "" &&
    fullName !== "" &&
    age > 1 &&
    avatar !== ""
  ) {
    try {
      await prisma.nguoi_dung.create({ data: data });

      successCode(res, data, `success get user`);
    } catch (error) {
      failCode(res);
    }
  } else {
    errorCode(res, data, "Provide complete information");
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password, fullName, age, avatar } = req.body;
  const data = {
    email: email,
    mat_khau: password,
    ho_ten: fullName,
    tuoi: age,
    anh_dai_dien: avatar,
  };
  if (userId) {
    if (
      email !== "" &&
      password !== "" &&
      fullName !== "" &&
      age > 1 &&
      avatar !== ""
    ) {
      try {
        await prisma.nguoi_dung.update({
          where: { nguoi_dung_id: Number(userId) },
          data: data,
        });

        successCode(res, data, `success update user`);
      } catch (error) {
        failCode(res);
      }
    } else {
      errorCode(res, data, "Provide complete information");
    }
  } else {
    errorCode(res, data, "Provide complete information");
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const user = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: Number(userId) },
    });

    if (user) {
      try {
        await prisma.nguoi_dung.delete({
          where: { nguoi_dung_id: Number(userId) },
        });
        successCode(res, {}, `success delete user`);
      } catch (error) {
        failCode(res);
      }
    } else {
      errorCode(res, {}, "Please check your user ID again");
    }
  } else {
    failCode(res);
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
