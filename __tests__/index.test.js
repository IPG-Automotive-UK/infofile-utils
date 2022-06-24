const infofile = require("../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// test suite for list keys
describe("listKey tests", () => {
  // test case for getting all keys
  test("can get all list keys from infofile", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({ infofilePath });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
  });

  // test case for getting all aero keys
  test("can get all aero keys from infofile", () => {
    // get the list of aero keys from the info file
    const keys = infofile.listKeys({ infofilePath, keyPrefix: "Aero" });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
  });

  // test case for getting keys for an array of prefixes
  test("can get keys for an array of prefixes", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body"],
    });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
    expect(keys).toContain("Aero.Ax");
    expect(keys).toContain("Body.I");
  });

  // test case for getting an array of prefixes with one key that doesn't exist
  test("can get an array of prefixes with one key that doesn't exist", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body", "DoesNotExist"],
    });

    // check that the keys are valid
    expect(keys).toMatchSnapshot();
    expect(keys).toContain("Aero.Ax");
    expect(keys).toContain("Body.I");
    expect(keys).not.toContain("DoesNotExist.DoesNotExist");
  });

  // test case error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.listKeys({});
    }).toThrowError("infofilePath is required");
  });

  // test case error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path can't be found
    expect(() => {
      infofile.listKeys({ infofilePath: "./SomeFakeFile.car" });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case error when keyPrefix is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.listKeys({ infofilePath, keyPrefix: 1 });
    }).toThrowError("keyPrefix must be a string or an array of strings");
  });

  // test case error when keyPrefix is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when keyPrefix is not an array of strings
    expect(() => {
      infofile.listKeys({ infofilePath, keyPrefix: [1, 2, "this"] });
    }).toThrowError("keyPrefix must be a string or an array of strings");
  });
});

