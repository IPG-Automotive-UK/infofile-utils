const { isValidInfoFile } = require("../isValidInfoFile");
const path = require("path");

// get the path to the test car info file CM10+
const relativePathCarInfoFile = "./infofiles/DemoCar";
const fileCar = path.resolve(__dirname, relativePathCarInfoFile);

// get the path to the test car info file CM9
const relativePathCarInfoFileCM9 = "./infofiles/DemoCar_CM9";
const fileCarCM9 = path.resolve(__dirname, relativePathCarInfoFileCM9);

// get the path to the test motorcycle info file CM10+
const relativePathMotorcycleInfoFile = "./infofiles/DemoMC_LinearMotorcycle";
const fileMotorcycle = path.resolve(__dirname, relativePathMotorcycleInfoFile); // get the path to the test motorcycle info file

// get the path to the test motorcycle info file CM9
const relativePathMotorcycleInfoFileCM9 =
  "./infofiles/DemoMC_LinearMotorcycle_CM9";
const fileMotorcycleCM9 = path.resolve(
  __dirname,
  relativePathMotorcycleInfoFileCM9
);

// get the path to the test truck info file CM10+
const relativePathTruckInfoFile = "./infofiles/Demo3AxleCoachTruck";
const fileTruck = path.resolve(__dirname, relativePathTruckInfoFile);

// get the path to the test truck info file CM9
const relativePathTruckInfoFileCM9 = "./infofiles/Demo3AxleCoachTruck_CM9";
const fileTruckCM9 = path.resolve(__dirname, relativePathTruckInfoFileCM9);

// get the path to the test truck info file CM10+
const relativePathTestRunInfoFile = "./infofiles/BackAndForthTestRun";
const fileTestRun = path.resolve(__dirname, relativePathTestRunInfoFile);

// get the path to the test truck info file CM9
const relativePathTestRunInfoFileCM9 = "./infofiles/BackAndForthTestRun_CM9";
const fileTestRunCM9 = path.resolve(__dirname, relativePathTestRunInfoFileCM9);

// get the path to the road info file
const relativePathRoadInfoFile = "./infofiles/DEU_Hockenheim.rd5";
const fileRoad = path.resolve(__dirname, relativePathRoadInfoFile);

// get the path to the road info file CM9
const relativePathRoadInfoFileCM9 = "./infofiles/DEU_Hockenheim_CM9.rd5";
const fileRoadCM9 = path.resolve(__dirname, relativePathRoadInfoFileCM9);

// get the path to the test trailer info file CM10+
const relativePathTrailerInfoFile = "./infofiles/Trailer";
const fileTrailer = path.resolve(__dirname, relativePathTrailerInfoFile);

// get the path to the test trailer info file CM9
const relativePathTrailerInfoFileCM9 = "./infofiles/Trailer_CM9";
const fileTrailerCM9 = path.resolve(__dirname, relativePathTrailerInfoFileCM9);

// get the path to the test tire info file
const relativePathTireInfoFile = "./infofiles/DT_CM4SL_UserTire";
const fileTire = path.resolve(__dirname, relativePathTireInfoFile);

// get the path to the test ego vehicle's driver info file CM10+
const relativePathDriverInfoFile = "./infofiles/Car_Aggressive";
const fileDriver = path.resolve(__dirname, relativePathDriverInfoFile);

// get the path to the test ego vehicle's driver info file CM9
const relativePathDriverInfoFileCM9 = "./infofiles/Car_Aggressive_CM9";
const fileDriverCM9 = path.resolve(__dirname, relativePathDriverInfoFileCM9);

// get the path to the test traffic behavior info file CM10+
const relativePathTrafficBehaviorInfoFile =
  "./infofiles/DefaultTrafficBehavior";
const fileTrafficBehavior = path.resolve(
  __dirname,
  relativePathTrafficBehaviorInfoFile
);

// get the path to the test traffic behavior info fileCM9
const relativePathTrafficBehaviorInfoFileCM9 =
  "./infofiles/DefaultTrafficBehavior_CM9";
const fileTrafficBehaviorCM9 = path.resolve(
  __dirname,
  relativePathTrafficBehaviorInfoFileCM9
);

// get the path to the test traffic driver info file CM10+
const relativePathTrafficDriverInfoFile =
  "./infofiles/Traffic_Car_Generic_Aggressive";
const fileTrafficDriver = path.resolve(
  __dirname,
  relativePathTrafficDriverInfoFile
);

// get the path to the test traffic driver info file CM9
const relativePathTrafficDriverInfoFileCM9 =
  "./infofiles/Traffic_Car_Generic_Aggressive_CM9";
const fileTrafficDriverCM9 = path.resolve(
  __dirname,
  relativePathTrafficDriverInfoFileCM9
);

