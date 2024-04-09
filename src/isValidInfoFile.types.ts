// isValidInfofile types
export type IsValidInfoFile = ({
  file,
}: {
  file: string;
  type:
    | "Vehicle"
    | "Car"
    | "Motorcycle"
    | "Truck"
    | "TestRun"
    | "Road"
    | "Trailer"
    | "Tire"
    | "Driver"
    | "TrafficBehavior"
    | "TrafficDriver"
    | "TrafficTemplate"
    | "SavedSelections"
    | "SuspensionKinematics-skc"
    | "SuspensionKinematics-mbs"
    | "ADTF"
    | "DataDict"
    | "GPUConfig"
    | "PTBattery-BattECM"
    | "AirBrake"
    | "HydESP"
    | "HydIPB"
    | "Suspension"
    | "SuspensionControl";
}) => boolean;
