const { readInfoFile, validateStringArray } = require("./utils");

// helper function to get keys value
function getKeyValue({ fileHandle, keys }) {
  // determine the keys kind
  const keyKind = fileHandle.keyKind(keys);

  // depending on the keys kind, get the value of the keys
  switch (keyKind) {
    case "String_Key":
      const string = fileHandle.getString(keys);

      // determine if this is a number and return either a single number or an array of numbers
      let stringValue = string;
      if (!string.match(/[a-zA-Z]/)) {
        // for every whitespace character, split the string into an array of strings
        stringValue = string.split(/\s/);

        // convert each string to a number
        stringValue = stringValue.map((string) => {
          return Number(string);
        });

        // if stringValue has only one element, return the number
        if (stringValue.length === 1) {
          stringValue = stringValue[0];
        }
      }

      return { keys: keys, value: stringValue };
    case "Text_Key":
      const text = fileHandle.getText(keys);

      // if text only contains numbers convert to number
      let textValue = text;

      // check every array in textValue to see if it contains any text
      if (textValue.every((string) => !string.match(/[a-zA-Z]/))) {
        // for each array in text value, split the string into an array of strings
        textValue = textValue.map((textArray) => {
          return textArray.split(/\s/);
        });

        // convert each string to a number
        textValue = textValue.map((textArray) => {
          return textArray.map((text) => {
            return Number(text);
          });
        });
      }
      return { keys: keys, value: textValue };
    case "No_Key":
      return { keys: keys, value: null };
    default:
      return { keys: keys, value: null };
  }
}

// function to get keys values for any keys data type, numbers are returned as doubles
function getValue({ file, keys }) {
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
    // define the keys values to return
    let keyValue;

    // if keys is an array of keys, get the keys kinds for all keys
    // otherwise just return the value for the specified keys
    if (Array.isArray(keys)) {
      const values = [];
      keys.forEach((keys) => {
        const keyValue = getKeyValue({ fileHandle: infofile, keys: keys });
        values.push(keyValue);
      });

      // set keyValue equal to the keyValuesArray
      keyValue = values;
    } else {
      // get the value of the specified keys
      keyValue = getKeyValue({ fileHandle: infofile, keys: keys });
    }

    // delete the infofile handle
    infofile.delete();

    // return the value
    return keyValue;
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export get keys values function
module.exports = { getValue };
