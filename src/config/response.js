// https://www.semrush.com/blog/http-status-codes/?kw=&cmp=AA_SRCH_DSA_Blog_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=622582345412&kwid=dsa-1754723155433&cmpid=18361936995&agpid=141795400535&BU=Core&extid=60114129560&adpos=&gclid=CjwKCAjwue6hBhBVEiwA9YTx8BZmYooW2fCVJXJeWr6xLcJmMdnVvSPuisZI3zUq1ksul6dCECh_GhoColgQAvD_BwE
// link tham khảo

// 200 : OK

const successCode = (res, data, message) => {
  return res.status(200).json({
    statusCode: "200",
    message,
    content: data,
  });
};

// 400 : Bad Request

const errorCode = (res, data, message) => {
  return res.status(400).json({
    statusCode: "400",
    message,
    content: data,
  });
};

// 500 : Internal Server Error

const failCode = (res, message = "Internal Server Error") => {
  return res.status(500).json({
    statusCode: "500",
    message,
  });
};

module.exports = {
  successCode,
  errorCode,
  failCode,
};
