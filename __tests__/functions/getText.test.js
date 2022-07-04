const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

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
    }).toThrowError("File read error");
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
