// set double types
type SetDoubleSingle = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: number };
}) => 0 | -1;
type SetDoubleMultiple = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: number }[];
}) => { keys: string; status: 0 | -1 }[];
export type SetDouble = SetDoubleSingle | SetDoubleMultiple;
