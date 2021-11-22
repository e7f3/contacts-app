const ApiError = require("../Error/ApiError");

//  Middleware для работы с ошибками с помощью ApiError

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unusual message!" });
};
