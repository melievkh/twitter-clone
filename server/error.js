class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (error, req, res) => {
  res.status(400).json({
    message: error.message,
    statusCode: error?.statusCode,
  });
};

const invalidRoute = (req, res, next) => {
  res.status(400).json({
    message: "Invalid Route!",
    statusCode: 404,
  });
};

module.exports = { CustomError, errorHandler, invalidRoute };
