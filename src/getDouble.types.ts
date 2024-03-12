// get double types
type GetDoubleSingle = ({
  file,
  keys,
}: {
  file: string;
  keys: string;
}) => number;
type GetDoubleMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: number }[];
export type GetDouble = GetDoubleSingle | GetDoubleMultiple;
