import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
    enum: ["Apartment", "House", "Condo", "Commercial", "Other"],
  },
  status: {
    type: String,
    required: true,
    enum: ["For Sale", "For Rent", "Sold", "Rented"],
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  payment_frequency: {
    type: String,
    enum: ["Monthly", "Yearly"],
    required: false,
  },
  tax_included: {
    type: Boolean,
    default: false,
  },
  area: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  parking_spaces: {
    type: Number,
    required: false,
    default: 0,
  },
  year_built: {
    type: Number,
    required: false,
  },
  furnishing: {
    type: String,
    enum: ["Furnished", "Unfurnished", "Semi-furnished"],
    required: false,
  },
  heating: {
    type: String,
    required: false,
  },
  cooling: {
    type: String,
    required: false,
  },
  amenities: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    // required: true,
  },
  video: {
    type: String,
    required: false,
  },
  floor_plan: {
    type: String,
    required: false,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  contact_email: {
    type: String,
    // required: true,
  },
  contact_phone: {
    type: String,
    required: false,
  },
  date_listed: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;