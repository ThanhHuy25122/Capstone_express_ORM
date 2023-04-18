const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../config/response");
const prisma = new PrismaClient();

// get by all or by user id
const getImage = async (req, res) => {
  const methods = Object.keys(req.query);
  const { userId } = req.query;
  //kiểm tra xem đường dẫn có userId không
  if (!userId) {
    //không -> get image all
    try {
      const images = await prisma.hinh_anh.findMany({
        include: {
          nguoi_dung: true,
        },
      });
      successCode(res, images, "get image success");
    } catch (error) {
      failCode(res);
    }
  } else {
    // có -> get image by user id
    if (methods.length === 1 && methods[0] === "userId") {
      // kiểm tra query bao gồm 'userId' hay không và có thừa query không
      try {
        const images = await prisma.hinh_anh.findMany({
          where: {
            nguoi_dung_id: Number(userId),
          },
        });
        successCode(res, images, "get image by user success ");
      } catch (error) {
        failCode(res);
      }
    } else {
      errorCode(res, "Error query");
    }
  }
};
// get by id
const getImageById = async (req, res) => {
  const { imageId } = req.params;
  try {
    const image = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });
    successCode(res, image, "OK");
  } catch (error) {
    failCode(res);
  }
};

//create
const createImage = async (req, res) => {
  const { imageName, url, description, userId } = req.body;

  const user = await prisma.nguoi_dung.findFirst({
    where: { nguoi_dung_id: Number(userId ? userId : 0) },
  });

  if (user) {
    const data = {
      ten_hinh: imageName,
      duong_dan: url,
      mo_ta: description,
      nguoi_dung_id: userId,
    };
    try {
      await prisma.hinh_anh.create({
        data: data,
      });
      successCode(res, data, "Create image successfully");
    } catch (error) {
      failCode(res);
    }
  } else {
    errorCode(res, {}, "No user currently has the ability to upload an image.");
  }
};

const updateImage = async (req, res) => {
  const { imageName, url, description } = req.body;
  const { userId, imageId } = req.query;
  const data = {
    ten_hinh: imageName,
    duong_dan: url,
    mo_ta: description,
  };

  const image = await prisma.hinh_anh.findFirst({
    where: {
      hinh_id: Number(imageId),
    },
  });

  if (!image) {
    errorCode(res, {}, "There are no images in the repository.");
    return;
  }

  if (image.nguoi_dung_id !== Number(userId)) {
    errorCode(
      res,
      {},
      "You are not authorized to alter the photo of another user."
    );
    return;
  }
  try {
    await prisma.hinh_anh.update({
      where: {
        hinh_id: Number(imageId),
      },
      data: data,
    });
    successCode(res, data, "Image successfully uploaded");
  } catch (error) {
    failCode(res);
  }
};

const deleteImage = async (req, res) => {
  const { userId, imageId } = req.query;

  const image = await prisma.hinh_anh.findFirst({
    where: {
      hinh_id: Number(imageId),
    },
  });

  if (!image) {
    errorCode(res, {}, "There are no images in the repository.");
    return;
  }

  if (image.nguoi_dung_id !== Number(userId)) {
    errorCode(
      res,
      {},
      "You are not authorized to alter the photo of another user."
    );
    return;
  }
  await prisma.hinh_anh.delete({
    where: {
      hinh_id: Number(imageId),
    },
  });
  successCode(res, {}, "Image deleted successfully.");
};

module.exports = {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