// test suit for list key kinds
describe("listKeyKinds tests", () => {
  // test case for getting key kinds for a single key
  test("can get keykind for a single key", () => {
    // get the keykind for a single key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Aero.Ax" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case for getting key kinds for an array of keys
  test("can get key kinds for an array of keys", () => {
    // get the keykind for an array of keys
    const keyKinds = infofile.keyKinds({
      infofilePath,
      key: ["Aero.Ax", "Body.I"],
    });

    // check that the keykinds are valid
    expect(keyKinds).toMatchSnapshot();
  });

  // test case that a keyKind of String is returned for a string key
  test("can get keykind for a string key", () => {
    // get the keykind for a string key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Aero.Ax" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case that a keyKind of Text is returned for a text key
  test("can get keykind for a text key", () => {
    // get the keykind for a text key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Description" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case that a keyKind of No_Key is returned for a key that does not exist
  test("can get keykind for a key that does not exist", () => {
    // get the keykind for a key that does not exist
    const keyKind = infofile.keyKinds({ infofilePath, key: "RandomKey" });

    // check that the keykind is valid
    expect(keyKind).toMatchSnapshot();
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.keyKinds({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.keyKinds({ infofilePath: "./SomeFakeFile.car", key: "Aero.Ax" });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.keyKinds({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.keyKinds({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.keyKinds({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// get string tests
describe("getString tests", () => {
  // test case for getting a string value
  test("can get a string value", () => {
    // get the string value
    const stringValue = infofile.getString({
      infofilePath,
      key: "Aero.Crosswind.Kind",
    });

    // check that the string value is valid
    expect(stringValue).toMatchSnapshot();
  });

  // test case for getting an array of string values
  test("can get an array of string values", () => {
    // get the array of string values
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "Aero.Kind"],
    });

    // check that the array of string values is valid
    expect(stringValues).toMatchSnapshot();
  });

  // test case for getting a string value for a key that does not exist
  test("can get a string value for a key that does not exist", () => {
    // get the string value for a key that does not exist
    const stringValue = infofile.getString({
      infofilePath,
      key: "RandomKey",
    });

    // check that the string value is valid
    expect(stringValue).toMatchSnapshot();
  });

  // test case for getting an array of string values where one key does not exist
  test("can get an array of string values where one key does not exist", () => {
    // get the array of string values where one key does not exist
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "RandomKey"],
    });

    // check that the array of string values is valid
    expect(stringValues).toMatchSnapshot();
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getString({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getString({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getString({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getString({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getString({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// get long tests
describe("getLong tests", () => {
  // test case for getting a long value
  test("can get a long value", () => {
    // get the long value
    const longValue = infofile.getLong({
      infofilePath,
      key: "Body.mass",
    });

    // check that the long value is valid
    expect(longValue).toMatchSnapshot();
  });

  // test case for getting an array of long values
  test("can get an array of long values", () => {
    // get the array of long values
    const longValues = infofile.getLong({
      infofilePath,
      key: ["Body.mass", "nAxle"],
    });

    // check that the array of long values is valid
    expect(longValues).toMatchSnapshot();
  });

  // test case for getting a long value for a key that does not exist
  test("can get a long value for a key that does not exist", () => {
    // get the long value for a key that does not exist
    const longValue = infofile.getLong({
      infofilePath,
      key: "RandomKey",
    });

    // check that the long value is valid
    expect(longValue).toMatchSnapshot();
  });

  // test case for getting an array of long values where one key does not exist
  test("can get an array of long values where one key does not exist", () => {
    // get the array of long values where one key does not exist
    const longValues = infofile.getLong({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "RandomKey"],
    });

    // check that the array of long values is valid
    expect(longValues).toMatchSnapshot();
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getLong({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getLong({ infofilePath: "./SomeFakeFile.car", key: "Aero.Ax" });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getLong({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getLong({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getLong({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// get double tests
describe("getDouble tests", () => {
  // test case for getting a double value
  test("can get a double value", () => {
    // get the double value
    const doubleValue = infofile.getDouble({
      infofilePath,
      key: "WheelCarrier.fl.mass",
    });

    // check that the double value is valid
    expect(doubleValue).toMatchSnapshot();
  });

  // test case for getting an array of double values
  test("can get an array of double values", () => {
    // get the array of double values
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["WheelCarrier.fl.mass", "SuspF.Spring.l0"],
    });

    // check that the array of double values is valid
    expect(doubleValues).toMatchSnapshot();
  });

  // test case for getting a double value for a key that does not exist
  test("can get a double value for a key that does not exist", () => {
    // get the double value for a key that does not exist
    const doubleValue = infofile.getDouble({
      infofilePath,
      key: "RandomKey",
    });

    // check that the double value is valid
    expect(doubleValue).toMatchSnapshot();
  });

  // test case for getting an array of double values where one key does not exist
  test("can get an array of double values where one key does not exist", () => {
    // get the array of double values where one key does not exist
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["SuspF.Spring.l0", "RandomKey"],
    });

    // check that the array of double values is valid
    expect(doubleValues).toMatchSnapshot();
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getDouble({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });
  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getDouble({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });
  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getDouble({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getDouble({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getDouble({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// get text tests
describe("getText tests", () => {
  // test case for getting a text value
  test("can get a text value", () => {
    // get the text value
    const textValue = infofile.getText({
      infofilePath,
      key: "Description",
    });

    // check that the text value is valid
    expect(textValue).toMatchSnapshot();
  });

  // test case for getting an array of text values
  test("can get an array of text values", () => {
    // get the array of text values
    const textValues = infofile.getText({
      infofilePath,
      key: ["Description", "Aero.Coeff"],
    });

    // check that the array of text values is valid
    expect(textValues).toMatchSnapshot();
  });

  // test case for getting a text value for a key that does not exist
  test("can get a text value for a key that does not exist", () => {
    // get the text value for a key that does not exist
    const textValue = infofile.getText({
      infofilePath,
      key: "RandomKey",
    });

    // check that the text value is valid
    expect(textValue).toMatchSnapshot();
  });

  // test case for getting an array of text values where one key does not exist
  test("can get an array of text values where one key does not exist", () => {
    // get the array of text values where one key does not exist
    const textValues = infofile.getText({
      infofilePath,
      key: ["Description", "RandomKey"],
    });

    // check that the array of text values is valid
    expect(textValues).toMatchSnapshot();
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getText({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getText({ infofilePath: "./SomeFakeFile.car", key: "Aero.Ax" });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getText({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getText({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getText({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// getKeyValues tests
describe("getKeyValues tests", () => {
  // test case for getting a key value when value is a string
  test("can get a key where keyValue is a string", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "SuspF.Spring.Kind",
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
    expect(typeof keyValue.value).toBe("string");
  });

  // test case for getting a key value when value is a multiline string
  test("can get a key where keyValue is a multiline string", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "Description",
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
  });

  // test case for getting a key value where value is a number
  test("can get a key where key the key value is a number", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "SuspF.Spring.l0",
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
    expect(typeof keyValue.value).toBe("number");
  });

  // test case for getting a key value where value is a vector
  test("can get a key where the key value is a vector", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "Aero.Marker.pos",
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
    expect(typeof keyValue.value).toBe("object");
  });

  // test case for getting a key value where value is a matrix
  test("can get a key where the key value is a matrix", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "Aero.Coeff",
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
    expect(typeof keyValue.value).toBe("object");
  });

  // test case for getting a key value where keys are an array with differnt keyValue types
  test("can get a key where keys are an array with differnt keyValue types", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: [
        "SuspF.Spring.Kind",
        "SuspF.Spring.l0",
        "Aero.Marker.pos",
        "Aero.Coeff",
      ],
    });

    // check that the key value is valid
    expect(keyValue).toMatchSnapshot();
    expect(typeof keyValue[0].value).toBe("string");
    expect(typeof keyValue[1].value).toBe("number");
    expect(typeof keyValue[2].value).toBe("object");
    expect(typeof keyValue[3].value).toBe("object");
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getKeyValues({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getKeyValues({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // test case throws an error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.getKeyValues({ infofilePath });
    }).toThrowError("key is required");
  });

  // test case throws an error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.getKeyValues({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // test case throws an error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.getKeyValues({ infofilePath, key: [1, 2, "this"] });
    }).toThrowError("key must be a string or an array of strings");
  });
});

// setString tests
describe("setString tests", () => {
  // test case for setting a string value
  test("can set a string value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetString");

    // set the string value
    const setValue = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // read back the string value
    const readValue = infofile.getString({
      infofilePath: tempInfofilePath,
      key: "Eng.Kind",
    });

    // check that the string value is valid
    expect(setValue.value).toBe(readValue.value);
  });

  // test can set an array of string values
  test("can set an array of string values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringArray");

    // set the string value
    const setValue = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Eng.Kind", value: "Flex" },
        { key: "VehicleModel.Kind", value: "FlexBody" },
      ],
    });

    // read back the string value
    const readValue = infofile.getString({
      infofilePath: tempInfofilePath,
      key: ["Eng.Kind", "VehicleModel.Kind"],
    });

    // check that the string value is valid
    expect(setValue[0].value).toBe(readValue[0].value);
    expect(setValue[1].value).toBe(readValue[1].value);
  });

  // test case for setting a string on a file that already exists
  test("can set a string value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the string value
    const setValue = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // read back the string value
    const readValue = infofile.getString({
      infofilePath: tempInfofilePath,
      key: "Eng.Kind",
    });

    // check that the string value is valid
    expect(setValue.value).toBe(readValue.value);
    expect(readValue.value).toBe("Flex");
  });

  // throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.setString({ keyValues: { key: "Aero.Ax", value: "Flex" } });
    }).toThrowError("infofilePath is required");
  });

  // throws error when keyValues is not provided
  test("throws error when keyValues is not provided", () => {
    // expect error when keyValues is not provided
    expect(() => {
      infofile.setString({ infofilePath });
    }).toThrowError("keyValues is required");
  });

  // throws error when keyValues is not an object
  test("throws error when keyValues is not an object", () => {
    // expect error when keyValues is not an object
    expect(() => {
      infofile.setString({ infofilePath, keyValues: 1 });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a key property
  test("throws error when keyValues does not have a key property", () => {
    // expect error when keyValues does not have a key property
    expect(() => {
      infofile.setString({ infofilePath, keyValues: { value: "Flex" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues does not have a value property
  test("throws error when keyValues does not have a value property", () => {
    // expect error when keyValues does not have a value property
    expect(() => {
      infofile.setString({ infofilePath, keyValues: { key: "Aero.Ax" } });
    }).toThrowError("keyValues is not an object with a key and value property");
  });

  // throws error when keyValues is an array of objects and one of them does not have a key property
  test("throws error when keyValues is an array of objects and one of them does not have a key property", () => {
    // expect error when keyValues is an array of objects and one of them does not have a key property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { value: "Flex" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );

    // expect error when keyValues is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws error when keyValues is an array of objects and one of them does not have a value property
  test("throws error when keyValues is an array of objects and one of them does not have a value property", () => {
    // expect error when keyValues is an array of objects and one of them does not have a value property
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [{ key: "Aero.Ax", value: "Flex" }, { key: "Aero.Ax" }],
      });
    }).toThrowError(
      "keyValues is an array, but not an array of objects with a key and value property"
    );
  });

  // throws an error when value is not a string
  test("throws error when value is not a string", () => {
    // expect error when value is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: { key: "Aero.Ax", value: 1 },
      });
    }).toThrowError("keyValues.value is not a string");
  });

  // throws an error when key values is an array but value is not a string
  test("throws error when key values is an array but value is not a string", () => {
    // expect error when key values is an array but value is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: 1 },
          { key: "Aero.Ax", value: 5 },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are strings"
    );
  });

  // throws an error when keyValues is an array but one of the values is not a string
  test("throws error when keyValues is an array but one of the values is not a string", () => {
    // expect error when keyValues is an array but one of the values is not a string
    expect(() => {
      infofile.setString({
        infofilePath,
        keyValues: [
          { key: "Aero.Ax", value: "Flex" },
          { key: "Aero.Ax", value: 1 },
        ],
      });
    }).toThrowError(
      "keyValues is an array of objects, each object has a key and value property, but not all values are strings"
    );
  });
});

// setLong tests
describe("setLong tests", () => {
  // test case for setting a long value
  test("can set a long value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setValue = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100 },
    });

    // read back the long value
    const readValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // check that the long value is valid
    expect(setValue.value).toBe(readValue.value);
  });

  // test can set an array of long values
  test("can set an array of long values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongArray");

    // set the long value
    const setValue = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Body.mass", value: 1002 },
        { key: "PowerTrain.OSRate", value: 2000 },
      ],
    });

    // read back the long value
    const readValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: ["Body.mass", "PowerTrain.OSRate"],
    });

    // check that the long value is valid
    expect(setValue[0].value).toBe(readValue[0].value);
    expect(setValue[1].value).toBe(readValue[1].value);
  });

  // test case for setting a long on a file that already exists
  test("can set a long value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the long value
    const setValue = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 1990 },
    });

    // read back the long value
    const readValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // check that the long value is valid
    expect(setValue.value).toBe(readValue.value);
    expect(readValue.value).toBe(1990);
  });

  // test case for setting a double when using setLong to a new infofile, expect a long value to be set
  test("honours setLong even when trying to set double", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setValue = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100.5 },
    });

    // read back the long value
    const readValue = infofile.getLong({
      infofilePath: tempInfofilePath,
      key: "Body.mass",
    });

    // check that the long value is valid
    expect(setValue.value).toBe(readValue.value);
    expect(setValue.value).toBe(100);
    expect(setValue.value).not.toBe(100.5);
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

// setDouble tests
describe("setDouble", () => {
  // test can set a double value to a new infofile
  test("can set a double value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDouble");

    // set the double value
    const setValue = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: { key: "PowerTrain.Engine.I", value: 0.09 },
    });

    // read back the double value
    const readValue = infofile.getDouble({
      infofilePath: tempInfofilePath,
      key: "PowerTrain.Engine.I",
    });

    // check that the double value is valid
    expect(setValue.value).toBe(readValue.value);
    expect(setValue.value).toBe(0.09);
  });

  // test can set a double value to an existing infofile
  test("can set a double value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDoubleOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the double value
    const setValue = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: { key: "PowerTrain.Engine.I", value: 0.06 },
    });

    // read back the double value
    const readValue = infofile.getDouble({
      infofilePath: tempInfofilePath,
      key: "PowerTrain.Engine.I",
    });

    // check that the double value is valid
    expect(setValue.value).toBe(readValue.value);
    expect(setValue.value).toBe(0.06);
  });

  // test can set an array of double values to a new infofile
  test("can set an array of double values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetDoubleArray");

    // set the double value
    const setValue = infofile.setDouble({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "PowerTrain.Engine.I", value: 0.09 },
        { key: "SuspF.Buf_Pull.tz0", value: -0.08 },
      ],
    });

    // read back the double value
    const readValue = infofile.getDouble({
      infofilePath: tempInfofilePath,
      key: ["PowerTrain.Engine.I", "SuspF.Buf_Pull.tz0"],
    });

    // check that the double value is valid
    expect(setValue[0].value).toBe(readValue[0].value);
    expect(setValue[1].value).toBe(readValue[1].value);
    expect(setValue[0].value).toBe(0.09);
    expect(readValue[1].value).toBe(-0.08);
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

// setText tests
describe("setText tests", () => {
  // test case for setting a Text value
  test("can set a Text value to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetText");

    // set the Text value
    const setValue = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // read back the Text value
    const readValue = infofile.getText({
      infofilePath: tempInfofilePath,
      key: "Description",
    });

    // check that the Text value is valid
    expect(setValue.value[0]).toBe(readValue.value[0]);
    expect(setValue.value[1]).toBe(readValue.value[1]);
    expect(setValue.value[2]).toBe(readValue.value[2]);
  });

  // test can set an array of Text values
  test("can set an array of Text values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetTextArray");

    // set the Text value
    const setValue = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Description", value: ["This is a", "multiline", "string"] },
        {
          key: "Additional.Comment",
          value: ["This is another", "multiline", "string"],
        },
      ],
    });

    // read back the Text value
    const readValue = infofile.getText({
      infofilePath: tempInfofilePath,
      key: ["Description", "Additional.Comment"],
    });

    // check that the Text value is valid
    expect(setValue[0].value[0]).toBe(readValue[0].value[0]);
    expect(setValue[0].value[1]).toBe(readValue[0].value[1]);
    expect(setValue[0].value[2]).toBe(readValue[0].value[2]);
    expect(setValue[1].value[0]).toBe(readValue[1].value[0]);
    expect(setValue[1].value[1]).toBe(readValue[1].value[1]);
    expect(setValue[1].value[2]).toBe(readValue[1].value[2]);
  });

  // test case for setting a Text on a file that already exists
  test("can set a Text value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the Text value
    const setValue = infofile.setText({
      infofilePath: tempInfofilePath,
      keyValues: {
        key: "Description",
        value: ["This is a", "multiline", "string"],
      },
    });

    // read back the Text value
    const readValue = infofile.getText({
      infofilePath: tempInfofilePath,
      key: "Description",
    });

    // check that the Text value is valid
    expect(setValue.value[0]).toBe(readValue.value[0]);
    expect(setValue.value[1]).toBe(readValue.value[1]);
    expect(setValue.value[2]).toBe(readValue.value[2]);
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
