// get key kind types
type GetKeyKindSingle = ({
  file,
  keys,
}: {
  file: string;
  keys: string;
}) => "String_Key" | "Text_Key" | "No_Key";
type GetKeyKindMultiple = ({
  file,
  keys,
}: {
  file: string;
  keys: string[];
}) => { key: string; keyKind: "String_Key" | "Text_Key" | "No_Key" }[];
export type GetKeyKind = GetKeyKindSingle | GetKeyKindMultiple;
