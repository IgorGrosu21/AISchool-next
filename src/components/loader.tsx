import { Backdrop, CircularProgress } from "@mui/material";

export function Loader({open}: {open: boolean}) {
  return <Backdrop sx={{ zIndex: 1500 }} open={open}>
    <CircularProgress size='30vh' />
  </Backdrop>
}