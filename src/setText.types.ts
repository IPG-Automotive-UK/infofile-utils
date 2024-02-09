// set text types
type SetTextSingle = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: string };
}) => 0 | -1;
type SetTextMultiple = ({
  file,
  values,
}: {
  file: string;
  values: { keys: string; value: string[] }[];
}) => { keys: string; status: 0 | -1 }[];
export type SetText = SetTextSingle | SetTextMultiple;
