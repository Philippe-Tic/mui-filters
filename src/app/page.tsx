import { FilterPage } from "@/pages/FilterPage";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function Home() {
  return (
    <Box minHeight="100vh" component="main">
      <CssBaseline />
      <FilterPage />
    </Box>
  );
}
