import { errorStatusCodes } from "../constants.mjs";
import { config } from "dotenv";

config();

const errorHandler = (err, req, res, next) => {
  const errStatus = res.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default errorHandler;
