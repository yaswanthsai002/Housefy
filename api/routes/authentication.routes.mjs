import { Router } from "express";
import { signInAPI, signUpAPI, googleSignInAPI } from "../controllers/authentication.controller.mjs";

const router = Router();

router.post("/signin", signInAPI);

router.post("/signup", signUpAPI);

router.post("/google", googleSignInAPI);

export default router;
