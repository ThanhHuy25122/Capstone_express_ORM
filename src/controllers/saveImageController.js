const { PrismaClient } = require("@prisma/client");
const { errorCode, successCode, failCode } = require("../config/response");
const prisma = new PrismaClient();

const getSaveImage = async (req, res) => {
  const { imageId, userId } = req.query;

  const image = await prisma.hinh_anh.findFirst({
    where: {
      hinh_id: Number(imageId ? imageId : -1),
    },
  });

  const user = await prisma.nguoi_dung.findFirst({
    where: {
      nguoi_dung_id: Number(userId ? userId : -1),
    },
  });
  // by user and image
  if (image && user) {
    try {
      const data = await prisma.luu_anh.findMany({
        where: {
          hinh_id: Number(imageId),
          nguoi_dung_id: Number(userId),
        },
      });
      successCode(res, data, "get saved image successfully");
    } catch (error) {
      failCode(res);
    }
    return;
  }
  //image

  if (image) {
    try {
      const data = await prisma.luu_anh.findMany({
        where: {
          hinh_id: Number(imageId),
        },
      });
      successCode(res, data, "get saved image successfully");
    } catch (error) {
      failCode(res);
    }
    return;
  }
  // by user
  if (user) {
    try {
      const data = await prisma.luu_anh.findMany({
        where: {
          nguoi_dung_id: Number(userId),
        },
      });
      successCode(res, data, "get saved image successfully");
    } catch (error) {
      failCode(res);
    }
    return;
  }

  if (!user && !image) {
    errorCode(res, "Image vs user not found");
  }
  failCode(res);
};

const handleImage = async (req, res) => {
  const { imageId, userId } = req.query;

  const image = await prisma.hinh_anh.findFirst({
    where: {
      hinh_id: Number(imageId),
    },
  });

  if (!image) {
    errorCode(res, "No image found");
    return;
  }

  const user = await prisma.nguoi_dung.findFirst({
    where: {
      nguoi_dung_id: Number(userId),
    },
  });

  if (!user) {
    errorCode(res, "No user found");
    return;
  }

  const authImage = await prisma.luu_anh.findFirst({
    where: {
      hinh_id: Number(imageId),
      nguoi_dung_id: Number(userId),
    },
  });

  const data = {
    nguoi_dung_id: Number(userId),
    hinh_id: Number(imageId),
    ngay_luu: new Date(),
  };

  if (!authImage) {
    await prisma.luu_anh.create({
      data: data,
    });
    return successCode(res, {}, "Save Image Success");
  } else {
    await prisma.luu_anh.delete({
      where: {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: Number(userId),
          hinh_id: Number(imageId),
        },
      },
    });
    successCode(res, {}, " Delete save image Success");
  }
};

module.exports = {
  getSaveImage,
  handleImage,
};
