const infofile = require("../index");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// test setValue
describe("setValue", () => {
  // test setValue can set a string keys value
  test("test setValue can set a string keys value on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), "canSetKeyStringOnNewFile");

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Eng.Kind",
        value: "Flex",
        type: "string",
      },
    });

    // get keys value
    const keyValue = infofile.getString({
      file: tempfile,
      keys: "Eng.Kind",
    });

    // expect keys value to be a string
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe("Flex");

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });
  // test setValue can set a long keys value
  test("test setValue can set a long keys value on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), "canSetKeyLongOnNewFile");

    // set keys value
    const setKeyStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500,
        type: "long",
      },
    });

    // get keys value
    const keyValue = infofile.getLong({
      file: tempfile,
      keys: "Body.mass",
    });

    // expect keys value to be a long
    expect(setKeyStatus.status).toBe(0);
    expect(keyValue).toBe(1500);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test setValue can set a double keys value
  test("test setValue can set a double keys value on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), "canSetKeyDoubleOnNewFile");

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500.5,
        type: "double",
      },
    });

    // get keys value
    const keyValue = infofile.getDouble({
      file: tempfile,
      keys: "Body.mass",
    });

    // expect keys value to be a double
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe(1500.5);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test setValue can set a text keys value
  test("test setValue can set a text keys value on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), "canSetKeyTextOnNewFile");

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
        type: "text",
      },
    });

    // get keys value
    const keyValue = infofile.getText({
      file: tempfile,
      keys: "Description",
    });

    // expect keys value to be a text
    expect(keyValue.value).toEqual(["This is a", "multiline", "string"]);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test setValue can set a strign keys value on an existing file
  test("test setValue can set a string keys value on an existing file", () => {
    const tempfile = path.join(os.tmpdir(), "canSetKeyStringOnExistingFile");
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setKeyValue = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Eng.Kind",
        value: "Flex",
        type: "string",
      },
    });

    // get keys value
    const keyValue = infofile.getString({
      file: tempfile,
      keys: "Eng.Kind",
    });

    // expect keys value to be a string
    expect(setKeyValue.status).toBe(0);
    expect(keyValue).toBe("Flex");

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // can set a long keys value on an existing file
  test("test setValue can set a long keys value on an existing file", () => {
    const tempfile = path.join(os.tmpdir(), "canSetKeyLongOnExistingFile");
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setKeyStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500,
        type: "long",
      },
    });

    // get keys value
    const keyValue = infofile.getLong({
      file: tempfile,
      keys: "Body.mass",
    });

    // expect keys value to be a long
    expect(setKeyStatus.status).toBe(0);
    expect(keyValue).toBe(1500);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // can set a double keys value on an existing file
  test("test setValue can set a double keys value on an existing file", () => {
    const tempfile = path.join(os.tmpdir(), "canSetKeyDoubleOnExistingFile");
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500.5,
        type: "double",
      },
    });

    // get keys value
    const keyValue = infofile.getDouble({
      file: tempfile,
      keys: "Body.mass",
    });

    // expect keys value to be a double
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe(1500.5);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // can set a text keys value on an existing file
  test("test setValue can set a text keys value on an existing file", () => {
    const tempfile = path.join(os.tmpdir(), "canSetKeyTextOnExistingFile");
    fs.copyFileSync(file, tempfile);

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
        type: "text",
      },
    });

    // get keys value
    const keyValue = infofile.getText({
      file: tempfile,
      keys: "Description",
    });

    // expect keys value to be a text
    expect(keyValue.value).toEqual(["This is a", "multiline", "string"]);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // throws an error when no path is provided
  test("test setValue throws an error when no path is provided", () => {
    expect(() => {
      infofile.setValue({
        values: {
          keys: "Body.mass",
          value: 1500,
          type: "long",
        },
      });
    }).toThrowError("file is required");
  });

  // throws an error when no values is not provided
  test("test setValue throws an error when no values is not provided", () => {
    expect(() => {
      infofile.setValue({
        file: file,
      });
    }).toThrowError("values is required");
  });

  // throws error when values is not an object
  test("test setValue throws an error when values is not an object", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: "not an object",
      });
    }).toThrowError(
      "values is not an object with a keys, value and type property"
    );
  });

  // throws error when values is an object but doesn't have a keys property
  test("test setValue throws an error when values is an object but doesn't have a keys property", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          value: "not a keys",
          type: "string",
        },
      });
    }).toThrowError(
      "values is not an object with a keys, value and type property"
    );
  });

  // throws error when values is an object but doesn't have a value property
  test("test setValue throws an error when values is an object but doesn't have a value property", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          keys: "not a value",
          type: "string",
        },
      });
    }).toThrowError(
      "values is not an object with a keys, value and type property"
    );
  });

  // throws error when values is an object but doesn't have a type property
  test("test setValue throws an error when values is an object but doesn't have a type property", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          keys: "not a type",
          value: "not a type",
        },
      });
    }).toThrowError(
      "values is not an object with a keys, value and type property"
    );
  });

  // throws error when values is an object but type is not a string or long or double or text
  test("test setValue throws an error when values is an object but type is not a string or long or double or text", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          keys: "not a type",
          value: "not a type",
          type: "not a type",
        },
      });
    }).toThrowError("values.type is not a string, long, double or text");
  });

  // test writing to two separate files
  test("can write to two separate files", () => {
    // create two temp files
    const tempfile1 = path.join(os.tmpdir(), "tempfile1");
    const tempfile2 = path.join(os.tmpdir(), "tempfile2");

    // set key value
    const setStatus1 = infofile.setDouble({
      file: tempfile1,
      values: {
        keys: "Test.Key",
        value: 1,
      },
    });
    const setStatus2 = infofile.setDouble({
      file: tempfile2,
      values: {
        keys: "Test.Key",
        value: 2,
      },
    });

    // get keys value
    const keyValue2 = infofile.getDouble({
      file: tempfile2,
      keys: "Test.Key",
    });
    const keyValue1 = infofile.getDouble({
      file: tempfile1,
      keys: "Test.Key",
    });

    // expect keys value to be a double
    expect(setStatus1).toBe(0);
    expect(keyValue1).toBe(1);
    expect(setStatus2).toBe(0);
    expect(keyValue2).toBe(2);

    // delete the temporary infofile
    fs.unlinkSync(tempfile1);
    fs.unlinkSync(tempfile2);
  });
});
