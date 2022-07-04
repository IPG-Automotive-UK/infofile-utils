const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// get double tests
describe("getDouble tests", () => {
  // test case for getting a double value
  test("can get a double value", () => {
    // get the double value
    const doubleValue = infofile.getDouble({
      infofilePath,
      key: "WheelCarrier.fl.mass",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(18);
  });

  // test case for getting an array of double values
  test("can get an array of double values", () => {
    // get the array of double values
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["WheelCarrier.fl.mass", "SuspF.Spring.l0"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(18);
    expect(doubleValues[1].value).toEqual(0.3541);
  });

  // test case for getting a double value for a key that does not exist
  test("can get a double value for a key that does not exist", () => {
    // get the double value for a key that does not exist
    const doubleValue = infofile.getDouble({
      infofilePath,
      key: "RandomKey",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(NaN);
  });

  // test case for getting an array of double values where one key does not exist
  test("can get an array of double values where one key does not exist", () => {
    // get the array of double values where one key does not exist
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["SuspF.Spring.l0", "RandomKey"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(0.3541);
    expect(doubleValues[1].value).toEqual(NaN);
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getDouble({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });
  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getDouble({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError("File read error");
  });
  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getDouble({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getDouble({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getDouble({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});
