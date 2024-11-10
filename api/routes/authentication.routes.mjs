import { Router } from "express";
import {
  signInAPI,
  signUpAPI,
  googleSignInAPI,
  validateSessionAPI,
} from "../controllers/authentication.controller.mjs";
import checkAccountStatus from "../middleware/accountStatus.middleware.mjs";

const router = Router();

router.post("/signin", checkAccountStatus, signInAPI);

router.post("/signup", signUpAPI);

router.post("/google", checkAccountStatus, googleSignInAPI);

router.get("/validate-session", validateSessionAPI);

export default router;
