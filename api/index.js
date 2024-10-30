import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.mjs";
import authenticationRouter from './routes/authentication.routes.mjs'
import userRouter from "./routes/user.routes.mjs"
import errorHandler from "./middleware/error.middleware.mjs";
import cors from "cors";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(json());

app.use(cookieParser());

app.use('/api/auth', authenticationRouter);
app.use('/api/user', userRouter);

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();