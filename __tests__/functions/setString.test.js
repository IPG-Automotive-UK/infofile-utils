const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// setString tests
describe("setString tests", () => {
  // test case for setting a string value
  test("can set a string value to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetString");

    // set the string value
    const setValueStatus = infofile.setString({
      file: tempfile,
      values: { keys: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setValueStatus).toBe(0);
  });

  // test can set an array of string values
  test("can set an array of string values to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetStringArray");

    // set the string value
    const setValue = infofile.setString({
      file: tempfile,
      values: [
        { keys: "Eng.Kind", value: "Flex" },
        { keys: "VehicleModel.Kind", value: "FlexBody" },
      ],
    });

    // check that the string value is valid
    expect(setValue[0].status).toBe(0);
    expect(setValue[1].status).toBe(0);
  });

  // test case for setting a string on a file that already exists
  test("can set a string value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempfile = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(file, tempfile);

    // set the string value
    const setStatus = infofile.setString({
      file: tempfile,
      values: { keys: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setStatus).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setString({ values: { keys: "Aero.Ax", value: "Flex" } });
    }).toThrowError("file is required");
  });

  // throws error when values is not provided
  test("throws error when values is not provided", () => {
    // expect error when values is not provided
    expect(() => {
      infofile.setString({ file });
    }).toThrowError("values is required");
  });

  // throws error when values is not an object
  test("throws error when values is not an object", () => {
    // expect error when values is not an object
    expect(() => {
      infofile.setString({ file, values: 1 });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a keys property
  test("throws error when values does not have a keys property", () => {
    // expect error when values does not have a keys property
    expect(() => {
      infofile.setString({ file, values: { value: "Flex" } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a value property
  test("throws error when values does not have a value property", () => {
    // expect error when values does not have a value property
    expect(() => {
      infofile.setString({ file, values: { keys: "Aero.Ax" } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an array of objects and one of them does not have a keys property
  test("throws error when values is an array of objects and one of them does not have a keys property", () => {
    // expect error when values is an array of objects and one of them does not have a keys property
    expect(() => {
      infofile.setString({
        file,
        values: [{ keys: "Aero.Ax", value: "Flex" }, { value: "Flex" }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );

    // expect error when values is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        file,
        values: [{ keys: "Aero.Ax", value: "Flex" }, { keys: "Aero.Ax" }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws error when values is an array of objects and one of them does not have a value property
  test("throws error when values is an array of objects and one of them does not have a value property", () => {
    // expect error when values is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        file,
        values: [{ keys: "Aero.Ax", value: "Flex" }, { keys: "Aero.Ax" }],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws an error when value is not a string
  test("throws error when value is not a string", () => {
    // expect error when value is not a string
    expect(() => {
      infofile.setString({
        file,
        values: { keys: "Aero.Ax", value: 1 },
      });
    }).toThrowError("values.value is not a string");
  });

  // throws an error when keys values is an array but value is not a string
  test("throws error when keys values is an array but value is not a string", () => {
    // expect error when keys values is an array but value is not a string
    expect(() => {
      infofile.setString({
        file,
        values: [
          { keys: "Aero.Ax", value: 1 },
          { keys: "Aero.Ax", value: 5 },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are strings"
    );
  });

  // throws an error when values is an array but one of the values is not a string
  test("throws error when values is an array but one of the values is not a string", () => {
    // expect error when values is an array but one of the values is not a string
    expect(() => {
      infofile.setString({
        file,
        values: [
          { keys: "Aero.Ax", value: "Flex" },
          { keys: "Aero.Ax", value: 1 },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are strings"
    );
  });
});
