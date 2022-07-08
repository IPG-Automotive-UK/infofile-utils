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
}

// export
module.exports = { validateFileAndSetValues };
