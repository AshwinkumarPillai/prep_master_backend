const { CustomError, InternalServerError } = require("../utils/custom_error");

module.exports.asyncCatch = (requestHandler) => {
  return async (req, res, next) => {
    try {
      return await requestHandler(req, res, next);
    } catch (err) {
      if (!(err instanceof CustomError)) err = new InternalServerError(err);
      next(err);
    }
  };
};
