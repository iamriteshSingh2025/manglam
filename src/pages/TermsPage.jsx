import React from 'react';
import { Box, Container, Typography, Paper, Divider, Alert } from '@mui/material';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <FileText size={28} color="#EA580C" />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Terms & Conditions
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
            Last Updated: October 2026 • KaamSetu Marketplace Terms of Use
          </Typography>

          <Alert severity="warning" sx={{ mb: 4, borderRadius: 2.5 }}>
            <strong>Important Operational Notice:</strong> KaamSetu is a technology communication bridge connecting skilled workers, contractors, material suppliers, and customers. KaamSetu is not an employer, general contractor, or building materials warehouse.
          </Alert>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            1. Nature of the Marketplace
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            KaamSetu facilitates introductions, quotation exchanges, and portfolio displays between property owners (Customers) and independent trade service providers (Raj Mistris, Carpenters, Electricians, Plumbers, Contractors, and Building Material Suppliers). All final contracts, work orders, payment schedules, and performance standards are solely agreed between the respective parties.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            2. Worker & Provider Status
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            Skilled workers and contractors listed on the platform are independent professionals or business entities and are not employees, agents, or joint venture partners of KaamSetu. While KaamSetu verifies identities and references before issuing verification badges, customers are advised to inspect physical credentials and past sites.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            3. Pricing, Mandi Rates & Material Delivery
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            Prices listed for building materials (such as cement, TMT sariya, sand, and aggregates) are indicative or subject to live mandi quotes. Final delivered prices, unloading charges, and vehicle access terms are set directly by the authorized supplier dealership.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
            KaamSetu shall not be liable for any structural defects, work delays, site accidents, or contractual disputes occurring at individual construction sites. Users agree to resolve disputes amicably or through relevant civil remedies.
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};
