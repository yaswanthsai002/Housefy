import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.config.mjs";
import authenticationRouter from './routes/authentication.routes.mjs'

config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(json());

app.use('/api', authenticationRouter);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
