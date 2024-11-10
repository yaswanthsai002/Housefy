import { Router } from "express";
import {
  getAllListings,
  getListing,
  addListing,
  updateListing,
  deleteListing
} from "../controllers/listing.controller.mjs";
import authenticateToken from "../middleware/authenticateToken.middleware.mjs";
import checkAccountStatus from "../middleware/accountStatus.middleware.mjs";

const router = Router();

router.get("", authenticateToken, checkAccountStatus, getAllListings);
router.get("/listings/:id", authenticateToken, checkAccountStatus, getListing);
router.post("/listings/:id", authenticateToken, checkAccountStatus, addListing);
router.put("/listings/:id", authenticateToken, checkAccountStatus, updateListing);
router.delete("/listings/:id", authenticateToken, checkAccountStatus, deleteListing);

export default router;