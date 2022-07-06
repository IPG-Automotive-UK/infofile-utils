const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// setDouble tests
describe("setDouble", () => {
  // test can set a double value to a new infofile
  test("can set a double value to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetDouble");

    // set the double value
    const setStatus = infofile.setDouble({
      file: tempfile,
      values: { keys: "PowerTrain.Engine.I", value: 0.09 },
    });

    // check that the double value is valid
    expect(setStatus).toBe(0);
  });

  // test can set a double value to an existing infofile
  test("can set a double value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempfile = path.join(os.tmpdir(), "canSetDoubleOnExisting");
    fs.copyFileSync(file, tempfile);

    // set the double value
    const setStatus = infofile.setDouble({
      file: tempfile,
      values: { keys: "PowerTrain.Engine.I", value: 0.06 },
    });

    // check that the double value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of double values to a new infofile
  test("can set an array of double values to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetDoubleArray");

    // set the double value
    const setStatus = infofile.setDouble({
      file: tempfile,
      values: [
        { keys: "PowerTrain.Engine.I", value: 0.09 },
        { keys: "SuspF.Buf_Pull.tz0", value: -0.08 },
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
      infofile.setDouble({ values: { keys: "Body.mass", value: 100.5 } });
    }).toThrowError("file is required");
  });

  // throws error when no values is provided
  test("throws error when no values is provided", () => {
    // expect error when no values is provided
    expect(() => {
      infofile.setDouble({ file });
    }).toThrowError("values is required");
  });

  // throws error when values is not an object
  test("throws error when values is not an object", () => {
    // expect error when values is not an object
    expect(() => {
      infofile.setDouble({ file, values: "Aero.Ax" });
    }).toThrowError("values is not an object");
  });

  // throws error when values does not have a keys property
  test("throws error when values does not have a keys property", () => {
    // expect error when values does not have a keys property
    expect(() => {
      infofile.setDouble({ file, values: { value: 100.5 } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a value property
  test("throws error when values does not have a value property", () => {
    // expect error when values does not have a value property
    expect(() => {
      infofile.setDouble({ file, values: { keys: "Aero.Ax" } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an array and one of them does not have a keys property
  test("throws error when values is an array and one of them does not have a keys property", () => {
    // expect error when values is an array and one of them does not have a keys property
    expect(() => {
      infofile.setDouble({
        file,
        values: [{ keys: "Aero.Ax", value: 100.5 }, { value: 100.5 }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws error when values is an array and one of them does not have a value property
  test("throws error when values is an array and one of them does not have a value property", () => {
    // expect error when values is an array and one of them does not have a value property
    expect(() => {
      infofile.setDouble({
        file,
        values: [{ keys: "Aero.Ax", value: 100.5 }, { keys: "Aero.Ax" }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws an error when value is not a number
  test("throws an error when value is not a number", () => {
    // expect error when value is not a number
    expect(() => {
      infofile.setDouble({
        file,
        values: { keys: "Aero.Ax", value: "100.5" },
      });
    }).toThrowError("value is not a number");
  });

  // throws an error values is an array but values are not numbers
  test("throws an error when values are not numbers", () => {
    // expect error when values are not numbers
    expect(() => {
      infofile.setDouble({
        file,
        values: [
          { keys: "Aero.Ax", value: "100.5" },
          { keys: "Aero.Ax", value: "100.5" },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are numbers"
    );
  });

  // throws an error when values is an array but not all values are numbers
  test("throws an error when values are not numbers", () => {
    // expect error when values are not numbers
    expect(() => {
      infofile.setDouble({
        file,
        values: [
          { keys: "Aero.Ax", value: 100.5 },
          { keys: "Aero.Ax", value: "100.5" },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are numbers"
    );
  });
});
