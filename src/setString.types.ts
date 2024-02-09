// set string types
type SetStringSingle = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: string };
}) => 0 | -1;
type SetStringMultiple = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: string }[];
}) => { keys: string; status: 0 | -1 }[];
export type SetString = SetStringSingle | SetStringMultiple;
