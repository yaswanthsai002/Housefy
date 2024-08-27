import { Router } from "express";
import { signinAPI, signupAPI } from "../controllers/authentication.controller.mjs";

const router = Router();

router.post("/signin", signinAPI);

router.post("/signup", signupAPI);

export default router;
