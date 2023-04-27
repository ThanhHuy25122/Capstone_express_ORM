const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../config/response");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt"); // mã hóa password

const { createToken } = require("../config/jwt");

const encodePassword = (password, number = 10) => {
  return bcrypt.hashSync(password, number);
};

const userLogin = async (req, res) => {
  try {
    //  username và password
    let { email, password } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });

    // user tồn tại --> kiểm tra tiếp mật khẩu
    if (checkUser) {
      let checkPass = bcrypt.compareSync(password, checkUser.mat_khau);
      if (checkPass) {
        let token = createToken(checkUser);
        successCode(res, token, "Login success");
      } else {
        errorCode(res, "pass word not found");
      }
    } else {
      // user ko tồn tại > ko cho đăng nhập
      errorCode(res, "email not found");
    }
  } catch (error) {
    failCode(res);
  }
};

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
    mat_khau: encodePassword(password),
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

      successCode(res, data, `Signup success`);
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
    mat_khau: encodePassword(password),
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
  //Truy vấn người dùng
  const user = await prisma.nguoi_dung.findFirst({
    where: { nguoi_dung_id: Number(userId) },
  });

  if (!user) {
    return errorCode(res, "User not found.");
  }

  await prisma.nguoi_dung.delete({
    where: { nguoi_dung_id: Number(userId) },
  });

  successCode(res, {}, "User deleted successfully");
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
};
