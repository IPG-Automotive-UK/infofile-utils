const os = require("os");

// load the appropriate infofile addon based on the os type
let infofile;
switch (os.type()) {
  case "Windows_NT":
    infofile = require("./addons/infofile/win64/infofile-win64.node");
    break;
  case "Linux":
    infofile = require("./addons/infofile/linux64/infofile-linux64.node");
    break;
  default:
    console.error(
      "Unsupported OS type: " +
        os.type() +
        ". Infofile only supports Windows and Linux."
    );
}

// helper function to read info file
function readInfoFile({ infofilePath }) {
  // check that infofilePath is a valid path
  if (!infofilePath || !infofilePath.length) {
    throw new Error("infofilePath is required");
  }

  // check that the infofile path is not a relative path
  if (infofilePath.indexOf(".") === 0) {
    throw new Error("infofilePath must be an absolute path");
  }

  // create infofile handle
  infofile.new();

  // read info file
  const nReadErrors = infofile.read(infofilePath);

  // if there are any errors, throw an error
  if (nReadErrors < 0) {
    throw new Error(`Error reading info file ${infofilePath}`);
  }

  // return the infofile handle
  return infofile;
}

// function to get the info file keys
function listKeys({ infofilePath, keyPrefix = "" }) {
  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // if key prefix is an array of prefixes, get the keys for all prefixes
  if (Array.isArray(keyPrefix)) {
    const keys = [];
    keyPrefix.forEach((prefix) => {
      const prefixKeys = infofile.listKeys(prefix);
      keys.push(...prefixKeys);
    });
    return keys;
  }

  // get the keys for the specified prefix
  return infofile.listKeys(keyPrefix);
}

// function to get the key kinds
function keyKinds({ infofilePath, key }) {
  // read the info file
  const infofile = readInfoFile({ infofilePath });

  // if the key is an array of keys, get the key kinds for all keys
  if (Array.isArray(key)) {
    const keyKinds = [];
    key.forEach((key) => {
      const keyKind = infofile.keyKind(key);
      keyKinds.push({ key: key, keyKind: keyKind });
    });
    return keyKinds;
  }

  // get the key kinds for the specified key
  return { key: key, keyKind: infofile.keyKind(key) };
}

module.exports = { listKeys, keyKinds };
