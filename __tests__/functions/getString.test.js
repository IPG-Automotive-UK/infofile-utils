const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// get string tests
describe("getString tests", () => {
  // test case for getting a string value
  test("can get a string value", () => {
    // get the string value
    const stringValue = infofile.getString({
      infofilePath,
      key: "Aero.Crosswind.Kind",
    });

    // expected string value
    const expectedStringValue = "Step";

    // check that the string value is valid
    expect(stringValue).toEqual(expectedStringValue);
  });

  // test case for getting an array of string values
  test("can get an array of string values", () => {
    // get the array of string values
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "Aero.Kind"],
    });

    // check that the array of string values is valid
    expect(stringValues[0].value).toBe("Step");
    expect(stringValues[1].value).toBe("Coeff6x1 1");
  });

  // test case for getting a string value for a key that does not exist
  test("can get a string value for a key that does not exist", () => {
    // get the string value for a key that does not exist
    const stringValue = infofile.getString({
      infofilePath,
      key: "RandomKey",
    });

    // check that the string value is valid
    expect(stringValue).toBe("");
  });

  // test case for getting an array of string values where one key does not exist
  test("can get an array of string values where one key does not exist", () => {
    // get the array of string values where one key does not exist
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "RandomKey"],
    });

    // check that the array of string values is valid
    expect(stringValues[0].value).toBe("Step");
    expect(stringValues[1].value).toBe("");
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getString({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getString({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError("File read error");
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getString({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getString({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getString({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});
