import theme from "@/utils/theme";
import { Backdrop, CircularProgress } from "@mui/material";

export function Loader({open}: {open: boolean}) {
  return <Backdrop sx={{ zIndex: theme.zIndex.drawer + 1 }} open={open}>
    <CircularProgress size='30vh' />
  </Backdrop>
}