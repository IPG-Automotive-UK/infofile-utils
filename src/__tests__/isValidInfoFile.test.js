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

// get the path to the road info file
const relativePathRoadInfoFile = "./infofiles/DEU_Hockenheim.rd5";
const fileRoad = path.resolve(__dirname, relativePathRoadInfoFile);

// get the path to the test temp file
const relativePathTempFile = "./infofiles/tempFile";
const tempFile = path.resolve(__dirname, relativePathTempFile);

// get double tests
describe("isValidInfoFile tests", () => {
  test.each([
    { testFile: fileCar, testType: "Vehicle", text: "Car" },
    { testFile: fileMotorcycle, testType: "Vehicle", text: "Motorcycle" },
    { testFile: fileTruck, testType: "Vehicle", text: "Truck" },
    { testFile: fileTestRun, testType: "TestRun", text: "TestRun" },
    { testFile: fileModel, testType: "Model", text: "Model" },
    { testFile: fileRoad, testType: "Road", text: "Road" },
  ])(
    "validates a valid $text infofile successfully with the right function call",
    ({ testFile, testType, text }) => {
      expect(
        isValidInfoFile({
          file: testFile,
          type: testType,
        })
      ).toEqual(true);
    }
  );

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

  // returns true when infofile type is not provided, but the given file is not an infofile
  test("returns true when infofile type is not provided, but the given file is not an infofile", () => {
    expect(
      isValidInfoFile({
        file: fileCar,
      })
    ).toEqual(true);
  });

  // returns false when infofile type is not provided, and the given file is not an infofile
  test("returns false when infofile type is not provided, and the given file is not an infofile", () => {
    expect(
      isValidInfoFile({
        file: tempFile,
      })
    ).toEqual(false);
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
