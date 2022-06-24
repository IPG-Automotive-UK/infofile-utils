const os = require("os");
const fs = require("fs");

// load the appropriate infofile addon based on the os type
let infofile;
switch (os.type()) {
  case "Windows_NT":
    infofile = require("./addons/infofile/win64/infofile-win64.node");
    break;
  case "Linux":
    infofile = require("./addons/infofile/linux64/infofile-linux64.node");
    break;
  default:
    console.error(
      "Unsupported OS type: " +
        os.type() +
        ". Infofile only supports Windows and Linux."
    );
}

// helper function to read info file
function readInfoFile({ infofilePath }) {
  // check that infofilePath is a valid path
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // create infofile handle
  infofile.new();

  // read info file
  const nReadErrors = infofile.read(infofilePath);

  // if there are any errors, throw an error
  if (nReadErrors < 0) {
    throw new Error(`Error reading info file ${infofilePath}`);
  }

  // return the infofile handle
  return infofile;
}

// helper function to check if value is valid by being either a string or an array of strings
function isValidStringOrArrayOfStrings(value) {
  // check that value is a string or an array of strings
  // check that key is a valid string or an array of strings
  if (typeof value !== "string" && !Array.isArray(value)) {
    return false;
  }

  let isValid = true;
  if (Array.isArray(value)) {
    // check that all values in the array are valid strings
    isValid = value.every((v) => typeof v === "string");
  }

  return isValid;
}

// helper function to check that infofilePath and key is provided to function
function isInfofilePathAndKeyValid({ infofilePath, key }) {
  // check that infofilePath has been provided
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // check that infofilePath is a valid path
  if (!fs.existsSync(infofilePath)) {
    throw new Error(
      `infofilePath ${infofilePath} does not exist, please ensure path is not a relative path`
    );
  }

  // check that key has been provided
  if (!key) {
    throw new Error("key is required");
  }
}

// helper function to check that infofilePath and keyValues is provided to function
function isInfofilePathAndKeyValuesValid({
  infofilePath,
  keyValues,
  keyValueType,
}) {
  // check that infofilePath has been provided
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // check that keyValues has been provided
  if (!keyValues) {
    throw new Error("keyValues is required");
  }

  // check that if keyValues is an array, that its an array of objects with a key and value property
  if (Array.isArray(keyValues)) {
    if (
      !keyValues.every(
        (kvp) => kvp.hasOwnProperty("key") && kvp.hasOwnProperty("value")
      )
    ) {
      throw new Error(
        "keyValues is an array, but not an array of objects with a key and value property"
      );
    }
  } else {
    // check that keyValues is an object with a key and value property
    if (
      !keyValues.hasOwnProperty("key") ||
      !keyValues.hasOwnProperty("value")
    ) {
      throw new Error(
        "keyValues is not an object with a key and value property"
      );
    }
  }

  // check that if keyValueType is string, that every value in keyValues is a string
  if (keyValueType === "string") {
    if (Array.isArray(keyValues)) {
      if (
        !keyValues.every((thisArray) => typeof thisArray.value === "string")
      ) {
        throw new Error(
          "keyValues is an array of objects, each object has a key and value property, but not all values are strings"
        );
      }
    } else {
      if (typeof keyValues.value !== "string") {
        throw new Error("keyValues.value is not a string");
      }
    }
  }

  // check that if keyValueType is number, that every value in keyValues is a number
  if (keyValueType === "number") {
    if (Array.isArray(keyValues)) {
      if (
        !keyValues.every((thisArray) => typeof thisArray.value === "number")
      ) {
        throw new Error(
          "keyValues is an array of objects, each object has a key and value property, but not all values are numbers"
        );
      }
    } else {
      if (typeof keyValues.value !== "number") {
        throw new Error("keyValues.value is not a number");
      }
    }
  }

  // check that if keyValue type is text, that every value in keyValues is an array
  if (keyValueType === "text") {
    if (Array.isArray(keyValues)) {
      if (
        !keyValues.every((thisArray) => Array.isArray(thisArray.value)) ||
        !keyValues.every((thisArray) =>
          thisArray.value.every((v) => typeof v === "string")
        )
      ) {
        throw new Error(
          "keyValues is an array of objects, each object has a key and value property, but not all values are arrays of strings"
        );
      }
    } else {
      if (
        !Array.isArray(keyValues.value) ||
        !keyValues.value.every((thisArray) => typeof thisArray === "string")
      ) {
        throw new Error("keyValues.value is not an array of strings");
      }
    }
  }
}

