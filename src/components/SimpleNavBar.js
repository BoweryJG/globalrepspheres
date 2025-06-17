import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InsightsIcon from '@mui/icons-material/Insights';
import MemoryIcon from '@mui/icons-material/Memory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../contexts/SimpleAuthContext';

// Simple navigation without cross-domain auth
const SimpleNavBar = () => {
  const { user, signOut } = useAuth();

  // External app links - each handles its own auth
  const externalApps = [
    {
      label: 'Market Data',
      href: 'https://market.repspheres.com/',
      icon: <InsightsIcon sx={{ fontSize: 20 }} />,
      color: '#00ffc6'
    },
    {
      label: 'Canvas',
      href: 'https://canvas.repspheres.com/',
      icon: <MemoryIcon sx={{ fontSize: 20 }} />,
      color: '#00d4ff'
    },
    {
      label: 'CRM',
      href: 'https://crm.repspheres.com/',
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      color: '#7B42F6'
    }
  ];

  return (
    <AppBar position="fixed" sx={{ 
      background: 'rgba(20,14,38,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(123,66,246,0.2)'
    }}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Rep<Box component="span" sx={{ color: '#00ffc6' }}>Spheres</Box>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* External App Links */}
        <Box sx={{ display: 'flex', gap: 2, mr: 4 }}>
          {externalApps.map((app) => (
            <Button
              key={app.label}
              component="a"
              href={app.href}
              target="_self"
              startIcon={app.icon}
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiSvgIcon-root': {
                    color: app.color
                  }
                }
              }}
            >
              {app.label}
            </Button>
          ))}
        </Box>

        {/* Local Auth Only */}
        {user ? (
          <Button
            onClick={signOut}
            sx={{ color: '#fff' }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ 
              borderColor: '#00ffc6',
              color: '#00ffc6',
              '&:hover': {
                borderColor: '#00ffc6',
                backgroundColor: 'rgba(0,255,198,0.1)'
              }
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SimpleNavBar;