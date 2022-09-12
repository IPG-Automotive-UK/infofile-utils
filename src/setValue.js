const fs = require("fs");
const { infofile, validateFileAndSetValues } = require("./utils");

// helper to get the infofile error
function getInfofileError({ infofileHandle }) {
  // get the error from the infofile handle
  const error = infofile.getError();

  // delete the infofile handle
  infofileHandle.delete();

  // throw the error
  throw new Error(error);
}

// helper function to set keys
function setKey({ infofileHandle, values }) {
  // get the keys value and key
  const thisKey = values.keys;
  const thisValue = values.value;

  // check if value is empty
  const isEmptyString = thisValue === "";

  // if the value is null throw an error
  if (thisValue === null) {
    throw new Error(`Value for key ${thisKey} cannot be set to null`);
  }

  // if the value is undefined throw an error
  if (thisValue === undefined) {
    throw new Error(`Value for key ${thisKey} cannot be set to undefined`);
  }

  // initialise type and keykind
  let type = "string";
  let keyKind = "string";

  // check if values is a number
  if (!isNaN(Number(thisValue)) && !isEmptyString) {
    type = "number";
    keyKind = "string";
  }

  // check if values is an array of arrays
  let isArrayOfArrays = false;
  if (Array.isArray(thisValue[0])) {
    keyKind = "text";
    isArrayOfArrays = true;
  }

  // if values is an arrays of arrays set the type to number otherwise throw error as arrays
  // of arrays for strings are not supported
  if (isArrayOfArrays) {
    // check that values is an array of arrays with numbers
    if (
      thisValue.every((value) => value.every((value) => !isNaN(Number(value))))
    ) {
      type = "number";
    } else {
      // throw error
      throw new Error(
        `The value of the key ${thisKey} is an array of arrays but the values are not all numbers, only numbers are supported`
      );
    }
  }

  // check if values is an array of numbers or an array of strings when values is not an array of arrays
  let isArrayOfNumbers = false;
  if (
    !isArrayOfArrays &&
    Array.isArray(thisValue) &&
    thisValue.every((value) => !isNaN(Number(value)))
  ) {
    type = "number";
    keyKind = "string";
    isArrayOfNumbers = true;
  }

  // check if values is an array of strings when values is not an array of arrays
  if (
    !isArrayOfArrays &&
    Array.isArray(thisValue) &&
    thisValue.every((value) => isNaN(Number(value)))
  ) {
    type = "string";
    keyKind = "text";
  }

  // depending on the type set the keys
  try {
    switch (keyKind) {
      case "string":
        switch (type) {
          case "string":
            try {
              const setStringStringStatus = infofileHandle.setString(
                thisKey,
                thisValue
              );
              return { keys: thisKey, status: setStringStringStatus };
            } catch {
              // get the infofile error
              return getInfofileError({ infofileHandle });
            }
          case "number":
            // if isArrayOfNumbers convert the values to strings
            try {
              let setStringNumberStatus = -1;
              if (isArrayOfNumbers) {
                // convert numerical array to string array
                let stringValues = thisValue.toString();

                // replace commas with spaces
                stringValues = stringValues.replace(/,/g, " ");

                // set the numerical array as a string
                setStringNumberStatus = infofileHandle.setString(
                  thisKey,
                  stringValues
                );
              } else {
                setStringNumberStatus = infofileHandle.setDouble(
                  thisKey,
                  thisValue
                );
              }
              return { keys: thisKey, status: setStringNumberStatus };
            } catch {
              // get the error from the infofile handle
              return getInfofileError({ infofileHandle });
            }
          default:
            throw new Error(
              "Unable to set key, value has to be either a string, number or array of numbers"
            );
        }
      case "text":
        switch (type) {
          case "string":
            try {
              const setTextStringStatus = infofileHandle.setText(
                thisKey,
                thisValue
              );
              return { keys: thisKey, status: setTextStringStatus };
            } catch {
              // get the error from the infofile handle
              return getInfofileError({ infofileHandle });
            }
          case "number":
            try {
              // convert values to strings
              let stringValues = thisValue.map((value) => value.toString());

              // replace commas with spaces
              stringValues = stringValues.map((value) =>
                value.replace(/,/g, " ")
              );

              const setTextNumberStatus = infofileHandle.setText(
                thisKey,
                stringValues
              );
              return { keys: thisKey, status: setTextNumberStatus };
            } catch {
              // get the error from the infofile handle
              return getInfofileError({ infofileHandle });
            }
          default:
            throw new Error(
              "Unable to set key, value has to be either an array of strings or an array of number arrays"
            );
        }
      default:
        throw new Error(
          "Unable to set value, value has to be either a string, number or array of strings, an array of numbers or an array of number arrays"
        );
    }
  } catch (error) {
    throw new Error(error);
  }
}

// function to set the keys values for any keys data type
function setValue({ file, values }) {
  // check that file and values exist and are valid
  validateFileAndSetValues({ file, values });

  // check if info file exists if so read the existing info file otherwise create a new info file
  infofile.new();
  if (fs.existsSync(file)) {
    infofile.read(file);
  }

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
}

// export the set keys function
module.exports = { setValue };
