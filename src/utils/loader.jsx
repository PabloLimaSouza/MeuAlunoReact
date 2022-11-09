import * as React from 'react';
import { Box, CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    //   <div className="Geral" style={{display: "block"}}>
    // <Box>
    //   <CircularProgress />
    // </Box>
    // </div>
    <div id="div-loading">
    <div id="loading-icon">
    <CircularProgress
    sx={{ color: '#fff' }} />
    <h4 id="loading-text">Aguarde...</h4>
    </div>
  
  </div> 
  );
}