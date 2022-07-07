const infofile = require("../index");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// setText tests
describe("setText tests", () => {
  // test case for setting a Text value
  test("can set a Text value to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetText");

    // set the Text value
    const setStatus = infofile.setText({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // check that the Text value is valid
    expect(setStatus).toBe(0);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test can set an array of Text values
  test("can set an array of Text values to a new infofile", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canSetTextArray");

    // set the Text value
    const setValueStatus = infofile.setText({
      file: tempfile,
      values: [
        { keys: "Description", value: ["This is a", "multiline", "string"] },
        {
          keys: "Additional.Comment",
          value: ["This is another", "multiline", "string"],
        },
      ],
    });

    // check that the Text value is valid
    expect(setValueStatus[0].status).toBe(0);
    expect(setValueStatus[1].status).toBe(0);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test case for setting a Text on a file that already exists
  test("can set a Text value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempfile = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(file, tempfile);

    // set the Text value
    const setValueStatus = infofile.setText({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // check that the Text value is valid
    expect(setValueStatus).toBe(0);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setText({
        values: {
          keys: "Description",
          value: ["This is a", "multiline", "string"],
        },
      });
    }).toThrowError("file is required");
  });

  // throws error when values is not provided
  test("throws error when values is not provided", () => {
    // expect error when values is not provided
    expect(() => {
      infofile.setText({ file });
    }).toThrowError("values is required");
  });

  // throws error when values is not an object
  test("throws error when values is not an object", () => {
    // expect error when values is not an object
    expect(() => {
      infofile.setText({ file, values: 1 });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a keys property
  test("throws error when values does not have a keys property", () => {
    // expect error when values does not have a keys property
    expect(() => {
      infofile.setText({
        file,
        values: {
          values: {
            value: ["This is a", "multiline", "string"],
          },
        },
      });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values does not have a value property
  test("throws error when values does not have a value property", () => {
    // expect error when values does not have a value property
    expect(() => {
      infofile.setText({ file, values: { keys: "Aero.Ax" } });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an array of objects and one of them does not have a keys property
  test("throws error when values is an array of objects and one of them does not have a keys property", () => {
    // expect error when values is an array of objects and one of them does not have a keys property
    expect(() => {
      infofile.setText({
        file,
        values: [
          { keys: "Description", value: ["This is a", "multiline", "string"] },
          { value: ["This is a", "multiline", "string"] },
        ],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );

    // expect error when values is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setText({
        file,
        values: [
          { keys: "Description", value: ["This is a", "multiline", "string"] },
          { keys: "Additional.Comment" },
        ],
      });
    }).toThrowError(
      "values is an array, but not an array of objects with a keys and value property"
    );
  });

  // throws an error when value is not array of strings
  test("throws error when value is not an array of strings", () => {
    // expect error when value is not array of strings
    expect(() => {
      infofile.setText({
        file,
        values: { keys: "Aero.Ax", value: "test" },
      });
    }).toThrowError("values.value is not an array of strings");
  });

  // throws an error when keys values is an array but value is not an array of strings
  test("throws error when keys values is an array but value is not a an array of strings", () => {
    // expect error when keys values is an array but value is not an array of strings
    expect(() => {
      infofile.setText({
        file,
        values: [
          { keys: "Aero.Ax", value: "test" },
          { keys: "Aero.Ax", value: "test" },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are arrays of strings"
    );
  });

  // throws an error when values is an array but one of the values is not an array of strings
  test("throws error when values is an array but one of the values is not an array of strings", () => {
    // expect error when values is an array but one of the values is not an array of strings
    expect(() => {
      infofile.setText({
        file,
        values: [
          { keys: "Description", value: "Flex" },
          { keys: "Additonal.Comment", value: ["this", "is a multiline"] },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are arrays of strings"
    );
  });

  // throws an error when values is an array but one of the values is an array of numbers
  test("throws error when values is an array but one of the values is an array of numbers", () => {
    // expect error when values is an array but one of the values is an array of numbers
    expect(() => {
      infofile.setText({
        file,
        values: [
          { keys: "Description", value: ["This is a", "multiline", "string"] },
          { keys: "Additional.Comment", value: [1, 2, 3] },
        ],
      });
    }).toThrowError(
      "values is an array of objects, each object has a keys and value property, but not all values are arrays of strings"
    );
  });
});
