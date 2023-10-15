import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface OptionProps {
  label: string | ReactNode;
  value: string;
}

export type SelectProps = {
  value: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  label: string;
  options: Array<OptionProps>;
};