// function to get the info file keys
function listKeys({ infofilePath, keyPrefix = "" }) {
  // check that infofilePath has been provided
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // check that infofilePath is a valid path
  if (!fs.existsSync(infofilePath)) {
    throw new Error(
      `infofilePath ${infofilePath} does not exist, please ensure path is not a relative path`
    );
  }

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that keyPrefix is a valid string or an array of strings
  keyPrefixValid = isValidStringOrArrayOfStrings(keyPrefix);
  if (!keyPrefixValid) {
    throw new Error("keyPrefix must be a string or an array of strings");
  }

  try {
    // if key prefix is an array of prefixes, get the keys for all prefixes
    if (Array.isArray(keyPrefix)) {
      const keys = [];
      keyPrefix.forEach((prefix) => {
        const prefixKeys = infofile.listKeys(prefix);
        keys.push(...prefixKeys);
      });

      // delete the infofile handle
      infofile.delete();

      // return the keys
      return keys;
    }

    // get the keys for the specified prefix
    const listKeys = infofile.listKeys(keyPrefix);

    // delete the infofile handle
    infofile.delete();

    // return the keys
    return listKeys;
  } catch (error) {
    console.error(error);
  }
}

// function to get the key kinds
function keyKinds({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const keyKinds = [];
    key.forEach((key) => {
      const keyKind = infofile.keyKind(key);
      keyKinds.push({ key: key, keyKind: keyKind });
    });

    // delete the infofile handle
    infofile.delete();

    // return the key kinds
    return keyKinds;
  }

  // get the key kinds for the specified key
  const keyKind = { key: key, keyKind: infofile.keyKind(key) };

  // delete the infofile handle
  infofile.delete();

  // return the key kinds
  return keyKind;
}

// function to get the value of a key that is a string
function getString({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const values = [];
    key.forEach((key) => {
      const value = infofile.getString(key);
      values.push({ key: key, value: value });
    });

    // delete the infofile handle
    infofile.delete();

    // return the values
    return values;
  }

  // get the value of the specified key
  const value = { key: key, value: infofile.getString(key) };

  // delete the infofile handle
  infofile.delete();

  // return the value
  return value;
}

// function to get the value of key that is a long integer
function getLong({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const values = [];
    key.forEach((key) => {
      const value = infofile.getLong(key);
      values.push({ key: key, value: value });
    });

    // delete the infofile handle
    infofile.delete();

    // return the values
    return values;
  }

  // get the value of the specified key
  const value = { key: key, value: infofile.getLong(key) };

  // delete the infofile handle
  infofile.delete();

  // return the value
  return value;
}

// function to get the value of key that is a double
function getDouble({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const values = [];
    key.forEach((key) => {
      const value = infofile.getDouble(key);
      values.push({ key: key, value: value });
    });

    // delete the infofile handle
    infofile.delete();

    // return the values
    return values;
  }

  // get the value of the specified key
  const value = { key: key, value: infofile.getDouble(key) };

  // delete the infofile handle
  infofile.delete();

  // return the value
  return value;
}

// function to get the value of key that is text
function getText({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const values = [];
    key.forEach((key) => {
      const value = infofile.getText(key);
      values.push({ key: key, value: value });
    });

    // delete the infofile handle
    infofile.delete();

    // return the values
    return values;
  }

  // get the value of the specified key
  const value = { key: key, value: infofile.getText(key) };

  // delete the infofile handle
  infofile.delete();

  // return the value
  return value;
}

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
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // for each key, get the value get the key kinds for all keys
  if (Array.isArray(key)) {
    const keyValues = [];
    key.forEach((key) => {
      const keyValue = getKeyValue({ infofileHandle: infofile, key: key });
      keyValues.push(keyValue);
    });

    // delete the infofile handle
    infofile.delete();

    // return the values
    return keyValues;
  }

  // get the value of the specified key
  const keyValue = getKeyValue({ infofileHandle: infofile, key: key });

  // delete the infofile handle
  infofile.delete();

  // return the value
  return keyValue;
}

// function to delete a key
function deleteKey({ infofilePath, key }) {
  // check that infofilePath and key exist
  isInfofilePathAndKeyValid({ infofilePath, key });

  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // check that key is a valid string or an array of strings
  keyValid = isValidStringOrArrayOfStrings(key);
  if (!keyValid) {
    throw new Error("key must be a string or an array of strings");
  }

  // if the key is an array of keys, get delete all the keys
  if (Array.isArray(key)) {
    const values = [];
    key.forEach((key) => {
      const value = infofile.deleteKey(key);
      values.push({ key: key, value: value });
    });

    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the values
    return values;
  }

  // delete the specified key
  const value = { key: key, value: infofile.deleteKey(key) };

  // write the info file
  infofile.write(infofilePath);

  // delete the infofile handle
  infofile.delete();

  // return the value
  return value;
}

