const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// test setKeys
describe("setKeys", () => {
  // test setKeys can set a string key value
  test("test setKeys can set a string key value on a new file", () => {
    // create a temporary file
    const tempInfofilePath = path.join(os.tmpdir(), "canSetKeyStringOnNewFile");

    // set key value
    const setStatus = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Eng.Kind",
        value: "Flex",
        type: "string",
      },
    });

    // get key value
    const keyValue = infofile.getString({
      infofilePath: tempInfofilePath,
      key: "Eng.Kind",
    });

    // expect key value to be a string
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe("Flex");
  });
  // test setKeys can set a long key value
  test("test setKeys can set a long key value on a new file", () => {
    // create a temporary file
    const tempInfofilePath = path.join(os.tmpdir(), "canSetKeyLongOnNewFile");

    // set key value
    const setKeyStatus = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Body.mass",
        value: 1500,
        type: "long",
      },
    });

    // get key value
    const keyValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // expect key value to be a long
    expect(setKeyStatus.status).toBe(0);
    expect(keyValue).toBe(1500);
  });

  // test setKeys can set a double key value
  test("test setKeys can set a double key value on a new file", () => {
    // create a temporary file
    const tempInfofilePath = path.join(os.tmpdir(), "canSetKeyDoubleOnNewFile");

    // set key value
    const setStatus = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Body.mass",
        value: 1500.5,
        type: "double",
      },
    });

    // get key value
    const keyValue = infofile.getDouble({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // expect key value to be a double
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe(1500.5);
  });

  // test setKeys can set a text key value
  test("test setKeys can set a text key value on a new file", () => {
    // create a temporary file
    const tempInfofilePath = path.join(os.tmpdir(), "canSetKeyTextOnNewFile");

    // set key value
    infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
        type: "text",
      },
    });

    // get key value
    const keyValue = infofile.getText({
      infofilePath: tempInfofilePath,
      key: "Description",
    });

    // expect key value to be a text
    expect(keyValue.value).toEqual(["This is a", "multiline", "string"]);
  });

  // test setKeys can set a strign key value on an existing file
  test("test setKeys can set a string key value on an existing file", () => {
    const tempInfofilePath = path.join(
      os.tmpdir(),
      "canSetKeyStringOnExistingFile"
    );
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set key value
    const setKeyValue = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Eng.Kind",
        value: "Flex",
        type: "string",
      },
    });

    // get key value
    const keyValue = infofile.getString({
      infofilePath: tempInfofilePath,
      key: "Eng.Kind",
    });

    // expect key value to be a string
    expect(setKeyValue.status).toBe(0);
    expect(keyValue).toBe("Flex");
  });

  // can set a long key value on an existing file
  test("test setKeys can set a long key value on an existing file", () => {
    const tempInfofilePath = path.join(
      os.tmpdir(),
      "canSetKeyLongOnExistingFile"
    );
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set key value
    const setKeyStatus = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Body.mass",
        value: 1500,
        type: "long",
      },
    });

    // get key value
    const keyValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // expect key value to be a long
    expect(setKeyStatus.status).toBe(0);
    expect(keyValue).toBe(1500);
  });

  // can set a double key value on an existing file
  test("test setKeys can set a double key value on an existing file", () => {
    const tempInfofilePath = path.join(
      os.tmpdir(),
      "canSetKeyDoubleOnExistingFile"
    );
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set key value
    const setStatus = infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Body.mass",
        value: 1500.5,
        type: "double",
      },
    });

    // get key value
    const keyValue = infofile.getDouble({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // expect key value to be a double
    expect(setStatus.status).toBe(0);
    expect(keyValue).toBe(1500.5);
  });

  // can set a text key value on an existing file
  test("test setKeys can set a text key value on an existing file", () => {
    const tempInfofilePath = path.join(
      os.tmpdir(),
      "canSetKeyTextOnExistingFile"
    );
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set key value
    infofile.setKeys({
      infofilePath: tempInfofilePath,
      setKeyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
        type: "text",
      },
    });

    // get key value
    const keyValue = infofile.getText({
      infofilePath: tempInfofilePath,
      key: "Description",
    });

    // expect key value to be a text
    expect(keyValue.value).toEqual(["This is a", "multiline", "string"]);
  });

  // throws an error when no path is provided
  test("test setKeys throws an error when no path is provided", () => {
    expect(() => {
      infofile.setKeys({
        setKeyValues: {
          key: "Body.mass",
          value: 1500,
          type: "long",
        },
      });
    }).toThrowError("infofilePath is required");
  });

  // throws an error when no setKeyValues is not provided
  test("test setKeys throws an error when no setKeyValues is not provided", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
      });
    }).toThrowError("setKeyValues is required");
  });

  // throws error when setKeyValues is not an object
  test("test setKeys throws an error when keyValues is not an object", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
        setKeyValues: "not an object",
      });
    }).toThrowError(
      "setKeyValues is not an object with a key, value and type property"
    );
  });

  // throws error when setKeyValues is an object but doesn't have a key property
  test("test setKeys throws an error when setKeyValues is an object but doesn't have a key property", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
        setKeyValues: {
          value: "not a key",
          type: "string",
        },
      });
    }).toThrowError(
      "setKeyValues is not an object with a key, value and type property"
    );
  });

  // throws error when setKeyValues is an object but doesn't have a value property
  test("test setKeys throws an error when setKeyValues is an object but doesn't have a value property", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
        setKeyValues: {
          key: "not a value",
          type: "string",
        },
      });
    }).toThrowError(
      "setKeyValues is not an object with a key, value and type property"
    );
  });

  // throws error when setKeyValues is an object but doesn't have a type property
  test("test setKeys throws an error when setKeyValues is an object but doesn't have a type property", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
        setKeyValues: {
          key: "not a type",
          value: "not a type",
        },
      });
    }).toThrowError(
      "setKeyValues is not an object with a key, value and type property"
    );
  });

  // throws error when setKeyValues is an object but type is not a string or long or double or text
  test("test setKeys throws an error when setKeyValues is an object but type is not a string or long or double or text", () => {
    expect(() => {
      infofile.setKeys({
        infofilePath: infofilePath,
        setKeyValues: {
          key: "not a type",
          value: "not a type",
          type: "not a type",
        },
      });
    }).toThrowError("setKeyValues.type is not a string, long, double or text");
  });
});
