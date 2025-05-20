import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

export default function SignOutModal({ open, onClose }) {
  const handleSignOut = () => {
    if (onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'rgba(24,24,43,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(123,66,246,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          borderRadius: 3,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
        Sign Out
      </DialogTitle>
      <DialogContent sx={{ color: '#fff', textAlign: 'center', mb: 1 }}>
        Are you sure you want to sign out?
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.6)',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#ff5a5a',
              backgroundColor: 'rgba(255,90,90,0.1)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSignOut}
          variant="contained"
          color="error"
          sx={{
            ml: 1,
            px: 3,
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}
