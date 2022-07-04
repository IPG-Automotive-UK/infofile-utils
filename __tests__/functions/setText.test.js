const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// setText tests
describe("setText tests", () => {
  // test case for setting a Text value
  test("can set a Text value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetText");

    // set the Text value
    const setStatus = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // check that the Text value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of Text values
  test("can set an array of Text values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetTextArray");

    // set the Text value
    const setValueStatus = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Description", value: ["This is a", "multiline", "string"] },
        {
          key: "Additional.Comment",
          value: ["This is another", "multiline", "string"],
        },
      ],
    });

    // check that the Text value is valid
    expect(setValueStatus[0].status).toBe(0);
    expect(setValueStatus[1].status).toBe(0);
  });

  // test case for setting a Text on a file that already exists
  test("can set a Text value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the Text value
    const setValueStatus = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // check that the Text value is valid
    expect(setValueStatus).toBe(0);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setText({
        keyValues: {
          key: "Description",
          value: ["This is a", "multiline", "string"],
        },
      });
    }).toThrowError("infofilePath is required");
  });

  // throws error when keyValues is not provided
  test("throws error when keyValues is not provided", () => {
    // expect error when keyValues is not provided
    expect(() => {
      infofile.setText({ infofilePath });
    }).toThrowError("keyValues is required");
  });

  // throws error when keyValues is not an object
  test("throws error when keyValues is not an object", () => {
    // expect error when keyValues is not an object
    expect(() => {
      infofile.setText({ infofilePath, keyValues: 1 });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a key property
  test("throws error when keyValues does not have a key property", () => {
    // expect error when keyValues does not have a key property
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: {
          keyValues: {
            value: ["This is a", "multiline", "string"],
          },
        },
      });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a value property
  test("throws error when keyValues does not have a value property", () => {
    // expect error when keyValues does not have a value property
    expect(() => {
      infofile.setText({ infofilePath, keyValues: { key: "Aero.Ax" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues is an array of objects and one of them does not have a key property
  test("throws error when keyValues is an array of objects and one of them does not have a key property", () => {
    // expect error when keyValues is an array of objects and one of them does not have a key property
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: [
          { key: "Description", value: ["This is a", "multiline", "string"] },
          { value: ["This is a", "multiline", "string"] },
        ],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );

    // expect error when keyValues is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: [
          { key: "Description", value: ["This is a", "multiline", "string"] },
          { key: "Additional.Comment" },
        ],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws an error when value is not array of strings
  test("throws error when value is not an array of strings", () => {
    // expect error when value is not array of strings
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: { key: "Aero.Ax", value: "test" },
      });
    }).toThrowError("keyValues.value is not an array of strings");
  });

  // throws an error when key values is an array but value is not an array of strings
  test("throws error when key values is an array but value is not a an array of strings", () => {
    // expect error when key values is an array but value is not an array of strings
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: "test" },
          { key: "Aero.Ax", value: "test" },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are arrays of strings"
    );
  });

  // throws an error when keyValues is an array but one of the values is not an array of strings
  test("throws error when keyValues is an array but one of the values is not an array of strings", () => {
    // expect error when keyValues is an array but one of the values is not an array of strings
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: [
          { key: "Description", value: "Flex" },
          { key: "Additonal.Comment", value: ["this", "is a multiline"] },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are arrays of strings"
    );
  });

  // throws an error when keyValues is an array but one of the values is an array of numbers
  test("throws error when keyValues is an array but one of the values is an array of numbers", () => {
    // expect error when keyValues is an array but one of the values is an array of numbers
    expect(() => {
      infofile.setText({
        infofilePath,
        keyValues: [
          { key: "Description", value: ["This is a", "multiline", "string"] },
          { key: "Additional.Comment", value: [1, 2, 3] },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are arrays of strings"
    );
  });
});
