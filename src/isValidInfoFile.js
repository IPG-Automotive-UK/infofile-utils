const { readInfoFile } = require("./utils");

/**
 * Helper function to determine the validity of the provided infofile type.
 * @param type Type of infofile to check for e.g. Vehicle
 * @returns tf Boolean indicating valid type or not.
 */
function isValidType(type) {
  return [
    "Vehicle",
    "Car",
    "Motorcycle",
    "Truck",
    "TestRun",
    "Road",
    "Trailer",
    "Tire",
    "Driver",
    "TrafficBehavior",
    "TrafficDriver",
    "TrafficTemplate",
    "SavedSelections",
    "UserDriver",
    "SuspensionKinematics-skc",
    "SuspensionKinematics-mbs",
    "ADTF",
    "DataDict",
    "GPUConfig",
    "PTBattery-BattECM",
    "AirBrake",
    "HydESP",
    "HydIPB",
    "Suspension",
    "SuspensionControl",
  ].includes(type);
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
  let infofile;

  try {
    infofile = readInfoFile(file);
    const fileIdent = infofile.getString("FileIdent");

    if (!type) {
      return fileIdent.length > 0;
    }

    // looks for the appropriate condition to validate the infofile based on the provided type
    switch (type) {
      // regex match for possible vehicle types in the FileIdent property of the infofile
      case "Vehicle":
        return /^CarMaker-Truck\s\d*|^CarMaker-Car\s\d*|^CarMaker-Motorcycle\s\d*$/.test(
          fileIdent
        );
      case "Car":
        return /^CarMaker-Car\s\d*$/.test(fileIdent);
      case "Motorcycle":
        return /^CarMaker-Motorcycle\s\d*$/.test(fileIdent);
      case "Truck":
        return /^CarMaker-Truck\s\d*$/.test(fileIdent);
      case "TestRun":
        return /^CarMaker-TestRun\s\d*$/.test(fileIdent);
      case "Road":
        return /^IPGRoad.+/.test(fileIdent);
      case "Trailer":
        return /^CarMaker-Trailer\s\d*$/.test(fileIdent);
      case "Tire":
        return /^CarMaker-Tire-.+/.test(fileIdent);
      case "Driver":
        return /^CarMaker-DriverTemplate\s\d*/.test(fileIdent);
      case "TrafficBehavior":
        return /^CarMaker-TrafficGenDriverBehavior\s\d*/.test(fileIdent);
      case "TrafficDriver":
        return /^CarMaker-TrafficAutoDriver\s\d*/.test(fileIdent);
      case "TrafficTemplate":
        return /^CarMaker-TrafficTemplate\s\d*/.test(fileIdent);
      case "SavedSelections":
        return /^GUI-SavedSelections\s\d*/.test(fileIdent);
      case "UserDriver":
        return /^CarMaker-UserDriver-.+/.test(fileIdent);
      case "SuspensionKinematics-skc":
        return /^CarMaker-SuspKnC-\*\s.+/.test(fileIdent);
      case "SuspensionKinematics-mbs":
        return /^CarMaker-SuspKnC-[^*]/.test(fileIdent);
      case "ADTF":
        return /^CarMaker-ADTF\s.+$/.test(fileIdent);
      case "DataDict":
        return /^CarMaker-DataDict\s.+$/.test(fileIdent);
      case "GPUConfig":
        return /^CarMaker-GPUConfig\s.+$/.test(fileIdent);
      case "PTBattery-BattECM":
        return /^CarMaker-PTBattery-BattECM\s\d*/.test(fileIdent);
      case "AirBrake":
        return /^CarMaker-AirBrakeSystem-.+$/.test(fileIdent);
      case "HydESP":
        return /^CarMaker-HydBrakeSystem-HydESP\s.+$/.test(fileIdent);
      case "HydIPB":
        return /^CarMaker-HydBrakeSystem-HydIPB\s.+$/.test(fileIdent);
      case "Suspension":
        return /^CarMaker-Susp_.+$/.test(fileIdent);
      case "SuspensionControl":
        return /^CarMaker-SuspControl.+$/.test(fileIdent);
      default:
        return false;
    }
  } catch (err) {
    // if we failed to read the file it isn't valid
    return false;
  } finally {
    // delete the infofile handle
    if (infofile) {
      infofile.delete();
    }
  }
}

// export is infofile function
module.exports = { isValidInfoFile };
