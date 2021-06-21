class CustomError extends Error {
  constructor(message, errorCode, status, errorData) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.status = status;
    this.errorData = errorData;
  }
}

class InternalServerError extends CustomError {
  constructor(errorData = {}) {
    super("Internal Server Error", "Internal Server Error", 500, errorData);
  }
}

class BadUserInput extends CustomError {
  constructor(message = "Please Enter all required Details", errorData = {}) {
    super(message, "Bad Request", 400, errorData);
  }
}

class EntityNotFound extends CustomError {
  constructor(message = "The requested resource is not available", errorData = {}) {
    super(message, "Resource not found", 404, errorData);
  }
}

module.exports = {
  CustomError,
  InternalServerError,
  BadUserInput,
  EntityNotFound,
};
