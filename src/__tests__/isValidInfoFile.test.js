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

// get the path to the road info file
const relativePathRoadInfoFile = "./infofiles/DEU_Hockenheim.rd5";
const fileRoad = path.resolve(__dirname, relativePathRoadInfoFile);

// get the path to the test trailer info file
const relativePathTrailerInfoFile = "./infofiles/Trailer";
const fileTrailer = path.resolve(__dirname, relativePathTrailerInfoFile);

// get the path to the test tire info file
const relativePathTireInfoFile = "./infofiles/DT_CM4SL_UserTire";
const fileTire = path.resolve(__dirname, relativePathTireInfoFile);

// get the path to the test ego vehicle's driver info file
const relativePathDriverInfoFile = "./infofiles/Car_Aggressive";
const fileDriver = path.resolve(__dirname, relativePathDriverInfoFile);

// get the path to the test traffic behavior info file
const relativePathTrafficBehaviorInfoFile =
  "./infofiles/DefaultTrafficBehavior";
const fileTrafficBehavior = path.resolve(
  __dirname,
  relativePathTrafficBehaviorInfoFile
);

// get the path to the test traffic driver info file
const relativePathTrafficDriverInfoFile =
  "./infofiles/Traffic_Car_Generic_Aggressive";
const fileTrafficDriver = path.resolve(
  __dirname,
  relativePathTrafficDriverInfoFile
);

// get the path to the test traffic template info file
const relativePathTrafficTemplateInfoFile = "./infofiles/IPG_CompanyCar_2018";
const fileTrafficTemplate = path.resolve(
  __dirname,
  relativePathTrafficTemplateInfoFile
);

// get the path to the test saved selections info file
const relativePathSavedSelectionsInfoFile = "./infofiles/SavedSelections";
const fileSavedSelections = path.resolve(
  __dirname,
  relativePathSavedSelectionsInfoFile
);

// get the path to the test user driver info file
const relativePathUserDriverInfoFile = "./infofiles/MyUserDriver";
const fileUserDriver = path.resolve(__dirname, relativePathUserDriverInfoFile);

// get the path to the test SuspKnC .skc info file
const relativePathSkcInfoFile = "./infofiles/DoubleWishbone_Front.skc";
const fileSkc = path.resolve(__dirname, relativePathSkcInfoFile);

// get the path to the test SuspKnC .mbs info file
const relativePathMbsInfoFile = "./infofiles/DoubleWishbone_Front.mbs";
const fileMbs = path.resolve(__dirname, relativePathMbsInfoFile);

// get the path to the test ADTF info file
const relativePathADTFInfoFile = "./infofiles/ADTFConf";
const fileADTF = path.resolve(__dirname, relativePathADTFInfoFile);

// get the path to the test DataDict info file
const relativePathDataDictInfoFile = "./infofiles/DataDict";
const fileDataDict = path.resolve(__dirname, relativePathDataDictInfoFile);

// get the path to the test GPUConfig info file
const relativePathGPUConfigInfoFile = "./infofiles/GPUConfiguration_MultiGPU";
const fileGPUConfig = path.resolve(__dirname, relativePathGPUConfigInfoFile);

// get the path to the test PTBattery-BattECM info file
const relativePathPTBatteryBattECMInfoFile = "./infofiles/BattECM_basic";
const filePTBatteryBattECM = path.resolve(
  __dirname,
  relativePathPTBatteryBattECMInfoFile
);

// get the path to the test air brake info file
const relativePathAirBrakeInfoFile = "./infofiles/Demo1AxleTrailerAirbrake";
const fileAirBrake = path.resolve(__dirname, relativePathAirBrakeInfoFile);

// get the path to the test HydESP info file
const relativePathHydESPInfoFile = "./infofiles/HydESP_DemoParam";
const fileHydESP = path.resolve(__dirname, relativePathHydESPInfoFile);

// get the path to the test HydIPB info file
const relativePathHydIPBInfoFile = "./infofiles/HydIPB_DemoParam";
const fileHydIPB = path.resolve(__dirname, relativePathHydIPBInfoFile);

// get the path to the test suspension info file
const relativePathSuspensionInfoFile = "./infofiles/MySusp_BufferSystem";
const fileSuspension = path.resolve(__dirname, relativePathSuspensionInfoFile);

// get the path to the test suspension control info file
const relativePathSuspensionControlInfoFile = "./infofiles/SuspensionControl";
const fileSuspensionControl = path.resolve(
  __dirname,
  relativePathSuspensionControlInfoFile
);

// get the path to the test temp file
const relativePathTempFile = "./infofiles/tempFile";
const tempFile = path.resolve(__dirname, relativePathTempFile);

// get double tests
describe("isValidInfoFile tests", () => {
  test.each([
    { testFile: fileCar, testType: "Vehicle", text: "Car" },
    { testFile: fileMotorcycle, testType: "Vehicle", text: "Motorcycle" },
    { testFile: fileTruck, testType: "Vehicle", text: "Truck" },
    { testFile: fileCar, testType: "Car", text: "Car" },
    { testFile: fileMotorcycle, testType: "Motorcycle", text: "Motorcycle" },
    { testFile: fileTruck, testType: "Truck", text: "Truck" },
    { testFile: fileTestRun, testType: "TestRun", text: "TestRun" },
    { testFile: fileRoad, testType: "Road", text: "Road" },
    { testFile: fileTrailer, testType: "Trailer", text: "Trailer" },
    { testFile: fileTire, testType: "Tire", text: "Tire" },
    { testFile: fileDriver, testType: "Driver", text: "Driver" },
    {
      testFile: fileTrafficBehavior,
      testType: "TrafficBehavior",
      text: "TrafficBehavior",
    },
    {
      testFile: fileTrafficDriver,
      testType: "TrafficDriver",
      text: "TrafficDriver",
    },
    {
      testFile: fileTrafficTemplate,
      testType: "TrafficTemplate",
      text: "TrafficTemplate",
    },
    {
      testFile: fileSavedSelections,
      testType: "SavedSelections",
      text: "SavedSelections",
    },
    { testFile: fileUserDriver, testType: "UserDriver", text: "UserDriver" },
    {
      testFile: fileSkc,
      testType: "SuspensionKinematics-skc",
      text: "SuspensionKinematics-skc",
    },
    {
      testFile: fileMbs,
      testType: "SuspensionKinematics-mbs",
      text: "SuspensionKinematics-mbs",
    },
    { testFile: fileADTF, testType: "ADTF", text: "ADTF" },
    { testFile: fileDataDict, testType: "DataDict", text: "DataDict" },
    { testFile: fileGPUConfig, testType: "GPUConfig", text: "GPUConfig" },
    {
      testFile: filePTBatteryBattECM,
      testType: "PTBattery-BattECM",
      text: "PTBattery-BattECM",
    },
    { testFile: fileAirBrake, testType: "AirBrake", text: "AirBrake" },
    { testFile: fileHydESP, testType: "HydESP", text: "HydESP" },
    { testFile: fileHydIPB, testType: "HydIPB", text: "HydIPB" },
    { testFile: fileSuspension, testType: "Suspension", text: "Suspension" },
    {
      testFile: fileSuspensionControl,
      testType: "SuspensionControl",
      text: "SuspensionControl",
    },
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
