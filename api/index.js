import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.config.mjs";
import authenticationRouter from './routes/authentication.routes.mjs'
import errorHandler from "./middleware/error.middleware.mjs";

config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(json());

app.use('/api/auth', authenticationRouter);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});