import Sidebar from "@components/Sidebar";
import { useState } from "react";
import CountrySelect from "../components/CountrySelect";

const generateListings = () => {
  const listingTypes = ["Apartment", "House", "Condo", "Commercial", "Other"];
  const statuses = ["For Sale", "For Rent", "Sold", "Rented"];
  const cities = [
    { city: "New York", state: "New York", country: "USA" },
    { city: "Los Angeles", state: "California", country: "USA" },
    { city: "Mumbai", state: "Maharashtra", country: "India" },
    { city: "Delhi", state: "Delhi", country: "India" },
    { city: "Toronto", state: "Ontario", country: "Canada" },
    { city: "Bangalore", state: "Karnataka", country: "India" },
    { city: "London", state: "England", country: "UK" },
    { city: "Hyderabad", state: "Telangana", country: "India" },
    { city: "Sydney", state: "New South Wales", country: "Australia" },
    { city: "Kolkata", state: "West Bengal", country: "India" },
  ];

  const listings = Array.from({ length: 50 }, (_, i) => {
    const address = cities[Math.floor(Math.random() * cities.length)];
    const isInIndia = address.country === "India";
    return {
      listingId: `LISTING${i + 1}`,
      listingType:
        listingTypes[Math.floor(Math.random() * listingTypes.length)],
      listingPrice: {
        amount: Math.floor(Math.random() * 900000) + 100000,
        currency: isInIndia ? "INR" : "USD",
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      listingAddress: address,
    };
  });

  return listings;
};

const Listings = () => {
  const [query, setQueery] = useState("");
  const [location, setLocation] = useState({
    country: null,
    state: null,
    city: null,
  });
  const handleSetLocation = (country, state, city) => {
    setLocation({ country, state, city });
  };

  const listings = generateListings();

  return (
    <div className="md:min-h-[calc(100vh-80px)] min-h-[calc(100vh-64px)] flex flex-col md:flex-row relative">
      <Sidebar />
      <div className="md:w-4/5 w-full h-full flex flex-col justify-between">
        <div className="w-full rounded-md p-4 flex flex-col justify-between items-start gap-y-8">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl md:text-4xl font-bold font-outfit text-slate-800">
              Your Listings
            </h2>
            <button
              type="button"
              className="text-white cursor-pointer md:text-sm text-xs bg-green-500 md:font-semibold md:px-4 md:py-2 px-2 py-1 rounded-md font-normal"
            >
              Create a Listing
            </button>
          </div>
          <div className="flex flex-col justify-between items-start w-full gap-4">
            <div className="flex md:flex-row flex-col justify-start items-start md:items-center w-full md:gap-4 gap-2">
              <label htmlFor="search" className="text-sm font-semibold">
                Search Listing
              </label>
              <input
                type="search"
                name="search"
                id="search"
                className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow md:w-auto w-full"
                placeholder="Enter keywords like Home, Apartment, etc."
                value={query}
                onChange={(e) => setQueery(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center md:gap-8 gap-4 w-full">
              <CountrySelect
                handleSetLocation={handleSetLocation}
                country={location.country}
                state={location.state}
                city={location.city}
                changeDetails={true}
              />
            </div>
            <button
              type="button"
              className="text-white cursor-pointer bg-orange-500 w-full rounded-md p-2 font-semibold"
            >
              Search Listings
            </button>
          </div>
        </div>
        <div className="w-full  p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          {listings.map((listing, index) => (
            <div
              key={listing.listingId}
              className="bg-white shadow-sm shadow-[#666] cursor-pointer rounded-lg flex flex-col gap-y-2"
            >
              <img
                // src={`https://picsum.photos/1280/720?random=${index}`} // For random images
                // src={`https://unsplash.it/1280/720?random=${index}`} // For random images
                src={`https://loremflickr.com/1280/720/house?random=${index}`} // For random images
                // src="https://images.placeholders.dev/?width=1280&height=720" // For dev placeholder image
                alt="Listing Image"
                loading="lazy"
                className="rounded-t-lg"
              />
              <div className="flex flex-col justify-between items-start gap-y-1 p-2">
                <h6 className="text-sm font-medium text-slate-600">
                  {listing.listingType}
                </h6>
                <h3 className="text-xl md:text-2xl text-slate-800 font-outfit">
                  {new Intl.NumberFormat(
                    `en-${listing.listingPrice.currency.slice(0, 2)}`,
                    {
                      style: "currency",
                      currency: listing.listingPrice.currency,
                    }
                  ).format(listing.listingPrice.amount)}
                  {/* <sub className="text-xs">(per month)</sub> */}
                  {(listing.status === "For Rent" ||
                    listing.status === "Rented") && (
                      <sub className="text-xs">(per month)</sub>
                    )}
                </h3>
                <div className="flex justify-between items-center w-full">
                  <p className="text-xs font-medium text-slate-600">
                    {listing.listingAddress.city},{" "}
                    {listing.listingAddress.state},{" "}
                    {listing.listingAddress.country}
                  </p>
                  {listing.status === "For Sale" ? (
                    <button
                      type="button"
                      className="text-white text-xs bg-green-700 border-2 border-green-700 rounded-md px-2 py-1 font-semibold"
                    >
                      For Sale
                    </button>
                  ) : listing.status === "For Rent" ? (
                    <button
                      type="button"
                      className="text-white text-xs bg-violet-700 border-2 border-violet-700 rounded-md px-2 py-1 font-semibold"
                    >
                      For Rent
                    </button>
                  ) : listing.status === "Sold" ? (
                    <button
                      type="button"
                      className="text-white text-xs bg-green-400 border-2 border-green-400 rounded-md px-2 py-1 font-semibold"
                    >
                      Sold
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white text-xs bg-violet-400 border-2 border-violet-400 rounded-md px-2 py-1 font-semibold"
                    >
                      Rented
                    </button>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-600">
                  <strong>Note:</strong> Property is verified and safe. Price is
                  negotiable.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
