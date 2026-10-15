import React from 'react';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <ShieldCheck size={28} color="#EA580C" />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Privacy & Data Policy
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
            Last Updated: October 2026 • KaamSetu Privacy Governance
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            1. Information Collection & Usage
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            We only collect information necessary to facilitate construction and trade matching — such as your contact name, telephone number, city, locality, and project scope details. We do not sell your personal contact numbers to unvetted third-party telemarketers.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            2. Worker Data Protection
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            Workers' sensitive personal documents collected during optional verification checks are kept encrypted in restricted admin access environments. Public worker profiles only display practical experience, skill badges, and contact routing numbers.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            3. Communications & Consent
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
            By submitting a construction requirement or registering as a provider, you consent to receive direct telephone calls, SMS alerts, and quotation updates regarding your active project inquiries.
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};
