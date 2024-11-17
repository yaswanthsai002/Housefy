import { Router } from "express";
import {
  getAllListings,
  getListing,
  addListing,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.mjs";
import authenticateToken from "../middleware/authenticateToken.middleware.mjs";
import checkAccountStatus from "../middleware/accountStatus.middleware.mjs";

const router = Router();

router.get("/", authenticateToken, checkAccountStatus, getAllListings);
router.get("/:id", authenticateToken, checkAccountStatus, getListing);
router.post("/", authenticateToken, checkAccountStatus, addListing);
router.put("/:id", authenticateToken, checkAccountStatus, updateListing);
router.delete("/:id", authenticateToken, checkAccountStatus, deleteListing);

export default router;
