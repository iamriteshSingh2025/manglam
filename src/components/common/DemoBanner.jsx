import React from 'react';
import { Box, Typography, Chip, Button, Container } from '@mui/material';
import { UserCheck, PhoneCall, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner = () => {
  const { currentRole, setCurrentRole } = useApp();

  const roleLabels = {
    visitor: 'आम आगंतुक',
    customer: 'घर मालिक / ग्राहक',
    worker: 'कुशल कारीगर (राज मिस्त्री)',
    contractor: 'सिविल ठेकेदार',
    supplier: 'सामग्री सप्लायर',
    admin: 'प्लेटफॉर्म एडमिन'
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(90deg, #090E17 0%, #0F172A 50%, #172554 100%)',
        color: '#E2E8F0',
        py: 0.8,
        px: 2,
        fontSize: '0.8rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Chip
            size="small"
            label="संस्थापक हेल्पलाइन"
            icon={<ShieldCheck size={12} color="#FFF" />}
            sx={{
              height: 22,
              fontSize: '0.68rem',
              fontWeight: 800,
              bgcolor: '#EA580C',
              color: '#FFF',
              letterSpacing: '0.03em'
            }}
          />
          <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 600, display: { xs: 'none', md: 'inline' } }}>
            मुख्य संस्थापक: <strong>अभिषेक मिश्रा (राका भैया)</strong> | सीधी सहायता: <a href="tel:+918739000333" style={{ color: '#FFFFFF', textDecoration: 'underline', fontWeight: 700 }}>+91 8739000333</a>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
            वर्तमान दृश्य:
          </Typography>
          <Chip
            size="small"
            icon={<UserCheck size={13} style={{ color: '#38BDF8' }} />}
            label={roleLabels[currentRole] || 'आम आगंतुक'}
            sx={{
              height: 22,
              fontSize: '0.72rem',
              fontWeight: 700,
              bgcolor: 'rgba(56, 189, 248, 0.14)',
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
              color: '#FED7AA',
              textDecoration: 'underline',
              fontSize: '0.74rem',
              fontWeight: 700,
              '&:hover': { color: '#FFF', bgcolor: 'transparent' }
            }}
          >
            भूमिका बदलें
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
