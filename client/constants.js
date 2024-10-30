export const publicNavTabs = [
  {
    tabId: "HOME",
    tabDisplayText: "Home",
    to: "/",
  },
  {
    tabId: "EXPLORE",
    tabDisplayText: "Explore",
    to: "/explore",
  },
];

export const privateNavTabs = [
  {
    tabId: "PROFILE",
    tabDisplayText: "View Profile",
    to: "/profile",
  },
  {
    tabId: "LISTINGS",
    tabDisplayText: "View Listings",
    to: "/listings",
  },
  {
    tabId: "SETTINGS",
    tabDisplayText: "View Settings",
    to: "/settings",
  },
];

export const handleModalClick = (e, containerRef, callback, value) => {
  if (containerRef.current && !containerRef.current.contains(e.target)) {
    callback(value);
  }
};
