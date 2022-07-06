const { infofile } = require("./utils");

// get error
function getError() {
  // return the last error message
  return infofile.getError();
}

// export the getError function
module.exports = { getError };
