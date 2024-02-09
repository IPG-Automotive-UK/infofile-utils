// get double types
type GetDoubleSingle = ({ file, key }: { file: string; key: string }) => number;
type GetDoubleMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: number }[];
export type GetDouble = GetDoubleSingle | GetDoubleMultiple;
