const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    // console.log("req.body :>> ", req.body);

    const { error } = schema.validate(req.body);
    if (error) {
      // console.log("error :>> ", error);
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
