require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASS, DB_PORT, DB_DIALECT, DB_DATABASE } =
  process.env; // lấy biến môi trường được tạo từ file .env

module.exports = {
  host: DB_HOST,
  username: DB_USERNAME,
  pass: DB_PASS,
  port: DB_PORT,
  dialect: DB_DIALECT,
  database: DB_DATABASE,
};
