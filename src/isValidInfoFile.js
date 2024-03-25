const { readInfoFile } = require("./utils");

/**
 * Helper function to determine the validity of the provided infofile type.
 * @param type Type of infofile to check for e.g. Vehicle
 * @returns tf Boolean indicating valid type or not.
 */
function isValidType(type) {
  return ["Vehicle", "TestRun", "Model", "Road"].includes(type);
}

/**
 * Determines whether a file is an infofile or not.
 * @param file Filepath to infofile
 * @param type Type of infofile to check for e.g. Vehicle
 * @returns tf Boolean indicating valid infofile or not.
 */
function isValidInfoFile({ file, type }) {
  // check that the file has been provided
  if (!file) {
    throw new Error("file is required");
  }

  // check that type has been provided
  if (!type) {
    throw new Error("type is required");
  }

  if (!isValidType(type)) {
    throw new Error("type is invalid");
  }

  // read the info file
  const infofile = readInfoFile(file);

  try {
    const fileIdent = infofile.getString("FileIdent");

    // looks for the appropriate condition to validate the infofile based on the provided type
    switch (type) {
      // regex match for possible vehicle types in the FileIdent property of the infofile
      case "Vehicle":
        return fileIdent.match(/^CarMaker-Car\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/)
          ? true
          : false;
      // regex match for TestRun in the FileIdent property of the infofile
      case "TestRun":
        return fileIdent.match(/^CarMaker-TestRun\s\d{2}$/) ? true : false;
      case "Model":
        if (fileIdent.match(/^CarMaker-.+$/)) {
          // if it is a valid infofile, but a vehicle or test run infofile, return false (expected a model)
          return fileIdent.match(/^CarMaker-Car\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-TestRun\s\d{2}$/)
            ? false
            : true;
        } else {
          return false;
        }
      case "Road":
        // regex pattern search for Roadfile
        return fileIdent.match(/^IPGRoad.+$/) ? true : false;
      default:
        return false;
    }
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  } finally {
    // delete the infofile handle
    infofile.delete();
  }
}

// export is infofile function
module.exports = { isValidInfoFile };
