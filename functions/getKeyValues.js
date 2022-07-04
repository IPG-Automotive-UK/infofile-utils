const { readInfoFile, validateStringArray } = require("../utils");

// helper function to get key value
function getKeyValue({ infofileHandle, key }) {
  // determine the key kind
  const keyKind = infofileHandle.keyKind(key);

  // depending on the key kind, get the value of the key
  switch (keyKind) {
    case "String_Key":
      const string = infofileHandle.getString(key);

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

      return { key: key, value: stringValue };
    case "Text_Key":
      const text = infofileHandle.getText(key);

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
      return { key: key, value: textValue };
    case "No_Key":
      return { key: key, value: null };
    default:
      return { key: key, value: null };
  }
}

// function to get key values for any key data type, numbers are returned as doubles
function getKeyValues({ infofilePath, key }) {
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
    // define the key values to return
    let keyValue;

    // if the key is an array of keys, get the key kinds for all keys
    // otherwise just return the value for the specified key
    if (Array.isArray(key)) {
      const keyValues = [];
      key.forEach((key) => {
        const keyValue = getKeyValue({ infofileHandle: infofile, key: key });
        keyValues.push(keyValue);
      });

      // set keyValue equal to the keyValuesArray
      keyValue = keyValues;
    } else {
      // get the value of the specified key
      keyValue = getKeyValue({ infofileHandle: infofile, key: key });
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

// export get key values function
module.exports = { getKeyValues };
