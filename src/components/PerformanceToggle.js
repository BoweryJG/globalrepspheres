import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SpeedIcon from '@mui/icons-material/Speed';
import BoltIcon from '@mui/icons-material/Bolt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StarIcon from '@mui/icons-material/Star';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';

const PERFORMANCE_MODES = {
  ultra: {
    name: 'Ultra',
    icon: <BoltIcon />,
    description: 'Maximum visual quality',
    settings: {
      stars: true,
      orbs: true,
      particles: true,
      quality: 'ultra'
    }
  },
  balanced: {
    name: 'Balanced',
    icon: <SpeedIcon />,
    description: 'Good visuals & performance',
    settings: {
      stars: true,
      orbs: true,
      particles: false,
      quality: 'medium'
    }
  },
  performance: {
    name: 'Performance',
    icon: <PowerSettingsNewIcon />,
    description: 'Smooth on any device',
    settings: {
      stars: false,
      orbs: true,
      particles: false,
      quality: 'low'
    }
  }
};

export default function PerformanceToggle() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState('balanced');
  const [showStars, setShowStars] = useState(true);
  const [showOrbs, setShowOrbs] = useState(true);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
    const settings = PERFORMANCE_MODES[newMode].settings;
    
    // Apply settings
    setShowStars(settings.stars);
    setShowOrbs(settings.orbs);
    
    // Save to localStorage
    localStorage.setItem('performanceMode', newMode);
    localStorage.setItem('performanceSettings', JSON.stringify(settings));
    
    // Dispatch event for components to react
    window.dispatchEvent(new CustomEvent('performanceSettingsChanged', {
      detail: settings
    }));
    
    handleClose();
  };
  
  const toggleStars = () => {
    const newValue = !showStars;
    setShowStars(newValue);
    
    // Update custom mode
    if (mode !== 'custom') {
      setMode('custom');
    }
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('performanceSettingsChanged', {
      detail: { stars: newValue }
    }));
  };
  
  const toggleOrbs = () => {
    const newValue = !showOrbs;
    setShowOrbs(newValue);
    
    // Update custom mode
    if (mode !== 'custom') {
      setMode('custom');
    }
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('performanceSettingsChanged', {
      detail: { orbs: newValue }
    }));
  };
  
  // Load saved settings
  useEffect(() => {
    const savedMode = localStorage.getItem('performanceMode');
    const savedSettings = localStorage.getItem('performanceSettings');
    
    if (savedMode && PERFORMANCE_MODES[savedMode]) {
      setMode(savedMode);
      const settings = PERFORMANCE_MODES[savedMode].settings;
      setShowStars(settings.stars);
      setShowOrbs(settings.orbs);
    } else if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setShowStars(settings.stars ?? true);
        setShowOrbs(settings.orbs ?? true);
        setMode('custom');
      } catch (e) {
        console.error('Failed to parse performance settings');
      }
    }
  }, []);
  
  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 60,
          right: 16,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          },
          zIndex: 1000,
        }}
      >
        <TuneIcon />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(20, 20, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: 280,
          }
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" color="text.secondary">
            Performance Mode
          </Typography>
        </MenuItem>
        
        {Object.entries(PERFORMANCE_MODES).map(([key, config]) => (
          <MenuItem
            key={key}
            onClick={() => handleModeChange(key)}
            selected={mode === key}
          >
            <ListItemIcon>
              {config.icon}
            </ListItemIcon>
            <ListItemText 
              primary={config.name}
              secondary={config.description}
            />
          </MenuItem>
        ))}
        
        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <MenuItem disabled>
          <Typography variant="subtitle2" color="text.secondary">
            Custom Settings
          </Typography>
        </MenuItem>
        
        <MenuItem onClick={toggleStars}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Starry Background"
            secondary={showStars ? 'Enabled' : 'Disabled'}
          />
        </MenuItem>
        
        <MenuItem onClick={toggleOrbs}>
          <ListItemIcon>
            <BlurCircularIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Animated Orbs"
            secondary={showOrbs ? 'Enabled' : 'Disabled'}
          />
        </MenuItem>
      </Menu>
    </>
  );
}