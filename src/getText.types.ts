// get text types
type GetTextSingle = ({
  file,
  keys,
}: {
  file: string;
  keys: string;
}) => string[];
type GetTextMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; value: string[] }[];
export type GetText = GetTextSingle | GetTextMultiple;
