module.exports = {
  ...require("./getAddon"),
  ...require("./validateInfofilePathAndKeyValues"),
  ...require("./validateStringArray"),
  ...require("./readInfoFile"),
  ...require("./validateInfofilePathAndSetKeyValues"),
};
