import React from 'react';
import { Box, Typography, Chip, Button, Container } from '@mui/material';
import { Info, UserCheck, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner = () => {
  const { currentRole, setCurrentRole } = useApp();

  const roleLabels = {
    visitor: 'आम आगंतुक',
    customer: 'घर मालिक / ग्राहक',
    worker: 'कुशल कारीगर (राज मिस्त्री)',
    contractor: 'ठेकेदार (सिविल इंफ्रा)',
    supplier: 'निर्माण सामग्री सप्लायर',
    admin: 'प्लेटफार्म एडमिन'
  };

  return (
    <Box
      sx={{
        bgcolor: '#0B132B',
        color: '#E2E8F0',
        py: 0.75,
        px: 2,
        fontSize: '0.8rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            size="small"
            label="संस्थापक हेल्पलाइन"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: '#EA580C',
              color: '#FFF',
              letterSpacing: '0.05em'
            }}
          />
          <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 600, display: { xs: 'none', md: 'inline' } }}>
            मुख्य मालिक: <strong>अभिषेक मिश्रा (राका मिश्रा जी)</strong> | सीधा संपर्क: <a href="tel:+918739000333" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>+91 8739000333</a>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
            वर्तमान दृश्य:
          </Typography>
          <Chip
            size="small"
            icon={<UserCheck size={13} style={{ color: '#38BDF8' }} />}
            label={roleLabels[currentRole] || 'आम आगंतुक'}
            sx={{
              height: 22,
              fontSize: '0.72rem',
              fontWeight: 600,
              bgcolor: 'rgba(56, 189, 248, 0.12)',
              color: '#38BDF8',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}
          />
          <Button
            size="small"
            component="a"
            href="#/login"
            sx={{
              p: 0,
              minWidth: 'auto',
              color: '#F97316',
              fontSize: '0.72rem',
              textTransform: 'none',
              textDecoration: 'underline',
              '&:hover': { bgcolor: 'transparent', color: '#FB923C' }
            }}
          >
            भूमिका बदलें
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
