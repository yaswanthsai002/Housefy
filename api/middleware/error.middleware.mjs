import { config } from "dotenv";

config();

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong", ...rest } = err;
  res.status(status).json({
    success: false,
    status: status,
    message: message,
    ...rest,
  });
};

export default errorHandler;
