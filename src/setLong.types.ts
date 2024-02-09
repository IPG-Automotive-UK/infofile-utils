// set long types
type SetLongSingle = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: number };
}) => 0 | -1;
type SetLongMultiple = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: number }[];
}) => { keys: string; status: 0 | -1 }[];
export type SetLong = SetLongSingle | SetLongMultiple;
