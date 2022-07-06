const fs = require("fs");
const { infofile, validateFileAndKeyValues } = require("../utils");

// function to set the value of keys that is a string
function setString({ file, values }) {
  // check that file and values exist and are valid
  validateFileAndKeyValues({
    file: file,
    values: values,
    type: "string",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(file)) {
    infofile.read(file);
  }

  try {
    // define the status to return
    let status;

    // if the values are an array, set the values for all keys
    // otherwise set the value of the specified keys
    if (Array.isArray(values)) {
      const multipleStatus = [];
      values.forEach((thiskeyValuePair) => {
        const thisSetStatus = infofile.setString(
          thiskeyValuePair.keys,
          thiskeyValuePair.value
        );
        multipleStatus.push({
          keys: thiskeyValuePair.keys,
          status: thisSetStatus,
        });
      });

      // set status equal to the multipleStatusArray
      status = multipleStatus;
    } else {
      // set the value of the specified keys
      status = infofile.setString(values.keys, values.value);
    }

    // write the info file
    infofile.write(file);

    // delete the infofile handle
    infofile.delete();

    // return the value
    return status;
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export set string function
module.exports = { setString };
