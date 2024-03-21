const { readInfoFile } = require("./utils");
const { isInfoFile } = require("./");

// TEMPORARY SCRIPT TO CHECK FUNCTIONALITY; TO BE REMOVED WHEN TICKET IS FINISHED

// read the info file
//const infofile = readInfoFile("./DemoCar_Infofile");
//console.log(infofile);
//const fileIdent = infofile.getString("FileIdent");
console.log(
  isInfoFile({ file: "./__tests__/infofiles/DemoCar", type: "Vehicle" })
);
