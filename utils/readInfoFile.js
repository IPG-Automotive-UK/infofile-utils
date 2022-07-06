// get the infofile relative path should
const { infofile } = require("./getAddon.js");

// helper function to read info file
function readInfoFile(file) {
  // check that file is a valid path
  if (!file || !file.length) {
    throw new Error("file is required");
  }

  // create infofile handle
  infofile.new();

  // read info file
  const nReadErrors = infofile.read(file);

  // if there are any errors, throw an error
  if (nReadErrors < 0) {
    // get error from infofile
    const error = infofile.getError();
    throw new Error(error);
  }

  // return the infofile handle
  return infofile;
}

// export readInfoFile
module.exports = { readInfoFile };
