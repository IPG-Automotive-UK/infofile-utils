// get string types
type GetStringSingle = ({ file, key }: { file: string; key: string }) => string;
type GetStringMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: string }[];
export type GetString = GetStringSingle | GetStringMultiple;
