const jwt = require("jsonwebtoken");

// generate token : add
const createToken = (data) => {
  let token = jwt.sign(
    { data }, // data : object
    process.env.VALID_KEY, // private key : node
    {
      expiresIn: "1h", // exp : 5 hours
      algorithm: "HS256", // algorithm : HS256
    }
  );
  return token;
};

// verify token : test
const checkToken = (token) => {
  let verifyToken = jwt.verify(token, process.env.VALID_KEY);

  return verifyToken;
};

// decode token : decode
const descToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  createToken,
  checkToken,
  descToken,
};
