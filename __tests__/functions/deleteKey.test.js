const infofile = require("../../index.js");
const path = require("path");
const os = require("os");
const fs = require("fs");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// deleteKey tests
describe("deleteKey tests", () => {
  // test case for deleting a keys
  test("can delete a keys", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canDeleteKey");
    fs.copyFileSync(file, tempfile);

    // check that the keys was deleted
    const keyValueBeforeDelete = infofile.getKeyKind({
      file: tempfile,
      keys: "Eng.Joint.pos",
    });

    // delete the keys
    infofile.deleteKey({
      file: tempfile,
      keys: "Eng.Joint.pos",
    });

    // check that the keys was deleted
    const keyValueAfterDelete = infofile.getKeyKind({
      file: tempfile,
      keys: "Eng.Joint.pos",
    });

    // check the keys value before and after deletion
    expect(keyValueBeforeDelete).toBe("String_Key");
    expect(keyValueAfterDelete).toBe("No_Key");
  });

  // test case for deleting a keys where keys is an array
  test("can delete a keys where keys is an array", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canDeleteKeyArray");
    fs.copyFileSync(file, tempfile);

    // check that the keys was deleted
    const keyValueBeforeDelete = infofile.getKeyKind({
      file: tempfile,
      keys: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // delete the keys
    infofile.deleteKey({
      file: tempfile,
      keys: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // check that the keys was deleted
    const keyValueAfterDelete = infofile.getKeyKind({
      file: tempfile,
      keys: ["Eng.Joint.pos", "Eng.Orientation"],
    });

    // check the keys value before and after deletion
    expect(keyValueBeforeDelete[0].keyKind).toBe("String_Key");
    expect(keyValueAfterDelete[0].keyKind).toBe("No_Key");
    expect(keyValueBeforeDelete[1].keyKind).toBe("String_Key");
    expect(keyValueAfterDelete[1].keyKind).toBe("No_Key");
  });

  // can delete a keys that doesn't exist
  test("can delete a keys that doesn't exist", () => {
    // create a temporary infofile
    const tempfile = path.join(os.tmpdir(), "canDeleteKeyThatDoesntExist");
    fs.copyFileSync(file, tempfile);

    // check that the keys was deleted
    const keyValueBeforeDelete = infofile.getKeyKind({
      file: tempfile,
      keys: "SomeKeyThatDoesntExist",
    });

    // delete the keys
    infofile.deleteKey({
      file: tempfile,
      keys: "SomeKeyThatDoesntExist",
    });

    // check that the keys was deleted
    const keyValueAfterDelete = infofile.getKeyKind({
      file: tempfile,
      keys: "SomeKeyThatDoesntExist",
    });

    // check the keys value before and after deletion
    expect(keyValueBeforeDelete).toBe("No_Key");
    expect(keyValueAfterDelete).toBe("No_Key");
  });

  //throws error when no path is provided
  test("throws error when no path is provided", () => {
    // expect error when no path is provided
    expect(() => {
      infofile.deleteKey({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });

  // throws error when path can't be found
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.deleteKey({
        file: "./SomeFakeFile.car",
        keys: "Aero.Ax",
      });
    }).toThrowError("File read error");
  });

  // throws error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.deleteKey({ file });
    }).toThrowError("keys is required");
  });

  // throws error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.deleteKey({ file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // throws error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.deleteKey({ file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });
});
