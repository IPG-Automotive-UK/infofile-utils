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

  if (type && !isValidType(type)) {
    throw new Error("type is invalid");
  }

  // read the info file
  console.log(file);
  const infofile = readInfoFile(file);

  try {
    const fileIdent = infofile.getString("FileIdent");
    console.log(fileIdent);

    if (!type) {
      return fileIdent.match(/^IPGRoad.+$/) || fileIdent.match(/^CarMaker-.+$/)
        ? true
        : false;
    }

    // looks for the appropriate condition to validate the infofile based on the provided type
    switch (type) {
      // regex match for possible vehicle types in the FileIdent property of the infofile
      case "Vehicle":
        return fileIdent.match(/^CarMaker-Car\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ||
          fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/)
          ? true
          : false;
      case "Car":
        return fileIdent.match(/^CarMaker-Car\s\d{2}$/) ? true : false;
      case "Motorcycle":
        return fileIdent.match(/^CarMaker-Motorcycle\s\d{2}$/) ? true : false;
      case "Truck":
        return fileIdent.match(/^CarMaker-Truck\s\d{2}$/) ? true : false;
      // regex match for TestRun in the FileIdent property of the infofile
      case "TestRun":
        return fileIdent.match(/^CarMaker-TestRun\s\d{2}$/) ? true : false;
      case "Trailer":
        return fileIdent.match(/^CarMaker-Trailer\s\d{2}$/) ? true : false;
      case "Tire":
        return fileIdent.match(/^CarMaker-Tire-.+$/) ? true : false;
      case "Driver":
        return fileIdent.match(/^CarMaker-DriverTemplate\s\d{2}$/)
          ? true
          : false;
      case "TrafficBehavior":
        return fileIdent.match(/^CarMaker-TrafficGenDriverBehavior\s\d{2}$/)
          ? true
          : false;
      case "TrafficDriver":
        return fileIdent.match(/^CarMaker-TrafficAutoDriver\s\d{2}$/)
          ? true
          : false;
      case "TrafficTemplate":
        return fileIdent.match(/^CarMaker-TrafficTemplate\s\d{2}$/)
          ? true
          : false;
      case "SavedSelections":
        return fileIdent.match(/^GUI-SavedSelections\s\d{2}$/) ? true : false;
      case "UserDriver":
        return fileIdent.match(/^CarMaker-UserDriver-.+$/) ? true : false;
      case "SuspKnC-skc":
        return fileIdent.match(/^CarMaker-SuspKnC-\*\s.+$/) ? true : false;
      case "SuspKnC-mbs":
        return fileIdent.match(/^CarMaker-SuspKnC-[^*]/) ? true : false;
      case "ATDF":
        return fileIdent.match(/^CarMaker-ATDF\s.+$/) ? true : false;
      case "DataDict":
        return fileIdent.match(/^CarMaker-DataDict\s.+$/) ? true : false;
      case "GPUConfig":
        return fileIdent.match(/^CarMaker-GPUConfig\s.+$/) ? true : false;
      case "PTBattery-BattECM":
        return fileIdent.match(/^CarMaker-PTBattery-BattECM\s\d{2}$/)
          ? true
          : false;
      case "AirBrake":
        return fileIdent.match(/^CarMaker-AirBrakeSystem-.+$/) ? true : false;
      case "HydESP":
        return fileIdent.match(/^CarMaker-HydBrakeSystem-HydESP\s.+$/)
          ? true
          : false;
      case "HydIPB":
        return fileIdent.match(/^CarMaker-HydBrakeSystem-HydIPB\s.+$/)
          ? true
          : false;
      case "Suspension":
        return fileIdent.match(/^CarMaker-Susp_.+$/) ? true : false;
      case "SuspensionControl":
        return fileIdent.match(/^CarMaker-SuspControl.+$/) ? true : false;
      case "Road":
        //regex pattern search for Roadfile
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
