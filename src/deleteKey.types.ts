// delete key types
type DeleteKeySingle = ({ file, key }: { file: string; key: string }) => {
  key: string;
  status: 0 | -1;
};
type DeleteKeyMultiple = ({ file, keys }: { file: string; keys: string[] }) => {
  keys: string;
  status: 0 | -1;
}[];
export type DeleteKey = DeleteKeySingle | DeleteKeyMultiple;
