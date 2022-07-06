const infofile = require("../index");
const path = require("path");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// get long tests
describe("getLong tests", () => {
  // test case for getting a long value
  test("can get a long value", () => {
    // get the long value
    const longValue = infofile.getLong({
      file,
      keys: "Body.mass",
    });

    // check that the long value is valid
    expect(longValue).toBe(1301);
  });

  // test case for getting an array of long values
  test("can get an array of long values", () => {
    // get the array of long values
    const longValues = infofile.getLong({
      file,
      keys: ["Body.mass", "nAxle"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1301);
    expect(longValues[1].value).toBe(2);
  });

  // test case for getting a long value for a keys that does not exist
  test("can get a long value for a keys that does not exist", () => {
    // get the long value for a keys that does not exist
    const longValue = infofile.getLong({
      file,
      keys: "RandomKey",
    });

    // check that the long value is valid
    expect(longValue).toEqual(NaN);
  });

  // test case for getting an array of long values where one keys does not exist
  test("can get an array of long values where one keys does not exist", () => {
    // get the array of long values where one keys does not exist
    const longValues = infofile.getLong({
      file,
      keys: ["SuspR.Kin.N", "RandomKey"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1);
    expect(longValues[1].value).toBe(NaN);
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getLong({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getLong({ file: "./SomeFakeFile.car", keys: "Aero.Ax" });
    }).toThrowError("File read error");
  });

  // test case throws an error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.getLong({ file });
    }).toThrowError("keys is required");
  });

  // test case throws an error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.getLong({ file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // test case throws an error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.getLong({ file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });
});
