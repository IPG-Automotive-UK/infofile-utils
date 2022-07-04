const { readInfoFile, validateStringArray } = require("../utils");

// function to get the value of key that is text
function getText({ infofilePath, key }) {
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

    // if the key is an array of keys, get the key kinds for all keys
    // otherwise just return the value of the specific key
    if (Array.isArray(key)) {
      const values = [];
      key.forEach((key) => {
        const value = infofile.getText(key);
        values.push({ key: key, value: value });
      });

      // set value equal to the valuesArray
      value = values;
    } else {
      // get the value of the specified key
      value = { key: key, value: infofile.getText(key) };
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

// export getText function
module.exports = { getText };
