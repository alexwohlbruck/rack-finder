export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const incrementVisits = () => {
  // This is called on page load track the number of visits to the site
};
