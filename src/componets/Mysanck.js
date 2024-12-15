import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function Mysanck({open , Message}) {

 

  
  const action = (
    <React.Fragment>
    
      <IconButton
        size="small"
        aria-label="close"
        severity="success"
 sx={{ paddingLeft:20,fontSize:30 }}
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div style={{  }}>
    <Snackbar open={open} >
  <Alert 
    severity="success"
    variant="filled"
    sx={{  fontSize:"25px", display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center" }}
  >
{Message}
  </Alert>
</Snackbar>
    </div>
  );
}
