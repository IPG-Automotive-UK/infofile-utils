const { readInfoFile, validateStringArray } = require("../utils");

// function to get the key kinds
function keyKinds({ infofilePath, key }) {
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
    // define the keykind to return
    let keyKind;

    // if the key is an array of keys, get the key kinds for all keys
    // otherwise just return the value of the specific key
    if (Array.isArray(key)) {
      const keyKinds = [];
      key.forEach((key) => {
        const keyKind = infofile.keyKind(key);
        keyKinds.push({ key: key, keyKind: keyKind });
      });

      // set keyKind equal to the keykindsArray
      keyKind = keyKinds;
    } else {
      // get the key kinds for the specified key
      keyKind = infofile.keyKind(key);
    }

    // delete the infofile handle
    infofile.delete();

    // return the key kinds
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
