const { isValidInfoFile } = require("../isValidInfoFile");
const path = require("path");

// get the path to the test car info file
const relativePathCarInfoFile = "./infofiles/DemoCar";
const fileCar = path.resolve(__dirname, relativePathCarInfoFile);

// get the path to the test motorcycle info file
const relativePathMotorcycleInfoFile = "./infofiles/DemoMC_LinearMotorcycle";
const fileMotorcycle = path.resolve(__dirname, relativePathMotorcycleInfoFile);

// get the path to the test truck info file
const relativePathTruckInfoFile = "./infofiles/Demo3AxleCoachTruck";
const fileTruck = path.resolve(__dirname, relativePathTruckInfoFile);

// get the path to the test truck info file
const relativePathTestRunInfoFile = "./infofiles/BackAndForthTestRun";
const fileTestRun = path.resolve(__dirname, relativePathTestRunInfoFile);

// get the path to the test model info file
const relativePathModelInfoFile = "./infofiles/Trailer";
const fileModel = path.resolve(__dirname, relativePathModelInfoFile);

// get the path to the test temp file
const relativePathTempFile = "./infofiles/tempFile";
const tempFile = path.resolve(__dirname, relativePathTempFile);

// get double tests
describe("isValidInfoFile tests", () => {
  // test case validates a valid car infofile successfully with the right function call
  test("validates a valid car infofile successfully with the right function call", () => {
    expect(
      isValidInfoFile({
        file: fileCar,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid motorcycle infofile successfully with the right function call
  test("validates a valid motorcycle infofile successfully with the right function call", () => {
    expect(
      isValidInfoFile({
        file: fileMotorcycle,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid truck infofile successfully with the right function call
  test("validates a valid truck infofile successfully with the right function call", () => {
    expect(
      isValidInfoFile({
        file: fileTruck,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid TestRun infofile successfully with the right function call
  test("validates a valid TestRun infofile successfully with the right function call", () => {
    expect(
      isValidInfoFile({
        file: fileTestRun,
        type: "TestRun",
      })
    ).toEqual(true);
  });

  // test case validates a valid infofile of a model successfully with the right function call
  test("validates a valid infofile of a model successfully with the right function call", () => {
    expect(
      isValidInfoFile({
        file: fileModel,
        type: "Model",
      })
    ).toEqual(true);
  });

  // test case validates a valid infofile of a model successfully with the right function call
  test("returns false when type is Model, but the infofile is of a vehicle or a test run", () => {
    expect(
      isValidInfoFile({
        file: fileCar,
        type: "Model",
      })
    ).toEqual(false);
  });

  // test case returns false when the provided file is not a valid infofile
  test("returns false when the provided file is not a valid infofile", () => {
    expect(
      isValidInfoFile({
        file: tempFile,
        type: "TestRun",
      })
    ).toEqual(false);
  });

  // test case throws error when file is missing in function call
  test("throws error when file is missing in function call", () => {
    expect(() => {
      isValidInfoFile({
        type: "TestRun",
      });
    }).toThrowError("file is required");
  });

  // test case throws error when type is missing in function call
  test("throws error when type is missing in function call", () => {
    expect(() => {
      isValidInfoFile({
        file: fileTestRun,
      });
    }).toThrowError("type is required");
  });

  // test case throws error when the type is invalid
  test("throws error when the type is invalid", () => {
    expect(() => {
      isValidInfoFile({
        file: fileTestRun,
        type: "shouldThrowError",
      });
    }).toThrowError("type is invalid");
  });

  // test case throws error when path can't be found
  test("throws error when path can't be found", () => {
    expect(() => {
      isValidInfoFile({
        file: "./SomeFakeFile.car",
        type: "Vehicle",
      });
    }).toThrowError("File read error");
  });
});
