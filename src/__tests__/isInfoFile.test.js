const { isInfoFile } = require("../isInfoFile");
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

// get double tests
describe("isInfoFile tests", () => {
  // test case validates a valid car infofile successfully with the right function call
  test("validates a valid car infofile successfully with the right function call", () => {
    expect(
      isInfoFile({
        file: fileCar,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid motorcycle infofile successfully with the right function call
  test("validates a valid motorcycle infofile successfully with the right function call", () => {
    expect(
      isInfoFile({
        file: fileMotorcycle,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid truck infofile successfully with the right function call
  test("validates a valid truck infofile successfully with the right function call", () => {
    expect(
      isInfoFile({
        file: fileTruck,
        type: "Vehicle",
      })
    ).toEqual(true);
  });

  // test case validates a valid TestRun infofile successfully with the right function call
  test("validates a valid TestRun infofile successfully with the right function call", () => {
    expect(
      isInfoFile({
        file: fileTestRun,
        type: "TestRun",
      })
    ).toEqual(true);
  });

  // test case throws error when file is missing in function call
  test("throws error when file is missing in function call", () => {
    expect(() => {
      isInfoFile({
        type: "TestRun",
      });
    }).toThrowError("file is required");
  });

  // test case throws error when type is missing in function call
  test("throws error when type is missing in function call", () => {
    expect(() => {
      isInfoFile({
        file: fileTestRun,
      });
    }).toThrowError("type is required");
  });

  // test case throws error when the type is invalid
  test("throws error when the type is invalid", () => {
    expect(() => {
      isInfoFile({
        file: fileTestRun,
        type: "shouldThrowError",
      });
    }).toThrowError("type is invalid");
  });

  // test case throws error when path can't be found
  test("throws error when path can't be found", () => {
    expect(() => {
      isInfoFile({
        file: "./SomeFakeFile.car",
        type: "Vehicle",
      });
    }).toThrowError("File read error");
  });
});
