const os = require("os");

// load the appropriate infofile addon based on the os type
let infofile;
switch (os.type()) {
  case "Windows_NT":
    infofile = require("../addons/infofile/win64/infofile-win64.node");
    break;
  case "Linux":
    infofile = require("../addons/infofile/linux64/infofile-linux64.node");
    break;
  default:
    // unsupported os type so return object that has basic functions stubbed out to return empty values and throw an appropriate error message
    const errorMessage =
      "Unsupported OS type: " +
      os.type() +
      ". Infofile only supports Windows and Linux.";
    infofile = {
      delete: () => {},
      getError: () => {
        return errorMessage;
      },
    };
    console.error(errorMessage);
}

// export the infofile addon
module.exports = { infofile: infofile };
