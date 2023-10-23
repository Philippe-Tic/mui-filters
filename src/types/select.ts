import { ValueType } from "@/types/products";
import { BoxProps, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface OptionProps {
  label: string | boolean | ReactNode;
  value: string;
  type?: "string" | "number" | "boolean";
}

export type SelectProps = BoxProps & {
  value: ValueType;
  handleChange: (event: SelectChangeEvent<string>) => void;
  label: string | ReactNode;
  options: Array<Omit<OptionProps, "type">>;
};
