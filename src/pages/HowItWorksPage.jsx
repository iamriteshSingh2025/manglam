import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Button, Divider } from '@mui/material';
import {
  Search,
  FileText,
  MessageSquare,
  ShieldCheck,
  HardHat,
  Truck,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="Marketplace Guide" sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1.5 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            How KaamSetu Connects Construction in India
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            A transparent, broker-free platform engineered specifically for homeowners, skilled mistris, building contractors, and material dealers.
          </Typography>
        </Box>

        {/* Section 1: For Homeowners & Customers */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                For Homeowners, Builders & Property Owners
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                How to find trusted mistris, contractors, and building materials
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. Select Trade or Post Requirement', desc: 'Browse our categorized directory of Raj Mistris, Electricians, Painters, Plumbers or submit a turnkey house construction requirement.' },
              { num: '2', title: '2. Review Profiles & Verification', desc: 'Inspect experience years, customer review track records, working radius, and admin verification badges.' },
              { num: '3', title: '3. Receive & Compare Quotations', desc: 'Vetted providers respond with competitive daily wage or contract estimates and schedule site visits.' },
              { num: '4', title: '4. Direct Agreement on Terms', desc: 'Finalize measurements, materials, and payment milestones directly with the provider without third-party commission deductions.' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Section 2: For Workers */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardHat size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                For Skilled Workers & Mistris
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Get regular work opportunities and connect with customers
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. Register Your Profile', desc: 'Submit your trade skill, years of experience, daily wage or contract preferences, and preferred working radius.' },
              { num: '2', title: '2. Admin Profile Review', desc: 'Our operational team reviews your credentials. Vetted workers receive the official KaamSetu Verified Badge.' },
              { num: '3', title: '3. Receive Local Job Alerts', desc: 'Get notified via SMS and portal when customers or contractors in your city post matching requirements.' },
              { num: '4', title: '4. Direct Payment & Retention', desc: 'Get paid 100% of your agreed wages directly from the customer. Zero middleman cuts or commissions.' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Section 3: For Material Suppliers */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#EFF6FF', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                For Building Material Dealerships & Suppliers
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Supply cement, steel, bricks, sand, and tiles directly to active sites
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. Onboard Your Dealership', desc: 'Register your business name, warehouse location, delivery radius, and material categories.' },
              { num: '2', title: '2. Publish Catalogue & MOQ', desc: 'Publish cement brands, TMT sariya sizes, sand, bricks, and minimum delivery quantities.' },
              { num: '3', title: '3. Receive Site Inquiries', desc: 'Builders, contractors, and individuals submit purchase enquiries for immediate dispatch.' },
              { num: '4', title: '4. Deliver & Grow Turnover', desc: 'Quote daily mandi rates, dispatch truckloads, and build long-term repeat client relationships.' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Disclaimer */}
        <Alert severity="warning" icon={<AlertCircle size={20} />} sx={{ borderRadius: 3 }}>
          <strong>Platform Role Disclaimer:</strong> KaamSetu operates strictly as a discovery and matching ecosystem. Final wage terms, scope boundaries, material delivery logistics, and safety protocols must be mutually agreed between parties.
        </Alert>

      </Container>
    </Box>
  );
};
