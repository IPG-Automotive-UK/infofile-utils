// get the infofile relative path should
const { infofile } = require("./getAddon.js");

// helper function to read info file
function readInfoFile({ infofilePath }) {
  // check that infofilePath is a valid path
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // create infofile handle
  infofile.new();

  // read info file
  const nReadErrors = infofile.read(infofilePath);

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
