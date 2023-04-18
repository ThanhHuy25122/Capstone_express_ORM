// initiate a Pinterest project
// setup server bằng express

const express = require("express");

const app = express();

app.use(express.json()); // cho phép BE req.body đọc được mã json

const cors = require("cors");

app.use(cors()); // cho phép tất cả FE truy cập vào API của BE

app.use(express.static(".")); // định vị  để load tài nguyên từ source

app.listen(8080); // tạo server localhost với port 8080

const rootRouter = require("./routes/rootRoute");

app.use("/api", rootRouter); // sử dụng /api/
