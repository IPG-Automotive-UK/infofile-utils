const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// setLong tests
describe("setLong tests", () => {
  // test case for setting a long value
  test("can set a long value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of long values
  test("can set an array of long values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongArray");

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Body.mass", value: 1002 },
        { key: "PowerTrain.OSRate", value: 2000 },
      ],
    });

    // check that the long value is valid
    expect(setStatus[0].status).toBe(0);
    expect(setStatus[1].status).toBe(0);
  });

  // test case for setting a long on a file that already exists
  test("can set a long value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 1990 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test case for setting a double when using setLong to a new infofile, expect a long value to be set
  test("honours setLong even when trying to set double", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100.5 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setLong({ keyValues: { key: "Body.mass", value: 100 } });
    }).toThrowError("infofilePath is required");
  });

  // throws error when no keyValues is provided
  test("throws error when no keyValues is provided", () => {
    // expect error when no keyValues is provided
    expect(() => {
      infofile.setLong({ infofilePath });
    }).toThrowError("keyValues is required");
  });

  // throws error when keyValues is not an object
  test("throws error when keyValues is not an object", () => {
    // expect error when keyValues is not an object
    expect(() => {
      infofile.setLong({ infofilePath, keyValues: "Aero.Ax" });
    }).toThrowError("keyValues is not an object");
  });

  // throws error when keyValues does not have a key property
  test("throws error when keyValues does not have a key property", () => {
    // expect error when keyValues does not have a key property
    expect(() => {
      infofile.setLong({ infofilePath, keyValues: { value: 100 } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a value property
  test("throws error when keyValues does not have a value property", () => {
    // expect error when keyValues does not have a value property
    expect(() => {
      infofile.setLong({ infofilePath, keyValues: { key: "Aero.Ax" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues is an array and one of them does not have a key property
  test("throws error when keyValues is an array and one of them does not have a key property", () => {
    // expect error when keyValues is an array and one of them does not have a key property
    expect(() => {
      infofile.setLong({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { value: 100 }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws error when keyValues is an array and one of them does not have a value property
  test("throws error when keyValues is an array and one of them does not have a value property", () => {
    // expect error when keyValues is an array and one of them does not have a value property
    expect(() => {
      infofile.setLong({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws an error when value is not a number
  test("throws an error when value is not a number", () => {
    // expect error when value is not a number
    expect(() => {
      infofile.setLong({
        infofilePath,
        keyValues: { key: "Aero.Ax", value: "Flex" },
      });
    }).toThrowError("value is not a number");
  });

  // throws an error when keyValues is an array but values are not numbers
  test("throws an error when keyValues is an array but values are not numbers", () => {
    // expect error when keyValues is an array but values are not numbers
    expect(() => {
      infofile.setLong({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: "Flex" },
          { key: "Aero.Ax", value: "Flex" },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are numbers"
    );
  });

  // throws an error when keyValues is an array but values are all numbers
  test("throws an error when keyValues is an array but values are all numbers", () => {
    // expect error when keyValues is an array but values are all numbers
    expect(() => {
      infofile.setLong({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: 100 },
          { key: "Aero.Ax", value: "a string" },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are numbers"
    );
  });
});
