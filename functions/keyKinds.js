const { readInfoFile, validateStringArray } = require("../utils");

// function to get the keys kinds
function keyKinds({ file, keys }) {
  // check that keys has been provided
  if (!keys) {
    throw new Error("keys is required");
  }

  // read the info file
  const infofile = readInfoFile(file);

  // check that keys is a valid string or an array of strings
  keyValid = validateStringArray(keys);
  if (!keyValid) {
    throw new Error("keys must be a string or an array of strings");
  }

  try {
    // define the keykind to return
    let keyKind;

    // if the keys is an array of keys, get the keys kinds for all keys
    // otherwise just return the value of the specific keys
    if (Array.isArray(keys)) {
      const keyKinds = [];
      keys.forEach((keys) => {
        const keyKind = infofile.keyKind(keys);
        keyKinds.push({ keys: keys, keyKind: keyKind });
      });

      // set keyKind equal to the keykindsArray
      keyKind = keyKinds;
    } else {
      // get the keys kinds for the specified keys
      keyKind = infofile.keyKind(keys);
    }

    // delete the infofile handle
    infofile.delete();

    // return the keys kinds
    return keyKind;
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export the keyKinds function
module.exports = { keyKinds };
