const infofile = require("../../index.js");
const path = require("path");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// test suite for list keys
describe("listKey tests", () => {
  // test case for getting all keys
  test("can get all list keys from infofile", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({ infofilePath });

    // read the demo file without using the infofile api
    const demoFile = fs.readFileSync(infofilePath, "utf8");

    // on every line if there is a = or a : then it is a key, extract the key
    const demoFileKeys = demoFile
      .split("\n")
      .filter((line) => line.includes("=") || line.includes(":"))
      .map((line) => line.split("=")[0].trim());

    // remove : and anything after it
    const demoFileKeysWithoutColon = demoFileKeys.map((key) =>
      key.split(":")[0].trim()
    );

    // sort keys and demoKeysArrayFiltered alphabetically
    const sortedKeys = keys.sort();
    const sortedExpectedKeys = demoFileKeysWithoutColon.sort();

    // check that the keys are valid
    expect(sortedKeys).toEqual(sortedExpectedKeys);
  });

  // test case for getting all aero keys
  test("can get all aero keys from infofile", () => {
    // get the list of aero keys from the info file
    const keys = infofile.listKeys({ infofilePath, keyPrefix: "Aero" });

    // expected aero keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
  });

  // test case for getting keys for an array of prefixes
  test("can get keys for an array of prefixes", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body"],
    });

    // expected keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
      "Body.mass",
      "Body.pos",
      "Body.I",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
  });

  // test case for getting an array of prefixes with one key that doesn't exist
  test("can get an array of prefixes with one key that doesn't exist", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body", "DoesNotExist"],
    });

    // expected keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
      "Body.mass",
      "Body.pos",
      "Body.I",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
  });

  // test case error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.listKeys({});
    }).toThrowError("infofilePath is required");
  });

  // test case error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path can't be found
    expect(() => {
      infofile.listKeys({ infofilePath: "./SomeFakeFile.car" });
    }).toThrowError("File read error");
  });

  // test case error when keyPrefix is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.listKeys({ infofilePath, keyPrefix: 1 });
    }).toThrowError("keyPrefix must be a string or an array of strings");
  });

  // test case error when keyPrefix is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when keyPrefix is not an array of strings
    expect(() => {
      infofile.listKeys({ infofilePath, keyPrefix: [1, 2, "this"] });
    }).toThrowError("keyPrefix must be a string or an array of strings");
  });
});