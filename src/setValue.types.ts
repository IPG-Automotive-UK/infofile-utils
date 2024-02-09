// set value types
type SetValueSingle = ({
  file,
  values,
}: {
  file: string;
  values: {
    keys: string;
    value: string | string[] | number | [number, number, number] | number[][];
  };
}) => {
  keys: string;
  status: 0 | -1;
};
type SetValueMultiple = ({
  file,
  values,
}: {
  file: string;
  values: {
    keys: string;
    value: string | string[] | number | [number, number, number] | number[][];
  }[];
}) => { keys: string; status: 0 | -1 }[];
export type SetValue = SetValueSingle | SetValueMultiple;
