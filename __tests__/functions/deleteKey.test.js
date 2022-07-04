const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

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
    }).toThrowError("File read error");
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
