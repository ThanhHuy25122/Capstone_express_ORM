const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../config/response");
const prisma = new PrismaClient();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) =>
    callback(null, process.cwd() + "/public/img"),
  filename: (req, file, callback) => {
    let newName = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
    callback(null, newName);
  },
});

// file System
const fs = require("fs");
const { descToken } = require("../config/jwt");

const upload = multer({ storage: storage });
// API POST method upload
// yarn add multer

const uploadImage = (req, res) => {
  try {
    // lưu image :  file.filename
    const { imageId, userId } = req.query;
    const user = descToken(req.headers.token);

    // Kiểm tra nếu trùng userId mới cho upload image
    if (user.data.nguoi_dung_id !== Number(userId)) {
      return errorCode(res, "Access denied.");
    }
    let file = req.file;

    const imageUrl = "/public/img/";

    fs.readFile(process.cwd() + imageUrl + file.filename, (err, data) => {
      if (err) {
        return errorCode(res, "Error uploading image");
      }

      // => băm base64 => load hoặc lưu dự liệu
      let fileBase = `data:${file.mimetype};base64,${Buffer.from(data).toString(
        "base64"
      )}`;

      if (!file.filename) {
        return errorCode(res, "Error uploading image");
      }
      successCode(
        res,
        `localhost:8080${imageUrl + file.filename}`,
        "Upload image success"
      );

      // => xóa hình
      //xóa file
      // fs.unlink(process.cwd() + imageUrl + file.filename, (err) => {});

      prisma.hinh_anh.update({
        where: {
          hinh_id: Number(imageId),
        },
        data: {
          duong_dan: `localhost:8080` + imageUrl + file.filename,
        },
      });
    });
  } catch (error) {
    failCode(res);
  }
};

// get by all or by user id or keyword
const getImage = async (req, res) => {
  const methods = Object.keys(req.query);
  const { userId, keywords } = req.query;
  //kiểm tra xem đường dẫn có userId không
  if (!userId) {
    //không -> get image all
    try {
      const images = await prisma.hinh_anh.findMany({
        where: {
          ten_hinh: {
            contains: keywords ? keywords : "",
          },
        },
        include: {
          nguoi_dung: true,
        },
      });
      if (images.length > 0) {
        successCode(res, images, "get image success");
      } else {
        errorCode(res, "Cannot find user.");
      }
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
    successCode(res, image, "Get image successful.");
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
    errorCode(res, "No user currently has the ability to upload an image.");
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
    errorCode(res, "There are no images in the repository.");
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
  try {
    const { userId, imageId } = req.query;

    const user = descToken(req.headers.token);

    const image = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });

    //kiểm tra có phải chính chủ xóa image không.
    if (user.data.nguoi_dung_id !== image.nguoi_dung_id) {
      return errorCode(res, "Access denied.");
    }

    if (!image) {
      errorCode(res, "There are no images in the repository.");
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

    // Delete the image
    // fs.unlink(process.cwd() + "/public/img/" + image.duong_dan, (err) => {});

    successCode(res, "Image deleted successfully.");
  } catch (error) {
    failCode(res);
  }
};

module.exports = {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
  upload,
  uploadImage,
};
