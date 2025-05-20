import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

export default function LoginModal({ open, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        Log In
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                input: { color: '#fff' }
              }
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                input: { color: '#fff' }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              color: '#fff',
              px: 4,
              borderRadius: '16px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(90deg, #5B3CFF 0%, #00ffc6 100%)'
              }
            }}
          >
            Log In
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
