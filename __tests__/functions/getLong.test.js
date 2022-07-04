const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// get long tests
describe("getLong tests", () => {
  // test case for getting a long value
  test("can get a long value", () => {
    // get the long value
    const longValue = infofile.getLong({
      infofilePath,
      key: "Body.mass",
    });

    // check that the long value is valid
    expect(longValue).toBe(1301);
  });

  // test case for getting an array of long values
  test("can get an array of long values", () => {
    // get the array of long values
    const longValues = infofile.getLong({
      infofilePath,
      key: ["Body.mass", "nAxle"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1301);
    expect(longValues[1].value).toBe(2);
  });

  // test case for getting a long value for a key that does not exist
  test("can get a long value for a key that does not exist", () => {
    // get the long value for a key that does not exist
    const longValue = infofile.getLong({
      infofilePath,
      key: "RandomKey",
    });

    // check that the long value is valid
    expect(longValue).toEqual(NaN);
  });

  // test case for getting an array of long values where one key does not exist
  test("can get an array of long values where one key does not exist", () => {
    // get the array of long values where one key does not exist
    const longValues = infofile.getLong({
      infofilePath,
      key: ["SuspR.Kin.N", "RandomKey"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1);
    expect(longValues[1].value).toBe(NaN);
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getLong({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getLong({ infofilePath: "./SomeFakeFile.car", key: "Aero.Ax" });
    }).toThrowError("File read error");
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getLong({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getLong({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getLong({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});
