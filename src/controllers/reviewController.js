const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../config/response");
const prima = new PrismaClient();

const getReview = async (req, res) => {
  try {
    const data = await prima.binh_luan.findMany({
      include: {
        nguoi_dung: true,
        hinh_anh: true,
      },
    });
    successCode(res, data, "Get preview success");
  } catch (error) {
    failCode(res);
  }
};

const saveReview = async (req, res) => {
  try {
    const { userId, imageId } = req.query;
    const user = await prima.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(userId),
      },
    });
    const image = await prima.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });
    if (user && image) {
      const { content } = req.body;
      const data = {
        nguoi_dung_id: Number(userId),
        hinh_id: Number(imageId),
        ngay_binh_luan: new Date(),
        noi_dung: content,
      };
      try {
        await prima.binh_luan.create({
          data: data,
        });
        successCode(res, data, "Add comment success");
      } catch (error) {
        failCode(res);
      }
    } else {
      errorCode(res, "User or Image not found");
    }
  } catch (error) {
    failCode(res);
  }
};

const updateReview = async (req, res) => {
  try {
    const { userId, imageId, reviewId } = req.query;
    const user = await prima.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(userId),
      },
    });
    const image = await prima.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });

    const review = await prima.binh_luan.findFirst({
      where: {
        binh_luan_id: Number(reviewId),
      },
    });

    if (!review) {
      return errorCode(res, "Review not found");
    }

    if (
      user.nguoi_dung_id !== Number(reviewId) ||
      image.hinh_id !== Number(reviewId)
    ) {
      return errorCode(
        res,
        {},
        "You are not authorized to change the comment."
      );
    }

    if (user && image && review) {
      const { content } = req.body;
      const data = {
        nguoi_dung_id: Number(userId),
        hinh_id: Number(imageId),
        ngay_binh_luan: new Date(),
        noi_dung: content,
      };
      try {
        await prima.binh_luan.update({
          data: data,
          where: {
            binh_luan_id: Number(reviewId),
          },
        });
        successCode(res, data, "update comment success");
      } catch (error) {
        failCode(res);
      }
    }
  } catch (error) {
    failCode(res);
  }
};

const removeReview = async (req, res) => {
  try {
    const { userId, reviewId } = req.query;
    const user = await prima.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(userId),
      },
    });

    const review = await prima.binh_luan.findFirst({
      where: {
        binh_luan_id: Number(reviewId),
      },
    });
    if (user.nguoi_dung_id !== Number(reviewId)) {
      return errorCode(
        res,
        {},
        "You are not authorized to change the comment."
      );
    }

    if (user && review) {
      const { content } = req.body;
      const data = {
        nguoi_dung_id: Number(userId),
        hinh_id: Number(imageId),
        ngay_binh_luan: new Date(),
        noi_dung: content,
      };
      try {
        await prima.binh_luan.update({
          data: data,
          where: {
            binh_luan_id: Number(reviewId),
          },
        });
        successCode(res, data, "update comment success");
      } catch (error) {
        failCode(res);
      }
    } else {
      errorCode(res, "Review not found");
    }
  } catch (error) {
    failCode(res);
  }
};

module.exports = {
  getReview,
  saveReview,
  updateReview,
};
