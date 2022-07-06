const { readInfoFile, validateStringArray } = require("./utils");

// function to delete a keys
function deleteKey({ file, keys }) {
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

  try {
    // read the info file
    const infofile = readInfoFile(file);

    // define the status to return
    let status;

    // if the keys is an array of keys, get delete all the keys
    // otherwise, delete the specified keys
    if (Array.isArray(keys)) {
      const values = [];
      keys.forEach((key) => {
        const value = infofile.deleteKey(key);
        values.push({ keys: key, status: value });
      });

      // write the info file
      infofile.write(file);

      // set value equal to the valuesArray
      value = values;
    } else {
      // delete the specified keys
      value = { key: keys, status: infofile.deleteKey(keys) };
    }

    // write the info file
    infofile.write(file);

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

// export the deleteKey function
module.exports = { deleteKey };
