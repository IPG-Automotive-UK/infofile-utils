const { readInfoFile } = require("./utils");

// helper function to determine the validity of the provided infofile type
function isValidType(type) {
  switch (type) {
    case "Vehicle":
      return true;
    case "TestRun":
      return true;
    case "Model":
      return true;
    default:
      return false;
  }
}

// a function to determine whether a file is an infofile or not
function isInfoFile({ file, type }) {
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
        if (
          fileIdent.match(/^CarMaker-Car\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/)
        ) {
          // delete the infofile handle
          infofile.delete();
          return true;
        } else {
          // delete the infofile handle
          infofile.delete();
          return false;
        }
      // regex match for TestRun in the FileIdent property of the infofile
      case "TestRun":
        if (fileIdent.match(/^CarMaker-TestRun\s\d{2}$/)) {
          // delete the infofile handle
          infofile.delete();
          return true;
        } else {
          // delete the infofile handle
          infofile.delete();
          return false;
        }
      case "Model":
        if (fileIdent.match(/^CarMaker-.+$/)) {
          // if it is a valid infofile, but a vehicle or test run infofile, return false (expected a model)
          if (
            fileIdent.match(/^CarMaker-Car\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/) ||
            fileIdent.match(/^CarMaker-TestRun\s\d{2}$/)
          ) {
            // delete the infofile handle
            infofile.delete();
            return false;
          } else {
            // delete the infofile handle
            infofile.delete();
            return true;
          }
        } else {
          // delete the infofile handle
          infofile.delete();
          return false;
        }
      default:
        // delete the infofile handle
        infofile.delete();
        return false;
    }
  } catch {
    // get the error from the infofile handle
    const error = infofile.getError();

    // delete the infofile handle
    infofile.delete();

    // throw the error
    throw new Error(error);
  }
}

// export is infofile function
module.exports = { isInfoFile };
