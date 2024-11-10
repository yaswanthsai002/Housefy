import Listing from "../models/listing.model.mjs";

export const getAllListings = async (err, req, res, next) => {
  try {
    const listings = await Listing.find();
    return res.status(200).json(listings);
  } catch (err) {
    console.log("Error occurred while fetching listings", err);
    return next({
      status: 500,
      message: "Error occurred while fetching listings",
    });
  }
};

export const getListing = async (err, req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next({ status: 404, message: "No Listing found" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    console.log("Error occurred while fetching listing", error);
    return next({
      status: 500,
      message: "Error occurred while fetching listing",
    });
  }
};

export const addListing = async (err, req, res, next) => {};

export const updateListing = async (err, req, res, next) => {};

export const deleteListing = async (err, req, res, next) => {};
