const infofile = require("../../index.js");
const path = require("path");

// get the path to the test info file
const relativePath = "../infofiles/DemoCar";
const infofilePath = path.resolve(__dirname, relativePath);

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
    }).toThrowError("File read error");
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
