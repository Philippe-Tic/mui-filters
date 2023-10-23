import { OptionProps, SelectProps } from "@/types/select";
import {
  Box,
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from "@mui/material";
import { FC } from "react";

export const Select: FC<SelectProps> = ({
  value,
  handleChange,
  label,
  options,
  ...rest
}) => (
  <Box minWidth="8rem" {...rest}>
    <FormControl fullWidth>
      <InputLabel id={`select--label-${label}`}>{label}</InputLabel>
      <MUISelect
        labelId={`select-label-${label}`}
        id={`select-${label}`}
        value={value.toString()}
        label={label}
        onChange={handleChange}
      >
        {options.map((option: OptionProps) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  </Box>
);
