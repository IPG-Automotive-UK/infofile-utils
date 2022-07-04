const fs = require("fs");
const {
  infofile,

  validateInfofilePathAndKeyValues,
} = require("../utils");

// function to set the value of key that is long
function setLong({ infofilePath, keyValues }) {
  // check that infofilePath and keyValues exist and are valid
  validateInfofilePathAndKeyValues({
    infofilePath,
    keyValues,
    keyValueType: "number",
  });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  try {
    // define the status to return
    let status;

    // if the keyValues are an array, set the values for all keys
    // otherwise set the value of the specified key
    if (Array.isArray(keyValues)) {
      const multipleStatus = [];
      keyValues.forEach((thiskeyValuePair) => {
        const thisSetStatus = infofile.setLong(
          thiskeyValuePair.key,
          thiskeyValuePair.value
        );
        multipleStatus.push({
          key: thiskeyValuePair.key,
          status: thisSetStatus,
        });
      });

      // set status equal to the multipleStatusArray
      status = multipleStatus;
    } else {
      // set the value of the specified key
      status = infofile.setLong(keyValues.key, keyValues.value);
    }

    // write the info file
    infofile.write(infofilePath);

    // delete the infofile handle
    infofile.delete();

    // return the status
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

// export setLong function
module.exports = { setLong };