// function to set the value of key that is a string
function setString({ infofilePath, keyValues }) {
  // check that infofilePath and keyValues exist and are valid
  isInfofilePathAndKeyValuesValid({
    infofilePath,
    keyValues,
    keyValueType: "string",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  // if the key is an array of keys, set the key kinds for all keys
  if (Array.isArray(keyValues)) {
    const values = [];
    keyValues.forEach((thiskeyValuePair) => {
      const thisvalue = infofile.setString(
        thiskeyValuePair.key,
        thiskeyValuePair.value
      );
      values.push({ key: thiskeyValuePair.key, value: thisvalue });
    });
    try {
      // write the info file
      infofile.write(infofilePath);

      // delete the infofile handle
      infofile.delete();

      // return the values
      return values;
    } catch (error) {
      throw new Error(error);
    }
  }

  // set the value of the specified key
  const thisValue = infofile.setString(keyValues.key, keyValues.value);

  // write the info file
  try {
    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the value
    return { key: keyValues.key, value: thisValue };
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the value of key that is long
function setLong({ infofilePath, keyValues }) {
  // check that infofilePath and keyValues exist and are valid
  isInfofilePathAndKeyValuesValid({
    infofilePath,
    keyValues,
    keyValueType: "number",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  // if the key is an array of keys, set the key kinds for all keys
  if (Array.isArray(keyValues)) {
    const values = [];
    keyValues.forEach((thiskeyValuePair) => {
      const thisvalue = infofile.setLong(
        thiskeyValuePair.key,
        thiskeyValuePair.value
      );
      values.push({ key: thiskeyValuePair.key, value: thisvalue });
    });
    try {
      // write the info file
      infofile.write(infofilePath);

      // delete the infofile handle
      infofile.delete();

      // return the values
      return values;
    } catch (error) {
      throw new Error(error);
    }
  }

  // set the value of the specified key
  const thisValue = infofile.setLong(keyValues.key, keyValues.value);

  // write the info file
  try {
    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the value
    return { key: keyValues.key, value: thisValue };
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the value of key that is a double
function setDouble({ infofilePath, keyValues }) {
  // check that infofilePath and keyValues exist and are valid
  isInfofilePathAndKeyValuesValid({
    infofilePath,
    keyValues,
    keyValueType: "number",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  // if the key is an array of keys, set the key kinds for all keys
  if (Array.isArray(keyValues)) {
    const values = [];
    keyValues.forEach((thiskeyValuePair) => {
      const thisvalue = infofile.setDouble(
        thiskeyValuePair.key,
        thiskeyValuePair.value
      );
      values.push({ key: thiskeyValuePair.key, value: thisvalue });
    });
    try {
      // write the info file
      infofile.write(infofilePath);

      // delete the infofile handle
      infofile.delete();

      // return the values
      return values;
    } catch (error) {
      throw new Error(error);
    }
  }

  // set the value of the specified key
  const thisValue = infofile.setDouble(keyValues.key, keyValues.value);

  // write the info file
  try {
    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the value
    return { key: keyValues.key, value: thisValue };
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the value of key that is text
function setText({ infofilePath, keyValues }) {
  // check that infofilePath and keyValues exist and are valid
  isInfofilePathAndKeyValuesValid({
    infofilePath,
    keyValues,
    keyValueType: "text",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  // if the key is an array of keys, set the key kinds for all keys
  if (Array.isArray(keyValues)) {
    const values = [];
    keyValues.forEach((thiskeyValuePair) => {
      const thisvalue = infofile.setText(
        thiskeyValuePair.key,
        thiskeyValuePair.value
      );
      values.push({ key: thiskeyValuePair.key, value: thisvalue });
    });
    try {
      // write the info file
      infofile.write(infofilePath);

      // delete the infofile handle
      infofile.delete();

      // return the values
      return values;
    } catch (error) {
      throw new Error(error);
    }
  }

  // set the value of the specified key
  const thisValue = infofile.setText(keyValues.key, keyValues.value);

  // write the info file
  try {
    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the value
    return { key: keyValues.key, value: thisValue };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  listKeys,
  keyKinds,
  getString,
  getLong,
  getDouble,
  getText,
  getKeyValues,
  deleteKey,
  setString,
  setLong,
  setDouble,
  setText,
};
