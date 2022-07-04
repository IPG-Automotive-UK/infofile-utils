const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// setString tests
describe("setString tests", () => {
  // test case for setting a string value
  test("can set a string value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetString");

    // set the string value
    const setValueStatus = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setValueStatus).toBe(0);
  });

  // test can set an array of string values
  test("can set an array of string values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringArray");

    // set the string value
    const setValue = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Eng.Kind", value: "Flex" },
        { key: "VehicleModel.Kind", value: "FlexBody" },
      ],
    });

    // check that the string value is valid
    expect(setValue[0].status).toBe(0);
    expect(setValue[1].status).toBe(0);
  });

  // test case for setting a string on a file that already exists
  test("can set a string value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the string value
    const setStatus = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setStatus).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setString({ keyValues: { key: "Aero.Ax", value: "Flex" } });
    }).toThrowError("infofilePath is required");
  });

  // throws error when keyValues is not provided
  test("throws error when keyValues is not provided", () => {
    // expect error when keyValues is not provided
    expect(() => {
      infofile.setString({ infofilePath });
    }).toThrowError("keyValues is required");
  });

  // throws error when keyValues is not an object
  test("throws error when keyValues is not an object", () => {
    // expect error when keyValues is not an object
    expect(() => {
      infofile.setString({ infofilePath, keyValues: 1 });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a key property
  test("throws error when keyValues does not have a key property", () => {
    // expect error when keyValues does not have a key property
    expect(() => {
      infofile.setString({ infofilePath, keyValues: { value: "Flex" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a value property
  test("throws error when keyValues does not have a value property", () => {
    // expect error when keyValues does not have a value property
    expect(() => {
      infofile.setString({ infofilePath, keyValues: { key: "Aero.Ax" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues is an array of objects and one of them does not have a key property
  test("throws error when keyValues is an array of objects and one of them does not have a key property", () => {
    // expect error when keyValues is an array of objects and one of them does not have a key property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { value: "Flex" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );

    // expect error when keyValues is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws error when keyValues is an array of objects and one of them does not have a value property
  test("throws error when keyValues is an array of objects and one of them does not have a value property", () => {
    // expect error when keyValues is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws an error when value is not a string
  test("throws error when value is not a string", () => {
    // expect error when value is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: { key: "Aero.Ax", value: 1 },
      });
    }).toThrowError("keyValues.value is not a string");
  });

  // throws an error when key values is an array but value is not a string
  test("throws error when key values is an array but value is not a string", () => {
    // expect error when key values is an array but value is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: 1 },
          { key: "Aero.Ax", value: 5 },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are strings"
    );
  });

  // throws an error when keyValues is an array but one of the values is not a string
  test("throws error when keyValues is an array but one of the values is not a string", () => {
    // expect error when keyValues is an array but one of the values is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: "Flex" },
          { key: "Aero.Ax", value: 1 },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are strings"
    );
  });
});
