const { readInfoFile, validateStringArray } = require("../utils");

// function to delete a key
function deleteKey({ infofilePath, key }) {
  // check that key has been provided
  if (!key) {
    throw new Error("key is required");
  }

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = validateStringArray(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  try {
    // define the value to return
    let value;

    // if the key is an array of keys, get delete all the keys
    // otherwise, delete the specified key
    if (Array.isArray(key)) {
      const values = [];
      key.forEach((key) => {
        const value = infofile.deleteKey(key);
        values.push({ key: key, value: value });
      });

      // write the info file
      infofile.write(infofilePath);

      // set value equal to the valuesArray
      value = values;
    } else {
      // delete the specified key
      value = { key: key, value: infofile.deleteKey(key) };
    }

    // write the info file
    infofile.write(infofilePath);

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
