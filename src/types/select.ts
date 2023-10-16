import { BoxProps, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface OptionProps {
  label: string | boolean | ReactNode;
  value: string;
  type?: string;
}

export type SelectProps = BoxProps & {
  value?: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  label: string | ReactNode;
  options: Array<OptionProps>;
};
