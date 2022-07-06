const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// get text tests
describe("getText tests", () => {
  // test case for getting a text value
  test("can get a text value", () => {
    // get the text value
    const textValue = infofile.getText({
      file,
      keys: "Description",
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
      file,
      keys: ["Description", "Aero.Coeff"],
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

  // test case for getting a text value for a keys that does not exist
  test("can get a text value for a keys that does not exist", () => {
    // get the text value for a keys that does not exist
    const textValue = infofile.getText({
      file,
      keys: "RandomKey",
    });

    // check that the text value is valid
    // check that the array of text values is valid
    expect(textValue.value).toEqual([]);
  });

  // test case for getting an array of text values where one keys does not exist
  test("can get an array of text values where one keys does not exist", () => {
    // get the array of text values where one keys does not exist
    const textValues = infofile.getText({
      file,
      keys: ["Description", "RandomKey"],
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
      infofile.getText({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getText({ file: "./SomeFakeFile.car", keys: "Aero.Ax" });
    }).toThrowError("File read error");
  });

  // test case throws an error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.getText({ file });
    }).toThrowError("keys is required");
  });

  // test case throws an error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.getText({ file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // test case throws an error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.getText({ file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });
});
