// get long types
type GetLongSingle = ({ file, keys }: { file: string; keys: string }) => number;
type GetLongMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: number }[];
export type GetLong = GetLongSingle | GetLongMultiple;
