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

    // read the demo file without using the infofile api
    const demoFile = fs.readFileSync(infofilePath, "utf8");

    // on every line if there is a = or a : then it is a key, extract the key
    const demoFileKeys = demoFile
      .split("\n")
      .filter((line) => line.includes("=") || line.includes(":"))
      .map((line) => line.split("=")[0].trim());

    // remove : and anything after it
    const demoFileKeysWithoutColon = demoFileKeys.map((key) =>
      key.split(":")[0].trim()
    );

    // sort keys and demoKeysArrayFiltered alphabetically
    const sortedKeys = keys.sort();
    const sortedExpectedKeys = demoFileKeysWithoutColon.sort();

    // check that the keys are valid
    expect(sortedKeys).toEqual(sortedExpectedKeys);
  });

  // test case for getting all aero keys
  test("can get all aero keys from infofile", () => {
    // get the list of aero keys from the info file
    const keys = infofile.listKeys({ infofilePath, keyPrefix: "Aero" });

    // expected aero keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
  });

  // test case for getting keys for an array of prefixes
  test("can get keys for an array of prefixes", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body"],
    });

    // expected keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
      "Body.mass",
      "Body.pos",
      "Body.I",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
  });

  // test case for getting an array of prefixes with one key that doesn't exist
  test("can get an array of prefixes with one key that doesn't exist", () => {
    // get the list of keys from the info file
    const keys = infofile.listKeys({
      infofilePath,
      keyPrefix: ["Aero", "Body", "DoesNotExist"],
    });

    // expected keys
    const expectedKeys = [
      "Aero.Ax",
      "Aero.Coeff",
      "Aero.Crosswind.Kind",
      "Aero.Kind",
      "Aero.Marker.pos",
      "Aero.lReference",
      "Aero.pos",
      "Body.mass",
      "Body.pos",
      "Body.I",
    ];

    // sort the keys and expected keys in alphabetical order
    keys.sort();
    expectedKeys.sort();

    // check that the keys are valid
    expect(keys).toEqual(expectedKeys);
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

    // expected keykind
    const expectedKeyKind = "String_Key";

    // check that the keykind is valid
    expect(keyKind).toEqual(expectedKeyKind);
  });

  // test case for getting key kinds for an array of keys
  test("can get key kinds for an array of keys", () => {
    // get the keykind for an array of keys
    const keyKinds = infofile.keyKinds({
      infofilePath,
      key: ["Aero.Ax", "Body.I"],
    });

    // check that the keykinds are valid
    expect(keyKinds[0].keyKind).toEqual("String_Key");
    expect(keyKinds[1].keyKind).toEqual("String_Key");
  });

  // test case that a keyKind of String is returned for a string key
  test("can get keykind for a string key", () => {
    // get the keykind for a string key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Aero.Ax" });

    // expected keykind
    const expectedKeyKind = "String_Key";

    // check that the keykind is valid
    expect(keyKind).toEqual(expectedKeyKind);
  });

  // test case that a keyKind of Text is returned for a text key
  test("can get keykind for a text key", () => {
    // get the keykind for a text key
    const keyKind = infofile.keyKinds({ infofilePath, key: "Description" });

    // check that the keykind is valid
    expect(keyKind).toEqual("Text_Key");
  });

  // test case that a keyKind of No_Key is returned for a key that does not exist
  test("can get keykind for a key that does not exist", () => {
    // get the keykind for a key that does not exist
    const keyKind = infofile.keyKinds({ infofilePath, key: "RandomKey" });

    // check that the keykind is valid
    expect(keyKind).toEqual("No_Key");
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

    // expected string value
    const expectedStringValue = "Step";

    // check that the string value is valid
    expect(stringValue).toEqual(expectedStringValue);
  });

  // test case for getting an array of string values
  test("can get an array of string values", () => {
    // get the array of string values
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "Aero.Kind"],
    });

    // check that the array of string values is valid
    expect(stringValues[0].value).toBe("Step");
    expect(stringValues[1].value).toBe("Coeff6x1 1");
  });

  // test case for getting a string value for a key that does not exist
  test("can get a string value for a key that does not exist", () => {
    // get the string value for a key that does not exist
    const stringValue = infofile.getString({
      infofilePath,
      key: "RandomKey",
    });

    // check that the string value is valid
    expect(stringValue).toBe("");
  });

  // test case for getting an array of string values where one key does not exist
  test("can get an array of string values where one key does not exist", () => {
    // get the array of string values where one key does not exist
    const stringValues = infofile.getString({
      infofilePath,
      key: ["Aero.Crosswind.Kind", "RandomKey"],
    });

    // check that the array of string values is valid
    expect(stringValues[0].value).toBe("Step");
    expect(stringValues[1].value).toBe("");
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
    expect(longValue).toBe(1301);
  });

  // test case for getting an array of long values
  test("can get an array of long values", () => {
    // get the array of long values
    const longValues = infofile.getLong({
      infofilePath,
      key: ["Body.mass", "nAxle"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1301);
    expect(longValues[1].value).toBe(2);
  });

  // test case for getting a long value for a key that does not exist
  test("can get a long value for a key that does not exist", () => {
    // get the long value for a key that does not exist
    const longValue = infofile.getLong({
      infofilePath,
      key: "RandomKey",
    });

    // check that the long value is valid
    expect(longValue).toEqual(NaN);
  });

  // test case for getting an array of long values where one key does not exist
  test("can get an array of long values where one key does not exist", () => {
    // get the array of long values where one key does not exist
    const longValues = infofile.getLong({
      infofilePath,
      key: ["SuspR.Kin.N", "RandomKey"],
    });

    // check that the array of long values is valid
    expect(longValues[0].value).toBe(1);
    expect(longValues[1].value).toBe(NaN);
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
    expect(doubleValue).toEqual(18);
  });

  // test case for getting an array of double values
  test("can get an array of double values", () => {
    // get the array of double values
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["WheelCarrier.fl.mass", "SuspF.Spring.l0"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(18);
    expect(doubleValues[1].value).toEqual(0.3541);
  });

  // test case for getting a double value for a key that does not exist
  test("can get a double value for a key that does not exist", () => {
    // get the double value for a key that does not exist
    const doubleValue = infofile.getDouble({
      infofilePath,
      key: "RandomKey",
    });

    // check that the double value is valid
    expect(doubleValue).toEqual(NaN);
  });

  // test case for getting an array of double values where one key does not exist
  test("can get an array of double values where one key does not exist", () => {
    // get the array of double values where one key does not exist
    const doubleValues = infofile.getDouble({
      infofilePath,
      key: ["SuspF.Spring.l0", "RandomKey"],
    });

    // check that the array of double values is valid
    expect(doubleValues[0].value).toEqual(0.3541);
    expect(doubleValues[1].value).toEqual(NaN);
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
    expect(textValue.value[0]).toEqual(
      "Typical, unvalidated data for passenger car"
    );
    expect(textValue.value[1]).toEqual("with Front Wheel Drive");
    expect(textValue.value[2]).toEqual("Tire RT 195/65 R15");
  });

  // test case for getting an array of text values
  test("can get an array of text values", () => {
    // get the array of text values
    const textValues = infofile.getText({
      infofilePath,
      key: ["Description", "Aero.Coeff"],
    });

    // check that the array of text values is valid
    expect(textValues[0].value[0]).toEqual(
      "Typical, unvalidated data for passenger car"
    );
    expect(textValues[0].value[1]).toEqual("with Front Wheel Drive");
    expect(textValues[0].value[2]).toEqual("Tire RT 195/65 R15");
    expect(textValues[1].value).toEqual([
      "-180 -0.4 0.0 0.1 0.0 -0.01 0.0",
      "-120 -0.2 -1.4 0.7 -0.2 -0.021 0.06",
      "-90 0.0 -1.7 0.9 -0.2 0.0 0.0",
      "-45 0.3 -1.2 0.6 -0.16 0.025 -0.1",
      "0 0.2 0.0 0.1 0.0 -0.03 0.0",
      "45 0.3 1.2 0.6 0.16 0.025 0.1",
      "90 0.0 1.7 0.9 0.2 0.000 0.0",
      "120 -0.2 1.4 0.7 0.2 -0.021 -0.06",
      "180 -0.4 0.0 0.1 0.0 -0.010 0.0",
    ]);
  });

  // test case for getting a text value for a key that does not exist
  test("can get a text value for a key that does not exist", () => {
    // get the text value for a key that does not exist
    const textValue = infofile.getText({
      infofilePath,
      key: "RandomKey",
    });

    // check that the text value is valid
    // check that the array of text values is valid
    expect(textValue.value).toEqual([]);
  });

  // test case for getting an array of text values where one key does not exist
  test("can get an array of text values where one key does not exist", () => {
    // get the array of text values where one key does not exist
    const textValues = infofile.getText({
      infofilePath,
      key: ["Description", "RandomKey"],
    });

    // check that the array of text values is valid
    // check that the array of text values is valid
    expect(textValues[0].value[0]).toEqual(
      "Typical, unvalidated data for passenger car"
    );
    expect(textValues[0].value[1]).toEqual("with Front Wheel Drive");
    expect(textValues[0].value[2]).toEqual("Tire RT 195/65 R15");
    expect(textValues[1].value).toEqual([]);
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
    expect(keyValue.value).toEqual("Hookean 1");
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
    expect(keyValue.value[0]).toEqual(
      "Typical, unvalidated data for passenger car"
    );
    expect(keyValue.value[1]).toEqual("with Front Wheel Drive");
    expect(keyValue.value[2]).toEqual("Tire RT 195/65 R15");
  });

  // test case for getting a key value where value is a number
  test("can get a key where key the key value is a number", () => {
    // get the key value
    const keyValue = infofile.getKeyValues({
      infofilePath,
      key: "SuspF.Spring.l0",
    });

    // check that the key value is valid
    expect(keyValue.value).toEqual(0.3541);
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
    expect(keyValue.value).toEqual([4.28, 0, 0.6]);
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
    expect(keyValue.value).toEqual([
      [-180, -0.4, 0, 0.1, 0, -0.01, 0],
      [-120, -0.2, -1.4, 0.7, -0.2, -0.021, 0.06],
      [-90, 0, -1.7, 0.9, -0.2, 0, 0],
      [-45, 0.3, -1.2, 0.6, -0.16, 0.025, -0.1],
      [0, 0.2, 0, 0.1, 0, -0.03, 0],
      [45, 0.3, 1.2, 0.6, 0.16, 0.025, 0.1],
      [90, 0, 1.7, 0.9, 0.2, 0, 0],
      [120, -0.2, 1.4, 0.7, 0.2, -0.021, -0.06],
      [180, -0.4, 0, 0.1, 0, -0.01, 0],
    ]);
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
    expect(keyValue[0].value).toEqual("Hookean 1");
    expect(keyValue[1].value).toEqual(0.3541);
    expect(keyValue[2].value).toEqual([4.28, 0, 0.6]);
    expect(keyValue[3].value).toEqual([
      [-180, -0.4, 0, 0.1, 0, -0.01, 0],
      [-120, -0.2, -1.4, 0.7, -0.2, -0.021, 0.06],
      [-90, 0, -1.7, 0.9, -0.2, 0, 0],
      [-45, 0.3, -1.2, 0.6, -0.16, 0.025, -0.1],
      [0, 0.2, 0, 0.1, 0, -0.03, 0],
      [45, 0.3, 1.2, 0.6, 0.16, 0.025, 0.1],
      [90, 0, 1.7, 0.9, 0.2, 0, 0],
      [120, -0.2, 1.4, 0.7, 0.2, -0.021, -0.06],
      [180, -0.4, 0, 0.1, 0, -0.01, 0],
    ]);
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

// deleteKey tests
describe("deleteKey tests", () => {
  // test case for deleting a key
  test("can delete a key", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canDeleteKey");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // check that the key was deleted
    const keyValueBeforeDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: "Eng.Joint.pos",
    });

    // delete the key
    infofile.deleteKey({
      infofilePath: tempInfofilePath,
      key: "Eng.Joint.pos",
    });

    // check that the key was deleted
    const keyValueAfterDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: "Eng.Joint.pos",
    });

    // check the key value before and after deletion
    expect(keyValueBeforeDelete).toBe("String_Key");
    expect(keyValueAfterDelete).toBe("No_Key");
  });

  // test case for deleting a key where key is an array
  test("can delete a key where key is an array", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canDeleteKeyArray");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // check that the key was deleted
    const keyValueBeforeDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // delete the key
    infofile.deleteKey({
      infofilePath: tempInfofilePath,
      key: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // check that the key was deleted
    const keyValueAfterDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // check the key value before and after deletion
    expect(keyValueBeforeDelete[0].keyKind).toBe("String_Key");
    expect(keyValueAfterDelete[0].keyKind).toBe("No_Key");
    expect(keyValueBeforeDelete[1].keyKind).toBe("String_Key");
    expect(keyValueAfterDelete[1].keyKind).toBe("No_Key");
  });

  // can delete a key that doesn't exist
  test("can delete a key that doesn't exist", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(
      os.tmpdir(),
      "canDeleteKeyThatDoesntExist"
    );
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // check that the key was deleted
    const keyValueBeforeDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: "SomeKeyThatDoesntExist",
    });

    // delete the key
    infofile.deleteKey({
      infofilePath: tempInfofilePath,
      key: "SomeKeyThatDoesntExist",
    });

    // check that the key was deleted
    const keyValueAfterDelete = infofile.keyKinds({
      infofilePath: tempInfofilePath,
      key: "SomeKeyThatDoesntExist",
    });

    // check the key value before and after deletion
    expect(keyValueBeforeDelete).toBe("No_Key");
    expect(keyValueAfterDelete).toBe("No_Key");
  });

  //throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.deleteKey({ key: "Aero.Ax" });
    }).toThrowError("infofilePath is required");
  });

  // throws error when path can't be found
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.deleteKey({
        infofilePath: "./SomeFakeFile.car",
        key: "Aero.Ax",
      });
    }).toThrowError(
      "infofilePath ./SomeFakeFile.car does not exist, please ensure path is not a relative path"
    );
  });

  // throws error when key is not provided
  test("throws error when key is not provided", () => {
    // expect error when key is not provided
    expect(() => {
      infofile.deleteKey({ infofilePath });
    }).toThrowError("key is required");
  });

  // throws error when key is not a string
  test("throws error when key is not a string", () => {
    // expect error when key is not a string
    expect(() => {
      infofile.deleteKey({ infofilePath, key: 1 });
    }).toThrowError("key must be a string or an array of strings");
  });

  // throws error when key is not an array of strings
  test("throws error when key is not an array of strings", () => {
    // expect error when key is not an array of strings
    expect(() => {
      infofile.deleteKey({ infofilePath, key: [1, 2, "this"] });
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
    const setValueStatus = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setValueStatus).toBe(0);
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

    // check that the string value is valid
    expect(setValue[0].status).toBe(0);
    expect(setValue[1].status).toBe(0);
  });

  // test case for setting a string on a file that already exists
  test("can set a string value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetStringOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the string value
    const setStatus = infofile.setString({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Eng.Kind", value: "Flex" },
    });

    // check that the string value is valid
    expect(setStatus).toBe(0);
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
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test can set an array of long values
  test("can set an array of long values to a new infofile", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongArray");

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: [
        { key: "Body.mass", value: 1002 },
        { key: "PowerTrain.OSRate", value: 2000 },
      ],
    });

    // check that the long value is valid
    expect(setStatus[0].status).toBe(0);
    expect(setStatus[1].status).toBe(0);
  });

  // test case for setting a long on a file that already exists
  test("can set a long value to an existing infofile", () => {
    // copy the infofile to a temporary location
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLongOnExisting");
    fs.copyFileSync(infofilePath, tempInfofilePath);

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 1990 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
  });

  // test case for setting a double when using setLong to a new infofile, expect a long value to be set
  test("honours setLong even when trying to set double", () => {
    // create a temporary infofile
    const tempInfofilePath = path.join(os.tmpdir(), "canSetLong");

    // set the long value
    const setStatus = infofile.setLong({
      infofilePath: tempInfofilePath,
      keyValues: { key: "Body.mass", value: 100.5 },
    });

    // check that the long value is valid
    expect(setStatus).toBe(0);
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
