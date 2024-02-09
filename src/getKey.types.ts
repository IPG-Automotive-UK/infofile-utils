// / get key types
export type GetKey = ({
  file,
  prefix,
}: {
  file: string;
  prefix?: string | string[];
}) => string[];
