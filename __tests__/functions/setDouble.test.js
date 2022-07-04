const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// setDouble tests
describe("setDouble", () => {
  // test can set a double value to a new infofile
  test("can set a double value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDouble");

    // set the double value
    const setStatus = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: { key: "PowerTrain.Engine.I", value: 0.09 },
    });

    // check that the double value is valid
    expect(setStatus).toBe(0);
  });

  // test can set a double value to an existing infofile
  test("can set a double value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDoubleOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the double value
    const setStatus = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: { key: "PowerTrain.Engine.I", value: 0.06 },
    });

    // check that the double value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of double values to a new infofile
  test("can set an array of double values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDoubleArray");

    // set the double value
    const setStatus = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "PowerTrain.Engine.I", value: 0.09 },
        { key: "SuspF.Buf_Pull.tz0", value: -0.08 },
      ],
    });

    // check that the double value is valid
    expect(setStatus[0].status).toBe(0);
    expect(setStatus[1].status).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setDouble({ keyValues: { key: "Body.mass", value: 100.5 } });
    }).toThrowError("infofilePath is required");
  });

  // throws error when no keyValues is provided
  test("throws error when no keyValues is provided", () => {
    // expect error when no keyValues is provided
    expect(() => {
      infofile.setDouble({ infofilePath });
    }).toThrowError("keyValues is required");
  });

  // throws error when keyValues is not an object
  test("throws error when keyValues is not an object", () => {
    // expect error when keyValues is not an object
    expect(() => {
      infofile.setDouble({ infofilePath, keyValues: "Aero.Ax" });
    }).toThrowError("keyValues is not an object");
  });

  // throws error when keyValues does not have a key property
  test("throws error when keyValues does not have a key property", () => {
    // expect error when keyValues does not have a key property
    expect(() => {
      infofile.setDouble({ infofilePath, keyValues: { value: 100.5 } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a value property
  test("throws error when keyValues does not have a value property", () => {
    // expect error when keyValues does not have a value property
    expect(() => {
      infofile.setDouble({ infofilePath, keyValues: { key: "Aero.Ax" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues is an array and one of them does not have a key property
  test("throws error when keyValues is an array and one of them does not have a key property", () => {
    // expect error when keyValues is an array and one of them does not have a key property
    expect(() => {
      infofile.setDouble({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: 100.5 }, { value: 100.5 }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws error when keyValues is an array and one of them does not have a value property
  test("throws error when keyValues is an array and one of them does not have a value property", () => {
    // expect error when keyValues is an array and one of them does not have a value property
    expect(() => {
      infofile.setDouble({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: 100.5 }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws an error when value is not a number
  test("throws an error when value is not a number", () => {
    // expect error when value is not a number
    expect(() => {
      infofile.setDouble({
        infofilePath,
        keyValues: { key: "Aero.Ax", value: "100.5" },
      });
    }).toThrowError("value is not a number");
  });

  // throws an error keyValues is an array but values are not numbers
  test("throws an error when values are not numbers", () => {
    // expect error when values are not numbers
    expect(() => {
      infofile.setDouble({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: "100.5" },
          { key: "Aero.Ax", value: "100.5" },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are numbers"
    );
  });

  // throws an error when keyValues is an array but not all values are numbers
  test("throws an error when values are not numbers", () => {
    // expect error when values are not numbers
    expect(() => {
      infofile.setDouble({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: 100.5 },
          { key: "Aero.Ax", value: "100.5" },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are numbers"
    );
  });
});
