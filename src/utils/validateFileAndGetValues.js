// helper function to check that file and values and type is provided to function
function validateFileAndGetValues({ file, values, type }) {
  // check that file has been provided
  if (!file || !file.length) {
    throw new Error("file is required");
  }

  // check that values has been provided
  if (!values) {
    throw new Error("values is required");
  }

  // check that if values is an array, that its an array of objects with a keys and value property
  if (Array.isArray(values)) {
    if (
      !values.every(
        (kvp) => kvp.hasOwnProperty("keys") && kvp.hasOwnProperty("value")
      )
    ) {
      throw new Error(
        "values is an array, but not an array of objects with a keys and value property"
      );
    }
  } else {
    // check that values is an object with a keys and value property
    if (!values.hasOwnProperty("keys") || !values.hasOwnProperty("value")) {
      throw new Error("values is not an object with a keys and value property");
    }
  }

  // check that if type is string, that every value in values is a string
  if (type === "string") {
    if (Array.isArray(values)) {
      if (!values.every((thisArray) => typeof thisArray.value === "string")) {
        throw new Error(
          "values is an array of objects, each object has a keys and value property, but not all values are strings"
        );
      }
    } else {
      // check that values is an object with a keys and value property
      if (typeof values.value !== "string") {
        throw new Error("values.value is not a string");
      }
    }
  }

  // check that if type is number, that every value in values is a number
  if (type === "number") {
    if (Array.isArray(values)) {
      if (!values.every((thisArray) => typeof thisArray.value === "number")) {
        throw new Error(
          "values is an array of objects, each object has a keys and value property, but not all values are numbers"
        );
      }
    } else {
      // check that values is an object with a keys and value property
      if (typeof values.value !== "number") {
        throw new Error("values.value is not a number");
      }
    }
  }

  // check that if type is text, that every value in values is an array
  if (type === "text") {
    if (Array.isArray(values)) {
      if (
        !values.every((thisArray) => Array.isArray(thisArray.value)) ||
        !values.every((thisArray) =>
          thisArray.value.every((v) => typeof v === "string")
        )
      ) {
        throw new Error(
          "values is an array of objects, each object has a keys and value property, but not all values are arrays of strings"
        );
      }
    } else {
      // check that values is an object with a keys and value property
      if (
        !Array.isArray(values.value) ||
        !values.value.every((thisArray) => typeof thisArray === "string")
      ) {
        throw new Error("values.value is not an array of strings");
      }
    }
  }
}

// export
module.exports = { validateFileAndGetValues };
