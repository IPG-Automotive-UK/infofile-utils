// helper function to check that infofilePath and keyValues is provided to function
function validateInfofilePathAndKeyValues({
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
      // check that keyValues is an object with a key and value property
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
      // check that keyValues is an object with a key and value property
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
      // check that keyValues is an object with a key and value property
      if (
        !Array.isArray(keyValues.value) ||
        !keyValues.value.every((thisArray) => typeof thisArray === "string")
      ) {
        throw new Error("keyValues.value is not an array of strings");
      }
    }
  }
}

// export
module.exports = { validateInfofilePathAndKeyValues };
