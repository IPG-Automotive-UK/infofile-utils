const fs = require("fs");
const { infofile, validateFileAndSetKeyValues } = require("../utils");

// helper function to set keys
function setKey({ infofileHandle, values }) {
  // get the type and values
  const type = values.type;

  // depending on the type set the keys
  try {
    switch (type) {
      case "string":
        const setStringStatus = infofileHandle.setString(
          values.keys,
          values.value
        );
        return { keys: values.keys, status: setStringStatus };
      case "long":
        const setLongStatus = infofileHandle.setLong(values.keys, values.value);
        return { keys: values.keys, status: setLongStatus };
      case "double":
        const setDoubleStatus = infofileHandle.setDouble(
          values.keys,
          values.value
        );
        return { keys: values.keys, status: setDoubleStatus };
      case "text":
        const setTextStatus = infofileHandle.setText(values.keys, values.value);
        return { keys: values.keys, status: setTextStatus };
      default:
        throw new Error(`${type} is not a valid type`);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the keys values for any keys data type
function setKeys({ file, values }) {
  // check that file and values exist and are valid
  validateFileAndSetKeyValues({ file, values });

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
      values.forEach((thissetKeyValue) => {
        const thisStatus = setKey({
          infofileHandle: infofile,
          values: thissetKeyValue,
        });
        multipleStatus.push(thisStatus);
      });

      // set status equal to the multipleStatusArray
      status = multipleStatus;
    } else {
      // set the keys values
      status = setKey({
        infofileHandle: infofile,
        values: values,
      });
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

// export the set keys function
module.exports = { setKeys };
