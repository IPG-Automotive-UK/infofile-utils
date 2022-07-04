const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

// test suit for key kinds
describe("keyKinds tests", () => {
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
    }).toThrowError("File read error");
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
