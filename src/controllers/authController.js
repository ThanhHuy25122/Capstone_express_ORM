const { checkToken } = require("../config/jwt");
const { errorCode } = require("../config/response");

const authentication = (req, res, next) => {
  try {
    //lấy token từ FE client
    let { token } = req.headers;

    // kiểm tra token
    checkToken(token);

    // nếu hợp lệ
    next();
  } catch (err) {
    // nếu không hợp lệ
    errorCode(res, "Access denied.");
  }
};
module.exports = { authentication };
