import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * InfoModal - reusable modal component with RepSpheres styling
 *
 * Props:
 *  - open: boolean to control visibility
 *  - onClose: function to close the modal
 *  - title: title text for the modal
 *  - children: content of the modal
 */
export default function InfoModal({ open, onClose, title, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(20,14,38,0.96)',
          border: '1px solid rgba(123,66,246,0.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          borderRadius: 3,
          color: '#fff',
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
