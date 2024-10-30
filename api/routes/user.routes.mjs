import { Router } from "express";
import {
  updateUser,
  deleteUser,
  disableUser,
} from "../controllers/user.controller.mjs";
import authenticateToken from "../middleware/authenticateToken.middleware.mjs"
import checkAccountStatus from "../middleware/accountStatus.middleware.mjs";

const router = Router();

router.post("/update/:id", authenticateToken, checkAccountStatus, updateUser);
router.delete("/delete/:id", authenticateToken, checkAccountStatus,  deleteUser);
router.put("/disable/:id", authenticateToken, checkAccountStatus,  disableUser);

export default router;
