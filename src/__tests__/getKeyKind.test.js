const infofile = require("../index");
const path = require("path");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// test suit for keys kinds
describe("getKeyKind tests", () => {
  // test case for getting keys kinds for a single keys
  test("can get keykind for a single keys", () => {
    // get the keykind for a single keys
    const keyKind = infofile.getKeyKind({ file, keys: "Aero.Ax" });

    // expected keykind
    const expectedKeyKind = "String_Key";

    // check that the keykind is valid
    expect(keyKind).toEqual(expectedKeyKind);
  });

  // test case for getting keys kinds for an array of keys
  test("can get keys kinds for an array of keys", () => {
    // get the keykind for an array of keys
    const getKeyKind = infofile.getKeyKind({
      file,
      keys: ["Aero.Ax", "Body.I"],
    });

    // check that the getKeyKind are valid
    expect(getKeyKind[0].keyKind).toEqual("String_Key");
    expect(getKeyKind[1].keyKind).toEqual("String_Key");
  });

  // test case that a keyKind of String is returned for a string keys
  test("can get keykind for a string keys", () => {
    // get the keykind for a string keys
    const keyKind = infofile.getKeyKind({ file, keys: "Aero.Ax" });

    // expected keykind
    const expectedKeyKind = "String_Key";

    // check that the keykind is valid
    expect(keyKind).toEqual(expectedKeyKind);
  });

  // test case that a keyKind of Text is returned for a text keys
  test("can get keykind for a text keys", () => {
    // get the keykind for a text keys
    const keyKind = infofile.getKeyKind({ file, keys: "Description" });

    // check that the keykind is valid
    expect(keyKind).toEqual("Text_Key");
  });

  // test case that a keyKind of No_Key is returned for a keys that does not exist
  test("can get keykind for a keys that does not exist", () => {
    // get the keykind for a keys that does not exist
    const keyKind = infofile.getKeyKind({ file, keys: "RandomKey" });

    // check that the keykind is valid
    expect(keyKind).toEqual("No_Key");
  });

  // test case throws an error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.getKeyKind({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getKeyKind({ file: "./SomeFakeFile.car", keys: "Aero.Ax" });
    }).toThrowError("File read error");
  });

  // test case throws an error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.getKeyKind({ file });
    }).toThrowError("keys is required");
  });

  // test case throws an error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.getKeyKind({ file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // test case throws an error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.getKeyKind({ file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });
});
