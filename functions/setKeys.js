const fs = require("fs");
const { infofile, vaidateInfofilePathAndSetKeyValues } = require("../utils");

// helper function to set keys
function setKey({ infofileHandle, setKeyValues }) {
  // get the type and keyValues
  const type = setKeyValues.type;

  // depending on the type set the key
  try {
    switch (type) {
      case "string":
        const setStringStatus = infofileHandle.setString(
          setKeyValues.key,
          setKeyValues.value
        );
        return { key: setKeyValues.key, status: setStringStatus };
      case "long":
        const setLongStatus = infofileHandle.setLong(
          setKeyValues.key,
          setKeyValues.value
        );
        return { key: setKeyValues.key, status: setLongStatus };
      case "double":
        const setDoubleStatus = infofileHandle.setDouble(
          setKeyValues.key,
          setKeyValues.value
        );
        return { key: setKeyValues.key, status: setDoubleStatus };
      case "text":
        const setTextStatus = infofileHandle.setText(
          setKeyValues.key,
          setKeyValues.value
        );
        return { key: setKeyValues.key, status: setTextStatus };
      default:
        throw new Error(`${type} is not a valid type`);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the key values for any key data type
function setKeys({ infofilePath, setKeyValues }) {
  // check that infofilePath and setKeyValues exist and are valid
  vaidateInfofilePathAndSetKeyValues({ infofilePath, setKeyValues });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(infofilePath)) {
    infofile.read(infofilePath);
  }

  try {
    // define the status to return
    let status;

    // if the setKeyValues are an array, set the values for all keys
    // otherwise set the value of the specified key
    if (Array.isArray(setKeyValues)) {
      const multipleStatus = [];
      setKeyValues.forEach((thissetKeyValue) => {
        const thisStatus = setKey({
          infofileHandle: infofile,
          setKeyValues: thissetKeyValue,
        });
        multipleStatus.push(thisStatus);
      });

      // set status equal to the multipleStatusArray
      status = multipleStatus;
    } else {
      // set the key values
      status = setKey({
        infofileHandle: infofile,
        setKeyValues: setKeyValues,
      });
    }

    // write the info file
    infofile.write(infofilePath);

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