// get the path to the test traffic template info file CM10+
const relativePathTrafficTemplateInfoFile = "./infofiles/IPG_CompanyCar_2018";
const fileTrafficTemplate = path.resolve(
  __dirname,
  relativePathTrafficTemplateInfoFile
);

// get the path to the test traffic template info file
const relativePathTrafficTemplateInfoFileCM9 =
  "./infofiles/IPG_CompanyCar_2018_CM9";
const fileTrafficTemplateCM9 = path.resolve(
  __dirname,
  relativePathTrafficTemplateInfoFileCM9
);

// get the path to the test saved selections info file CM10+
const relativePathSavedSelectionsInfoFile = "./infofiles/SavedSelections";
const fileSavedSelections = path.resolve(
  __dirname,
  relativePathSavedSelectionsInfoFile
);

// get the path to the test saved selections info file CM9
const relativePathSavedSelectionsInfoFileCM9 =
  "./infofiles/SavedSelections_CM9";
const fileSavedSelectionsCM9 = path.resolve(
  __dirname,
  relativePathSavedSelectionsInfoFileCM9
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

// get the path to the test PTBattery-BattECM info file CM10+
const relativePathPTBatteryBattECMInfoFile = "./infofiles/BattECM_basic";
const filePTBatteryBattECM = path.resolve(
  __dirname,
  relativePathPTBatteryBattECMInfoFile
);

// get the path to the test PTBattery-BattECM info file CM9
const relativePathPTBatteryBattECMInfoFileCM9 = "./infofiles/BattECM_basic_CM9";
const filePTBatteryBattECMCM9 = path.resolve(
  __dirname,
  relativePathPTBatteryBattECMInfoFileCM9
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
    { testFile: fileCarCM9, testType: "Vehicle", text: "CarCM9" },
    { testFile: fileMotorcycle, testType: "Vehicle", text: "Motorcycle" },
    { testFile: fileMotorcycleCM9, testType: "Vehicle", text: "MotorcycleCM9" },
    { testFile: fileTruck, testType: "Vehicle", text: "Truck" },
    { testFile: fileTruckCM9, testType: "Vehicle", text: "TruckCM9" },
    { testFile: fileCar, testType: "Car", text: "Car" },
    { testFile: fileCarCM9, testType: "Car", text: "CarCM9" },
    { testFile: fileMotorcycle, testType: "Motorcycle", text: "Motorcycle" },
    {
      testFile: fileMotorcycleCM9,
      testType: "Motorcycle",
      text: "MotorcycleCM9",
    },
    { testFile: fileTruck, testType: "Truck", text: "Truck" },
    { testFile: fileTruckCM9, testType: "Truck", text: "TruckCM9" },
    { testFile: fileTestRun, testType: "TestRun", text: "TestRun" },
    { testFile: fileTestRunCM9, testType: "TestRun", text: "TestRunCM9" },
    { testFile: fileRoad, testType: "Road", text: "Road" },
    { testFile: fileRoadCM9, testType: "Road", text: "RoadCM9" },
    { testFile: fileTrailer, testType: "Trailer", text: "Trailer" },
    { testFile: fileTrailerCM9, testType: "Trailer", text: "TrailerCM9" },
    { testFile: fileTire, testType: "Tire", text: "Tire" },
    { testFile: fileDriver, testType: "Driver", text: "Driver" },
    { testFile: fileDriverCM9, testType: "Driver", text: "DriverCM9" },
    {
      testFile: fileTrafficBehavior,
      testType: "TrafficBehavior",
      text: "TrafficBehavior",
    },
    {
      testFile: fileTrafficBehaviorCM9,
      testType: "TrafficBehavior",
      text: "TrafficBehaviorCM9",
    },
    {
      testFile: fileTrafficDriver,
      testType: "TrafficDriver",
      text: "TrafficDriver",
    },
    {
      testFile: fileTrafficDriverCM9,
      testType: "TrafficDriver",
      text: "TrafficDriverCM9",
    },
    {
      testFile: fileTrafficTemplate,
      testType: "TrafficTemplate",
      text: "TrafficTemplate",
    },
    {
      testFile: fileTrafficTemplateCM9,
      testType: "TrafficTemplate",
      text: "TrafficTemplateCM9",
    },
    {
      testFile: fileSavedSelections,
      testType: "SavedSelections",
      text: "SavedSelections",
    },
    {
      testFile: fileSavedSelectionsCM9,
      testType: "SavedSelections",
      text: "SavedSelectionsCM9",
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
    {
      testFile: filePTBatteryBattECMCM9,
      testType: "PTBattery-BattECM",
      text: "PTBattery-BattECM_CM9",
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
