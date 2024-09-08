import { Router } from "express";
import {
  signInAPI,
  signUpAPI,
  googleSignInAPI,
  validateSessionAPI,
} from "../controllers/authentication.controller.mjs";

const router = Router();

router.post("/signin", signInAPI);

router.post("/signup", signUpAPI);

router.post("/google", googleSignInAPI);

router.get("/validate-session", validateSessionAPI);

export default router;
