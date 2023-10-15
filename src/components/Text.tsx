import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const Text: FC<TypographyProps> = ({ children, ...rest }) => {
  return (
    <Typography paragraph {...rest}>
      <span>{children}</span>
    </Typography>
  );
};
