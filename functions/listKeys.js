const { readInfoFile, validateStringArray } = require("../utils");

// function to get the info file keys
function listKeys({ infofilePath, keyPrefix = "" }) {
  // check that infofilePath has been provided
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that keyPrefix is a valid string or an array of strings
  keyPrefixValid = validateStringArray(keyPrefix);
  if (!keyPrefixValid) {
    throw new Error("keyPrefix must be a string or an array of strings");
  }

  try {
    // if key prefix is an array of prefixes, get the keys for all prefixes
    if (Array.isArray(keyPrefix)) {
      const keys = [];
      keyPrefix.forEach((prefix) => {
        const prefixKeys = infofile.listKeys(prefix);
        keys.push(...prefixKeys);
      });

      // delete the infofile handle
      infofile.delete();

      // return the keys
      return keys;
    }

    // get the keys for the specified prefix
    const listKeys = infofile.listKeys(keyPrefix);

    // delete the infofile handle
    infofile.delete();

    // return the keys
    return listKeys;
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export the listKeys function
module.exports = { listKeys };
