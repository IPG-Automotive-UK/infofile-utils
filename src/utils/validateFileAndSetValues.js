// helper function to check that file and values is provided and valid
function validateFileAndSetValues({ file, values }) {
  // check that file has been provided
  if (!file || !file.length) {
    throw new Error("file is required");
  }

  // check that values has been provided
  if (!values) {
    throw new Error("values is required");
  }

  // check that if values is an array, that its an array of objects with a keys, value and type property
  if (Array.isArray(values)) {
    if (
      !values.every(
        (kvp) =>
          kvp.hasOwnProperty("keys") &&
          kvp.hasOwnProperty("value") &&
          kvp.hasOwnProperty("type")
      )
    ) {
      throw new Error(
        "values is an array, but not an array of objects with a keys, value and type property"
      );
    }
  } else {
    // check that values is an object with a keys and value property
    if (
      !values.hasOwnProperty("keys") ||
      !values.hasOwnProperty("value") ||
      !values.hasOwnProperty("type")
    ) {
      throw new Error(
        "values is not an object with a keys, value and type property"
      );
    }
  }

  // check that if values is an array, that its an array of objects that the type is either string, long, double or text
  if (Array.isArray(values)) {
    if (
      !values.every(
        (kvp) =>
          kvp.type === "string" ||
          kvp.type === "long" ||
          kvp.type === "double" ||
          kvp.type === "text"
      )
    ) {
      throw new Error("type in values is not a string, long, double or text");
    }
  } else {
    // check that values is an object with a type property
    if (
      !(
        values.type === "string" ||
        values.type === "long" ||
        values.type === "double" ||
        values.type === "text"
      )
    ) {
      throw new Error("values.type is not a string, long, double or text");
    }
  }

  // if values is an array, check the values based on the type
  if (Array.isArray(values)) {
    // if type is string, check that every value in values is a string
    if (values.every((kvp) => kvp.type === "string")) {
      if (!values.every((kvp) => typeof kvp.value === "string")) {
        throw new Error(
          "values is an array of objects, each object has a keys, value and type property, but not all values are strings"
        );
      }
      // if type is long, check that every value in values is a number
    } else if (values.every((kvp) => kvp.type === "long")) {
      if (!values.every((kvp) => typeof kvp.value === "number")) {
        throw new Error(
          "values is an array of objects, each object has a keys, value and type property, but not all values are numbers"
        );
      }
      // if type is double, check that every value in values is a number
    } else if (values.every((kvp) => kvp.type === "double")) {
      if (!values.every((kvp) => typeof kvp.value === "number")) {
        throw new Error(
          "values is an array of objects, each object has a keys, value and type property, but not all values are numbers"
        );
      }
      // if type is text, check that every value in values is an array of strings
    } else if (values.every((kvp) => kvp.type === "text")) {
      if (
        !values.every((kvp) => Array.isArray(kvp.value)) ||
        !values.every((kvp) => kvp.value.every((v) => typeof v === "string"))
      ) {
        throw new Error(
          "values is an array of objects, each object has a keys, value and type property, but not all values are arrays of strings"
        );
      }
    }
  } else {
    // if values is an object, check the value based on the type
    // if type is string, check that value is a string
    if (values.type === "string") {
      if (typeof values.value !== "string") {
        throw new Error("values.value is not a string");
      }
      // if type is long, check that value is a number
    } else if (values.type === "long") {
      if (typeof values.value !== "number") {
        throw new Error("values.value is not a number");
      }
      // if type is double, check that value is a number
    } else if (values.type === "double") {
      if (typeof values.value !== "number") {
        throw new Error("values.value is not a number");
      }
      // if type is text, check that value is an array of strings
    } else if (values.type === "text") {
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
module.exports = { validateFileAndSetValues };
