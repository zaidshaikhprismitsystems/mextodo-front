import { IconButton } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export default function SanckBarComponent({open, message}: any) {
    const [sopen, setsOpen] = React.useState(open);
  
    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      setsOpen(false);
    };

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