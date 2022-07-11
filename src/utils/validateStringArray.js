// helper function to check if value is valid by being either a string or an array of strings
function validateStringArray(value) {
  // check that value is a string or an array of strings
  if (typeof value !== "string" && !Array.isArray(value)) {
    return false;
  }
  let isValid = true;
  if (Array.isArray(value)) {
    // check that all values in the array are valid strings
    isValid = value.every((v) => typeof v === "string");
  }
  return isValid;
}

// export the helper function
module.exports = { validateStringArray };
