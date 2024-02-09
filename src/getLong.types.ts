// get long types
type GetLongSingle = ({ file, key }: { file: string; key: string }) => number;
type GetLongMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: number }[];
export type GetLong = GetLongSingle | GetLongMultiple;
