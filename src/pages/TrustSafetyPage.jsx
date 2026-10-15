import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Divider, Alert } from '@mui/material';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileCheck,
  Scale,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrustSafetyPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<ShieldCheck size={16} color="#15803D" />}
            label="Integrity & Safety"
            sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700, mb: 1.5 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            Trust, Verification & Safety Policy
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            Building transparency and confidence in the Indian construction and skilled trades sector.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  The "Verified Badge" Policy
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 2 }}>
                At KaamSetu, the <strong>Verified Badge</strong> is never handed out automatically. When a worker, contractor, or supplier submits a registration form, their status defaults to <strong>"Pending Review"</strong>.
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                Our operations team verifies practical experience, past job photos, and telephone credentials before granting the verified mark. We strictly prohibit fake review generation and automated badge issuance.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={22} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Transparent Pricing & Wage Ethics
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 2 }}>
                We believe in fair daily wages for mistris and labourers. KaamSetu takes <strong>zero cut or deduction</strong> from daily wages paid by homeowners to workers.
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                Before starting construction or renovation, always agree on written measurement scopes, raw material responsibilities, and payment milestones to prevent mid-project misunderstandings.
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* Safety Guidelines Checklist */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 3 }}>
            Safety Best Practices for Customers & Contractors
          </Typography>

          <Grid container spacing={2}>
            {[
              { title: 'Site Inspection Before Milestone Payment', desc: 'Inspect structural brickwork, plumbing joints, and column alignment before releasing final wage payments.' },
              { title: 'Test Building Materials at Delivery', desc: 'Verify ISI marks on TMT sariya, check cement bag packaging dates (< 90 days from manufacture), and inspect aggregate cleanliness.' },
              { title: 'Personal Protective Equipment (PPE)', desc: 'Ensure shuttering carpenters, bar benders, and mistris wear safety helmets, gloves, and boots on active high-rise slabs.' },
              { title: 'Dispute Reporting Mechanism', desc: 'If a provider fails to turn up or delivers unsatisfactory work, contact the KaamSetu operational desk immediately.' }
            ].map((item, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #F1F5F9' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <CheckCircle2 size={16} color="#16A34A" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

      </Container>
    </Box>
  );
};
