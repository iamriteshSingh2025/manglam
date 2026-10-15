import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Users, Hammer, PlusCircle, Package, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav = ({ onOpenPostModal }) => {
  const location = useLocation();
  const { currentRole } = useApp();

  const getDashboardPath = () => {
    if (currentRole === 'visitor') return '/login';
    if (currentRole === 'admin') return '/dashboard/admin';
    if (currentRole === 'worker') return '/dashboard/worker';
    if (currentRole === 'contractor') return '/dashboard/contractor';
    if (currentRole === 'supplier') return '/dashboard/supplier';
    return '/dashboard/customer';
  };

  const navItems = [
    { label: 'Workers', icon: Users, path: '/workers' },
    { label: 'Services', icon: Hammer, path: '/services' },
    { label: 'Post', icon: PlusCircle, isCta: true },
    { label: 'Materials', icon: Package, path: '/materials' },
    { label: 'Dashboard', icon: LayoutDashboard, path: getDashboardPath() },
  ];

  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: '#0F172A',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        height: 64,
        px: 1,
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        if (item.isCta) {
          return (
            <Box
              key={item.label}
              onClick={onOpenPostModal || (() => {})}
              component={Link}
              to={onOpenPostModal ? undefined : '/post-requirement'}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                mt: -2.5,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.6)',
                  border: '3px solid #0F172A',
                }}
              >
                <PlusCircle size={26} color="#FFFFFF" strokeWidth={2.5} />
              </Box>
              <Typography variant="caption" sx={{ color: '#EA580C', fontWeight: 700, fontSize: '0.68rem', mt: 0.25 }}>
                Post Req
              </Typography>
            </Box>
          );
        }

        return (
          <Box
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              flex: 1,
              py: 0.5,
            }}
          >
            <Icon size={20} color={isActive ? '#EA580C' : '#94A3B8'} strokeWidth={isActive ? 2.4 : 1.8} />
            <Typography
              variant="caption"
              sx={{
                color: isActive ? '#EA580C' : '#94A3B8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.68rem',
                mt: 0.3,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
};
