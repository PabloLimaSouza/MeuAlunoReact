import * as React from 'react';
import { Box, CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
      <div className="Geral" style={{display: "block"}}>
    <Box>
      <CircularProgress />
    </Box>
    </div>
  );
}