const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// setLong tests
describe("setLong tests", () => {
  // test case for setting a long value
  test("can set a long value to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setStatus = infofile.setLong({
      file: tempfile,
      values: { keys: "Body.mass", value: 100 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of long values
  test("can set an array of long values to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetLongArray");

    // set the long value
    const setStatus = infofile.setLong({
      file: tempfile,
      values: [
        { keys: "Body.mass", value: 1002 },
        { keys: "PowerTrain.OSRate", value: 2000 },
      ],
    });

    // check that the long value is valid
    expect(setStatus[0].status).toBe(0);
    expect(setStatus[1].status).toBe(0);
  });

  // test case for setting a long on a file that already exists
  test("can set a long value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempfile = path.join(os.tmpdir(), "canSetLongOnExisting");
    fs.copyFileSync(file, tempfile);

    // set the long value
    const setStatus = infofile.setLong({
      file: tempfile,
      values: { keys: "Body.mass", value: 1990 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test case for setting a double when using setLong to a new infofile, expect a long value to be set
  test("honours setLong even when trying to set double", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setStatus = infofile.setLong({
      file: tempfile,
      values: { keys: "Body.mass", value: 100.5 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setLong({ values: { keys: "Body.mass", value: 100 } });
    }).toThrowError("file is required");
  });

  // throws error when no values is provided
  test("throws error when no values is provided", () => {
    // expect error when no values is provided
    expect(() => {
      infofile.setLong({ file });
    }).toThrowError("values is required");
  });

  // throws error when values is not an object
  test("throws error when values is not an object", () => {
    // expect error when values is not an object
    expect(() => {
      infofile.setLong({ file, values: "Aero.Ax" });
    }).toThrowError("values is not an object");
  });

  // throws error when values does not have a keys property
  test("throws error when values does not have a keys property", () => {
    // expect error when values does not have a keys property
    expect(() => {
      infofile.setLong({ file, values: { value: 100 } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a value property
  test("throws error when values does not have a value property", () => {
    // expect error when values does not have a value property
    expect(() => {
      infofile.setLong({ file, values: { keys: "Aero.Ax" } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an array and one of them does not have a keys property
  test("throws error when values is an array and one of them does not have a keys property", () => {
    // expect error when values is an array and one of them does not have a keys property
    expect(() => {
      infofile.setLong({
        file,
        values: [{ keys: "Aero.Ax", value: "Flex" }, { value: 100 }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws error when values is an array and one of them does not have a value property
  test("throws error when values is an array and one of them does not have a value property", () => {
    // expect error when values is an array and one of them does not have a value property
    expect(() => {
      infofile.setLong({
        file,
        values: [{ keys: "Aero.Ax", value: "Flex" }, { keys: "Aero.Ax" }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws an error when value is not a number
  test("throws an error when value is not a number", () => {
    // expect error when value is not a number
    expect(() => {
      infofile.setLong({
        file,
        values: { keys: "Aero.Ax", value: "Flex" },
      });
    }).toThrowError("value is not a number");
  });

  // throws an error when values is an array but values are not numbers
  test("throws an error when values is an array but values are not numbers", () => {
    // expect error when values is an array but values are not numbers
    expect(() => {
      infofile.setLong({
        file,
        values: [
          { keys: "Aero.Ax", value: "Flex" },
          { keys: "Aero.Ax", value: "Flex" },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are numbers"
    );
  });

  // throws an error when values is an array but values are all numbers
  test("throws an error when values is an array but values are all numbers", () => {
    // expect error when values is an array but values are all numbers
    expect(() => {
      infofile.setLong({
        file,
        values: [
          { keys: "Aero.Ax", value: 100 },
          { keys: "Aero.Ax", value: "a string" },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are numbers"
    );
  });
});
