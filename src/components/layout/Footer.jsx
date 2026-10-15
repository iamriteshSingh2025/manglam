import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Divider, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  HardHat,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#0B132B', color: '#CBD5E1', pt: 8, pb: 4, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          
          {/* Brand Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HardHat size={24} color="#FFFFFF" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Kaam<span style={{ color: '#EA580C' }}>Setu</span>
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#F97316', fontWeight: 600, mb: 1, fontSize: '0.92rem' }}>
              “Kaam Karne Walon Ko Kaam, Har Ghar Ko Vishwas.”
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2.5, lineHeight: 1.6 }}>
              India’s dedicated marketplace connecting skilled mistris, construction contractors, homeowners, and building material suppliers on one transparent platform.
            </Typography>

            <Box sx={{ p: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', borderRadius: 2.5, border: '1px solid rgba(234, 88, 12, 0.3)', mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, display: 'block', mb: 0.5 }}>
                Main Owner & Managing Founder:
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 800 }}>
                Abhishek Mishra (Raka Mishra ji)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
                <Phone size={15} color="#EA580C" />
                <a href="tel:+918739000333" style={{ color: '#FED7AA', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'underline' }}>
                  +91 8739000333
                </a>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.85rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <MapPin size={16} color="#EA580C" />
                <span>Head Office: Hazratganj / Cyber City, India</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <Phone size={16} color="#EA580C" />
                <span>Director Helpline: <a href="tel:+918739000333" style={{ color: '#FFF' }}>+91 8739000333</a></span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <Mail size={16} color="#EA580C" />
                <span>Support: support@kaamsetu.demo</span>
              </Box>
            </Box>
          </Grid>

          {/* Column 2: Marketplace Discovery */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Marketplace
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.88rem' }}>
              <MuiLink component={Link} to="/workers" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Find Skilled Workers
              </MuiLink>
              <MuiLink component={Link} to="/services" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Construction Services
              </MuiLink>
              <MuiLink component={Link} to="/materials" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Building Materials
              </MuiLink>
              <MuiLink component={Link} to="/post-requirement" sx={{ color: '#EA580C', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                Post Requirement
              </MuiLink>
              <MuiLink component={Link} to="/how-it-works" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                How It Works
              </MuiLink>
            </Box>
          </Grid>

          {/* Column 3: For Workers & Contractors */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              For Providers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.88rem' }}>
              <MuiLink component={Link} to="/register-worker" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Register as Worker
              </MuiLink>
              <MuiLink component={Link} to="/register-contractor" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Contractor Onboarding
              </MuiLink>
              <MuiLink component={Link} to="/register-supplier" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Register as Supplier
              </MuiLink>
              <MuiLink component={Link} to="/dashboard/worker" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Worker Dashboard
              </MuiLink>
              <MuiLink component={Link} to="/dashboard/supplier" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Supplier Dashboard
              </MuiLink>
            </Box>
          </Grid>

          {/* Column 4: Trust & Transparency */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Trust, Safety & Governance
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#10B981' }}>
                <ShieldCheck size={18} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Admin Profile Verification Policy
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', lineHeight: 1.5 }}>
                Verified badges are only awarded after thorough credential & work review by the KaamSetu operational desk. We never auto-verify profiles.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, fontSize: '0.82rem' }}>
              <MuiLink component={Link} to="/trust-safety" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Trust Guidelines
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/terms" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Terms & Conditions
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/privacy" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Privacy Policy
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/contact" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                Report a Dispute
              </MuiLink>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Regulatory & Platform Notice */}
        <Box sx={{ p: 2, bgcolor: 'rgba(234, 88, 12, 0.06)', borderRadius: 2, border: '1px dashed rgba(234, 88, 12, 0.25)', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <AlertCircle size={18} color="#EA580C" style={{ marginTop: 2, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
              <strong>Fair Practice Notice:</strong> KaamSetu operates as a direct discovery and workflow marketplace. KaamSetu does not own construction equipment, employ site labourers, or warehouse building materials directly. All contractual scopes, final rates, delivery logistics, and quality milestones are mutually settled directly between customers, workers, contractors, and suppliers.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © {new Date().getFullYear()} KaamSetu Technologies India. All rights reserved. (Demo Prototype)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink component={Link} to="/dashboard/admin" sx={{ color: '#F97316', fontSize: '0.78rem', textDecoration: 'underline' }}>
              Platform Admin Portal
            </MuiLink>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};
