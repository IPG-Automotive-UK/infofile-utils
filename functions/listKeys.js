const { readInfoFile, validateStringArray } = require("../utils");

// function to get the info file keys
function listKeys({ file, prefix = "" }) {
  // check that file has been provided
  if (!file || !file.length) {
    throw new Error("file is required");
  }

  // read the info file
  const infofile = readInfoFile(file);

  // check that prefix is a valid string or an array of strings
  keyPrefixValid = validateStringArray(prefix);
  if (!keyPrefixValid) {
    throw new Error("prefix must be a string or an array of strings");
  }

  try {
    // if keys prefix is an array of prefixes, get the keys for all prefixes
    if (Array.isArray(prefix)) {
      const keys = [];
      prefix.forEach((prefix) => {
        const prefixKeys = infofile.listKeys(prefix);
        keys.push(...prefixKeys);
      });

      // delete the infofile handle
      infofile.delete();

      // return the keys
      return keys;
    }

    // get the keys for the specified prefix
    const listKeys = infofile.listKeys(prefix);

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
