const infofile = require("../index");
const path = require("path");

// get the path to the test info file
const relativePath = "./infofiles/DemoCar";
const file = path.resolve(__dirname, relativePath);

// getValue tests
describe("getValue tests", () => {
  // test case for getting a keys value when value is a string
  test("can get a keys where keyValue is a string", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "SuspF.Spring.Kind",
    });

    // check that the keys value is valid
    expect(keyValue.value).toEqual("Hookean 1");
    expect(typeof keyValue.value).toBe("string");
  });

  // test case for getting a keys value when value is a multiline string
  test("can get a keys where keyValue is a multiline string", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "Description",
    });

    // check that the keys value is valid
    expect(keyValue.value[0]).toEqual(
      "Typical, unvalidated data for passenger car"
    );
    expect(keyValue.value[1]).toEqual("with Front Wheel Drive");
    expect(keyValue.value[2]).toEqual("Tire RT 195/65 R15");
  });

  // test case for getting a keys value where value is a number
  test("can get a keys where keys the keys value is a number", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "SuspF.Spring.l0",
    });

    // check that the keys value is valid
    expect(keyValue.value).toEqual(0.3541);
    expect(typeof keyValue.value).toBe("number");
  });

  // test case for getting a keys value where value is a vector
  test("can get a keys where the keys value is a vector", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "Aero.Marker.pos",
    });

    // check that the keys value is valid
    expect(keyValue.value).toEqual([4.28, 0, 0.6]);
    expect(typeof keyValue.value).toBe("object");
  });

  // test case for getting a keys value where value is a matrix
  test("can get a keys where the keys value is a matrix", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "Aero.Coeff",
    });

    // check that the keys value is valid
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

  // test case for getting a keys value where keys are an array with differnt keyValue types
  test("can get a keys where keys are an array with differnt keyValue types", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: [
        "SuspF.Spring.Kind",
        "SuspF.Spring.l0",
        "Aero.Marker.pos",
        "Aero.Coeff",
      ],
    });

    // check that the keys value is valid
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
      infofile.getValue({ keys: "Aero.Ax" });
    }).toThrowError("file is required");
  });

  // test case throws an error when path is relative
  test("throws error when path can't be found", () => {
    // expect error when path cant be found
    expect(() => {
      infofile.getValue({
        file: "./SomeFakeFile.car",
        keys: "Aero.Ax",
      });
    }).toThrowError("File read error");
  });

  // test case throws an error when keys is not provided
  test("throws error when keys is not provided", () => {
    // expect error when keys is not provided
    expect(() => {
      infofile.getValue({ file: file });
    }).toThrowError("keys is required");
  });

  // test case throws an error when keys is not a string
  test("throws error when keys is not a string", () => {
    // expect error when keys is not a string
    expect(() => {
      infofile.getValue({ file: file, keys: 1 });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // test case throws an error when keys is not an array of strings
  test("throws error when keys is not an array of strings", () => {
    // expect error when keys is not an array of strings
    expect(() => {
      infofile.getValue({ file: file, keys: [1, 2, "this"] });
    }).toThrowError("keys must be a string or an array of strings");
  });

  // can get exponetial values
  test("can get exponential values", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: "Flex.JointFr1Fr1B.k.x",
    });

    // check that the keys value is valid
    expect(keyValue.value).toEqual(500000);
  });

  // can get a vector of exponetial values
  test("can get a vector of exponential values", () => {
    // get the keys value
    const keyValue = infofile.getValue({
      file: file,
      keys: ["Body.I"],
    });

    // check that the keys value is valid
    expect(keyValue[0].value).toEqual([470, 1500, 1600, 0, 0, 0]);
  });

  // test case for getting a value where the value is an nValue
  test("getValue returns the parameter name and value for an nValue", () => {
    // get the value
    const keyValue = infofile.getValue({
      file,
      keys: "SuspR.Stabi.Amplify",
    });

    // expected value
    const expectedStringValue = "$stabiAmplify=10.0";

    // check that the string value is valid
    expect(keyValue.value).toEqual(expectedStringValue);
  });
});
