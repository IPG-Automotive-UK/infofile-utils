// get text types
type GetTextSingle = ({ file, key }: { file: string; key: string }) => string[];
type GetTextMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: string[] }[];
export type GetText = GetTextSingle | GetTextMultiple;
