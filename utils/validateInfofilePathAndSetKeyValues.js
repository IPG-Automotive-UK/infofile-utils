// helper function to check that infofilePath and setKeyValues is provided and valid
function vaidateInfofilePathAndSetKeyValues({ infofilePath, setKeyValues }) {
  // check that infofilePath has been provided
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // check that setKeyValues has been provided
  if (!setKeyValues) {
    throw new Error("setKeyValues is required");
  }

  // check that if setKeyValues is an array, that its an array of objects with a key, value and type property
  if (Array.isArray(setKeyValues)) {
    if (
      !keyValues.every(
        (kvp) =>
          kvp.hasOwnProperty("key") &&
          kvp.hasOwnProperty("value") &&
          kvp.hasOwnProperty("type")
      )
    ) {
      throw new Error(
        "setKeyValues is an array, but not an array of objects with a key, value and type property"
      );
    }
  } else {
    // check that setKeyValues is an object with a key and value property
    if (
      !setKeyValues.hasOwnProperty("key") ||
      !setKeyValues.hasOwnProperty("value") ||
      !setKeyValues.hasOwnProperty("type")
    ) {
      throw new Error(
        "setKeyValues is not an object with a key, value and type property"
      );
    }
  }

  // check that if setKeyValues is an array, that its an array of objects that the type is either string, long, double or text
  if (Array.isArray(setKeyValues)) {
    if (
      !setKeyValues.every(
        (kvp) =>
          kvp.type === "string" ||
          kvp.type === "long" ||
          kvp.type === "double" ||
          kvp.type === "text"
      )
    ) {
      throw new Error(
        "type in setKeyValues is not a string, long, double or text"
      );
    }
  } else {
    // check that setKeyValues is an object with a type property
    if (
      !(
        setKeyValues.type === "string" ||
        setKeyValues.type === "long" ||
        setKeyValues.type === "double" ||
        setKeyValues.type === "text"
      )
    ) {
      throw new Error(
        "setKeyValues.type is not a string, long, double or text"
      );
    }
  }

  // if setKeyValues is an array, check the values based on the type
  if (Array.isArray(setKeyValues)) {
    // if type is string, check that every value in setKeyValues is a string
    if (setKeyValues.every((kvp) => kvp.type === "string")) {
      if (!setKeyValues.every((kvp) => typeof kvp.value === "string")) {
        throw new Error(
          "setKeyValues is an array of objects, each object has a key, value and type property, but not all values are strings"
        );
      }
      // if type is long, check that every value in setKeyValues is a number
    } else if (setKeyValues.every((kvp) => kvp.type === "long")) {
      if (!setKeyValues.every((kvp) => typeof kvp.value === "number")) {
        throw new Error(
          "setKeyValues is an array of objects, each object has a key, value and type property, but not all values are numbers"
        );
      }
      // if type is double, check that every value in setKeyValues is a number
    } else if (setKeyValues.every((kvp) => kvp.type === "double")) {
      if (!setKeyValues.every((kvp) => typeof kvp.value === "number")) {
        throw new Error(
          "setKeyValues is an array of objects, each object has a key, value and type property, but not all values are numbers"
        );
      }
      // if type is text, check that every value in setKeyValues is an array of strings
    } else if (setKeyValues.every((kvp) => kvp.type === "text")) {
      if (
        !setKeyValues.every((kvp) => Array.isArray(kvp.value)) ||
        !setKeyValues.every((kvp) =>
          kvp.value.every((v) => typeof v === "string")
        )
      ) {
        throw new Error(
          "setKeyValues is an array of objects, each object has a key, value and type property, but not all values are arrays of strings"
        );
      }
    }
  } else {
    // if setKeyValues is an object, check the value based on the type
    // if type is string, check that value is a string
    if (setKeyValues.type === "string") {
      if (typeof setKeyValues.value !== "string") {
        throw new Error("setKeyValues.value is not a string");
      }
      // if type is long, check that value is a number
    } else if (setKeyValues.type === "long") {
      if (typeof setKeyValues.value !== "number") {
        throw new Error("setKeyValues.value is not a number");
      }
      // if type is double, check that value is a number
    } else if (setKeyValues.type === "double") {
      if (typeof setKeyValues.value !== "number") {
        throw new Error("setKeyValues.value is not a number");
      }
      // if type is text, check that value is an array of strings
    } else if (setKeyValues.type === "text") {
      if (
        !Array.isArray(setKeyValues.value) ||
        !setKeyValues.value.every((thisArray) => typeof thisArray === "string")
      ) {
        throw new Error("setKeyValues.value is not an array of strings");
      }
    }
  }
}

// export
module.exports = { vaidateInfofilePathAndSetKeyValues };
