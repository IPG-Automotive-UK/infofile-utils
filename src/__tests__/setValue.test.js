const infofile = require("../index");
const path = require("path");
const os = require("os");
const fs = require("fs");
const uuid = require("uuid");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// test setValue
describe("setValue", () => {
  // test setValue can set a string keys value
  test("test setValue can set a string keys value on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Eng.Kind",
        value: "Flex",
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    const setKeyStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500,
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500.5,
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
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

  // can set a numerical vector on a new file
  test("test setValue can set a numerical vector on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Jack.fl.pos",
        value: [0, 0, 0],
      },
    });

    // get keys value
    const keyValue = infofile.getString({
      file: tempfile,
      keys: "Jack.fl.pos",
    });

    // get value value
    const getValueValue = infofile.getValue({
      file: tempfile,
      keys: "Jack.fl.pos",
    });

    // expect keys to return as expected
    expect(keyValue).toBe("0 0 0");
    expect(getValueValue.value).toEqual([0, 0, 0]);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // can set a numerical array on a new file
  test("test setValue can set a numerical array on a new file", () => {
    // create a temporary file
    const tempfile = path.join(os.tmpdir(), uuid.v4());

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Aero.Coeff",
        value: [
          [-180, -1.4, 1.0, 1.1, 1.0, -1.01, 1.0],
          [-120, -1.2, -2.4, 1.7, -1.2, -1.021, 1.06],
          [-90, 1.0, -2.7, 1.9, -1.2, 1.0, 0.0],
          [-45, 1.3, -2.2, 1.6, -1.16, 1.025, -0.1],
          [0, 1.2, 0.0, 1.1, 1.0, -1.03, 1.0],
          [45, 1.3, 1.2, 1.6, 1.16, 1.025, 1.1],
          [90, 1.0, 1.7, 1.9, 1.2, 1.0, 1.0],
          [120, -1.2, 1.4, 1.7, 1.2, -1.021, -1.06],
          [180, -1.4, 0.0, 1.1, 1.0, -1.01, 1.0],
        ],
      },
    });

    // get keys value
    const keyValue = infofile.getText({
      file: tempfile,
      keys: "Aero.Coeff",
    });

    // get value value
    const getValueValue = infofile.getValue({
      file: tempfile,
      keys: "Aero.Coeff",
    });

    // expect keys to return as expected
    expect(keyValue.value).toEqual([
      "-180 -1.4 1 1.1 1 -1.01 1",
      "-120 -1.2 -2.4 1.7 -1.2 -1.021 1.06",
      "-90 1 -2.7 1.9 -1.2 1 0",
      "-45 1.3 -2.2 1.6 -1.16 1.025 -0.1",
      "0 1.2 0 1.1 1 -1.03 1",
      "45 1.3 1.2 1.6 1.16 1.025 1.1",
      "90 1 1.7 1.9 1.2 1 1",
      "120 -1.2 1.4 1.7 1.2 -1.021 -1.06",
      "180 -1.4 0 1.1 1 -1.01 1",
    ]);
    expect(getValueValue.value).toEqual([
      [-180, -1.4, 1.0, 1.1, 1.0, -1.01, 1.0],
      [-120, -1.2, -2.4, 1.7, -1.2, -1.021, 1.06],
      [-90, 1.0, -2.7, 1.9, -1.2, 1.0, 0.0],
      [-45, 1.3, -2.2, 1.6, -1.16, 1.025, -0.1],
      [0, 1.2, 0.0, 1.1, 1.0, -1.03, 1.0],
      [45, 1.3, 1.2, 1.6, 1.16, 1.025, 1.1],
      [90, 1.0, 1.7, 1.9, 1.2, 1.0, 1.0],
      [120, -1.2, 1.4, 1.7, 1.2, -1.021, -1.06],
      [180, -1.4, 0.0, 1.1, 1.0, -1.01, 1.0],
    ]);

    // delete the temporary infofile
    fs.unlinkSync(tempfile);
  });

  // test setValue can set a strign keys value on an existing file
  test("test setValue can set a string keys value on an existing file", () => {
    const tempfile = path.join(os.tmpdir(), uuid.v4());
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setKeyValue = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Eng.Kind",
        value: "Flex",
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setKeyStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500,
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());
    fs.copyFileSync(file, tempfile);

    // set keys value
    const setStatus = infofile.setValue({
      file: tempfile,
      values: {
        keys: "Body.mass",
        value: 1500.5,
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
    const tempfile = path.join(os.tmpdir(), uuid.v4());
    fs.copyFileSync(file, tempfile);

    // set keys value
    infofile.setValue({
      file: tempfile,
      values: {
        keys: "Description",
        value: ["This is a", "multiline", "string"],
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
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an object but doesn't have a keys property
  test("test setValue throws an error when values is an object but doesn't have a keys property", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          value: "not a keys",
        },
      });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // throws error when values is an object but doesn't have a value property
  test("test setValue throws an error when values is an object but doesn't have a value property", () => {
    expect(() => {
      infofile.setValue({
        file: file,
        values: {
          keys: "not a value",
        },
      });
    }).toThrowError("values is not an object with a keys and value property");
  });

  // test writing to two separate files
  test("can write to two separate files", () => {
    // create two temp files
    const tempfile1 = path.join(os.tmpdir(), uuid.v4());
    const tempfile2 = path.join(os.tmpdir(), uuid.v4());

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

  // can get all keys, get all key values and set all key values from an existing file to a new file
  test("can get all keys, get all key values and set all key values from an existing file to a new file", () => {
    // copy existing file to a temp file
    const tempfileExisting = path.join(os.tmpdir(), uuid.v4());
    fs.copyFileSync(file, tempfileExisting);

    // create a temp file
    const tempfileNew = path.join(os.tmpdir(), uuid.v4());

    // read all the keys from the existing file
    const keys = infofile.getKey({
      file: tempfileExisting,
    });

    // get all the key values from the existing file
    const keyValues = infofile.getValue({
      file: tempfileExisting,
      keys: keys,
    });

    // set all the key values from the existing file to the new file
    infofile.setValue({
      file: tempfileNew,
      values: keyValues,
    });

    // compare the key values from the existing file to the new file
    const keyValuesNew = infofile.getValue({
      file: tempfileNew,
      keys: keys,
    });

    // sort keyValues and keyValuesNew to make sure they are the same
    const sortedKeyValues = keyValues.sort((a, b) => {
      if (a.keys < b.keys) {
        return -1;
      }
      if (a.keys > b.keys) {
        return 1;
      }
      return 0;
    });
    const sortedKeyValuesNew = keyValuesNew.sort((a, b) => {
      if (a.keys < b.keys) {
        return -1;
      }
      if (a.keys > b.keys) {
        return 1;
      }
      return 0;
    });

    // expect the tempNew file to be the same as the tempExisting file
    expect(sortedKeyValues).toEqual(sortedKeyValuesNew);

    // delete the temporary infofile
    fs.unlinkSync(tempfileExisting);
    fs.unlinkSync(tempfileNew);
  });
});
