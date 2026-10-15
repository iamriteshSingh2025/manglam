import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Building2, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const ContractorRegistrationPage = () => {
  const navigate = useNavigate();
  const { addContractor, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobile: '',
    city: 'Lucknow',
    serviceArea: 'Lucknow, Barabanki, Unnao',
    teamSize: '25-40 Workers',
    servicesOfferedText: 'New House Construction, Turnkey Civil Projects, RCC Framing',
    projectTypeText: 'Residential Duplex, Commercial Plazas',
    description: ''
  });

  const [registered, setRegistered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactPerson || !formData.mobile) {
      alert('Please fill business name, contact person, and mobile number.');
      return;
    }

    const servicesOffered = formData.servicesOfferedText.split(',').map(s => s.trim()).filter(Boolean);
    const projectType = formData.projectTypeText.split(',').map(s => s.trim()).filter(Boolean);

    const created = addContractor({
      ...formData,
      servicesOffered,
      projectType
    });

    setRegistered(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: '#0F172A', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Building2 size={28} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Contractor & Construction Team Onboarding
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
            Register your contracting firm to receive commercial and residential tenders, turnkey project leads, and post bulk labour requirements.
          </Typography>
        </Box>

        {registered ? (
          <Paper sx={{ p: 5, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
            <Box sx={{ width: 68, height: 68, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={38} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Contractor Application Submitted!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3 }}>
              Your business <strong>{registered.businessName}</strong> has been registered. You can now access your contractor portal or view the profile in admin review queue.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('contractor');
                  navigate('/dashboard/contractor');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                Go to Contractor Dashboard
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Contracting Firm / Business Name *"
                    fullWidth
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="e.g. Apex Civil Infra & Builders"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Contact Person Name *"
                    fullWidth
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="e.g. Er. Rajiv Mishra"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Mobile Phone *"
                    fullWidth
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Headquarter City *"
                    fullWidth
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  >
                    {POPULAR_CITIES.map(c => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Service Coverage Areas"
                    fullWidth
                    value={formData.serviceArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceArea: e.target.value }))}
                    placeholder="e.g. Lucknow, Kanpur, Ayodhya"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Total Crew / Team Size"
                    fullWidth
                    value={formData.teamSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                    placeholder="e.g. 20-35 Craftsmen"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Services Offered (comma separated)"
                    fullWidth
                    value={formData.servicesOfferedText}
                    onChange={(e) => setFormData(prev => ({ ...prev, servicesOfferedText: e.target.value }))}
                    placeholder="e.g. Turnkey House Construction, RCC Foundation, Tile Flooring, Shuttering"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Firm Bio & Notable Past Projects"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe years of contracting experience, completed residential villas, industrial sheds, and machinery owned."
                  />
                </Grid>

              </Grid>

              <Divider sx={{ my: 3.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => navigate(-1)} sx={{ color: '#64748B' }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send size={18} />}
                  sx={{
                    bgcolor: '#EA580C',
                    fontWeight: 700,
                    px: 4,
                    py: 1.3,
                    borderRadius: 2.2,
                    fontSize: '0.95rem',
                    '&:hover': { bgcolor: '#C2410C' }
                  }}
                >
                  Register Contractor Profile
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
