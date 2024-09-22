import { Router } from "express";
import updateUser from "../controllers/user.controller.mjs";
import authenticateToken from "../middleware/authenticateToken.middleware.mjs"

const router = Router();

router.post("/update/:id", authenticateToken, updateUser);

export default router;
