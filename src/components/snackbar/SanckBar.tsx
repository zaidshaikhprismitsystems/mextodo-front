import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React from 'react';

export default function SanckBarComponent({open, message}: any) {
    const [sopen, setsOpen] = React.useState(open);
  
    const handleClose = (
      _: React.SyntheticEvent | Event, // Removed unused 'event'
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      setsOpen(false);
    };

    const action = null; // Replace with the actual implementation if needed

    return (
      <div>
        <Snackbar
          open={sopen}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </div>
    );
  }