// get value types
type GetValueSingle = ({ file, keys }: { file: string; keys: string }) => {
  keys: string;
  value: string | string[] | number | [number, number, number] | number[][];
};
type GetValueMultiple = ({ file, keys }: { file: string; keys: string[] }) => {
  keys: string;
  value: string | string[] | number | [number, number, number] | number[][];
}[];
export type GetValue = GetValueSingle | GetValueMultiple;
