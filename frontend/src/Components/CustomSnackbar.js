import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const CustomSnackbar = ({ open, handleClose, message, icon: Icon, backgroundColor, color }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {Icon && <Icon style={{ marginRight: 8 }} />}
            {message}
          </span>
        }
        style={{
          backgroundColor: backgroundColor || 'green',
          color: color || 'white',
          fontWeight: 'bold',
        }}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;