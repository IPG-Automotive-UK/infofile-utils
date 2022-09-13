const infofile = require("../index");
const path = require("path");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// get double tests
describe("getDouble tests", () => {
  // test case for getting a double value
  test("can get a double value", () => {
    // get the double value
    const doubleValue = infofile.getDouble({
      file: file,
      keys: "WheelCarrier.fl.mass",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(18);
  });

  // test case for getting an array of double values
  test("can get an array of double values", () => {
    // get the array of double values
    const doubleValues = infofile.getDouble({
      file: file,
      keys: ["WheelCarrier.fl.mass", "SuspF.Spring.l0"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(18);
    expect(doubleValues[1].value).toEqual(0.3541);
  });

  // test case for getting a double value for a keys that does not exist
  test("can get a double value for a keys that does not exist", () => {
    // get the double value for a keys that does not exist
    const doubleValue = infofile.getDouble({
      file: file,
      keys: "RandomKey",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(NaN);
  });

  // test case for getting an array of double values where one keys does not exist
  test("can get an array of double values where one keys does not exist", () => {
    // get the array of double values where one keys does not exist
    const doubleValues = infofile.getDouble({
      file: file,
      keys: ["SuspF.Spring.l0", "RandomKey"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(0.3541);
    expect(doubleValues[1].value).toEqual(NaN);
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getDouble({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });
  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getDouble({
        file: "./SomeFakeFile.car",
        keys: "Aero.Ax",
      });
    }).toThrowError("File read error");
  });
  // test case throws an error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.getDouble({ file: file });
    }).toThrowError("keys is required");
  });

  // test case throws an error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.getDouble({ file: file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // test case throws an error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.getDouble({ file: file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });
  // test case for getting a double value when the value is a nValue
  test("can get a double value", () => {
    // get the double value
    const doubleValue = infofile.getDouble({
      file: file,
      keys: "SuspR.Stabi.Amplify",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(10);
  });
});
