const { readInfoFile, validateStringArray } = require("./utils");

// helper function to get keys value
function getKeyValue({ fileHandle, keys }) {
  // determine the keys kind
  const keyKind = fileHandle.keyKind(keys);

  // depending on the keys kind, get the value of the keys
  switch (keyKind) {
    case "String_Key":
      const string = fileHandle.getString(keys);

      // split string by whitespace
      const splitString = string.split(/\s/);

      // check if every element in the split string is a number
      const isNumber = splitString.every((element) => !isNaN(element));

      // determine if this is a number and return either a single number or an array of numbers
      let stringValue = string;
      if (isNumber) {
        // convert each string to a number
        stringValue = splitString.map((string) => {
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

      // for every element in text value split by whitespace
      const splitText = textValue.map((text) => {
        return text.split(/\s/);
      });

      // check if every element in the split string is a number
      const isNumberText = splitText.every((element) => {
        return element.every((element) => !isNaN(element));
      });

      // check every array in textValue to see if it contains any text
      if (isNumberText) {
        // convert each string to a number
        textValue = splitText.map((textArray) => {
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
