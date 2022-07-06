const { readInfoFile, validateStringArray } = require("./utils");

// function to get the value of a keys that is a string
function getString({ file, keys }) {
  // check that the file has been provided
  if (!file) {
    throw new Error("file is required");
  }

  // check that keys has been provided
  if (!keys) {
    throw new Error("keys is required");
  }

  // check that keys is a valid string or an array of strings
  keyValid = validateStringArray(keys);
  if (!keyValid) {
    throw new Error("keys must be a string or an array of strings");
  }

  // read the info file
  const infofile = readInfoFile(file);

  try {
    // define the value to return
    let value;

    // if the keys is an array of keys, get the keys kinds for all keys
    // otherwise just return the value of the specific keys
    if (Array.isArray(keys)) {
      const values = [];
      keys.forEach((key) => {
        const value = infofile.getString(key);
        values.push({ key: key, value: value });
      });

      // set value equal to the valuesArray
      value = values;
    } else {
      // get the value of the specified keys
      value = infofile.getString(keys);
    }

    // delete the infofile handle
    infofile.delete();

    // return the value
    return value;
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export the getString function
module.exports = { getString };
