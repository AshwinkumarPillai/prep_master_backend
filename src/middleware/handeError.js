module.exports.handleError = (error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).send({ error });
};
