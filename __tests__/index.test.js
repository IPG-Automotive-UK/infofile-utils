const infofile = require("../index.js");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const infofilePath = require("path").resolve(__dirname, relativePath);

// test suite for list keys
describe("listKey tests", () => {
  // test case for getting all keys
  test("can get all list keys from infofile", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({ infofilePath });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
  });

  // test case for getting all aero keys
  test("can get all aero keys from infofile", () => {
    // get the list of aero keys from the info file
    const keys = infofile.listKeys({ infofilePath, keyPrefix: "Aero" });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
  });

  // test case for getting keys for an array of prefixes
  test("can get keys for an array of prefixes", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body"],
    });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
    expect(keys).toContain("Aero.Ax");
    expect(keys).toContain("Body.I");
  });

  // test case error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.listKeys({});
    }).toThrowError("infofilePath is required");
  });

  // test case error when path is relative
  test("throws error when path is relative", () => {
    // expect error when path is relative
    expect(() => {
      infofile.listKeys({ infofilePath: "./" });
    }).toThrowError("infofilePath must be an absolute path");
  });
});

// test suit for list key kinds
describe("listKeyKinds tests", () => {
  // test case for getting key kinds for a single key
  test("can get keykind for a single key", () => {
    // get the keykind for a single key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Aero.Ax" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case for getting key kinds for an array of keys
  test("can get key kinds for an array of keys", () => {
    // get the keykind for an array of keys
    const keyKinds = infofile.keyKinds({
      infofilePath,
      key: ["Aero.Ax", "Body.I"],
    });

    // check that the keykinds are valid
    expect(keyKinds).toMatchSnapshot();
  });

  // test case that a keyKind of String is returned for a string key
  test("can get keykind for a string key", () => {
    // get the keykind for a string key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Aero.Ax" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case that a keyKind of Text is returned for a text key
  test("can get keykind for a text key", () => {
    // get the keykind for a text key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Description" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case that a keyKind of No_Key is returned for a key that does not exist
  test("can get keykind for a key that does not exist", () => {
    // get the keykind for a key that does not exist
    const keyKind = infofile.keyKinds({ infofilePath, key: "RandomKey" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });
});
