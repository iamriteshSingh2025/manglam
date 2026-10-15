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
  FormControlLabel,
  Checkbox,
  Switch,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  HardHat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES, WORKER_CATEGORIES } from '../data/mockData';

export const WorkerRegistrationPage = () => {
  const navigate = useNavigate();
  const { addWorker, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Lucknow',
    locality: '',
    primarySkill: 'Raj Mistri',
    additionalSkillsText: 'Brickwork, Plastering',
    experienceYears: '8',
    workTypes: ['Daily Wage'],
    expectedWage: '₹900 / day',
    workingRadiusKm: '25',
    availableImmediate: true,
    bio: ''
  });

  const [registeredWorker, setRegisteredWorker] = useState(null);

  const workTypeOptions = ['Daily Wage', 'Per-Day Contract', 'Fixed-Price Job', 'Project-Based Work'];

  const primarySkillOptions = [
    'Raj Mistri',
    'Building Mistri',
    'Masonry Labour',
    'Shuttering Carpenter',
    'Bar Bending / Sariya Work',
    'Painter',
    'Wall Putty Worker',
    'Waterproofing Worker',
    'Electrician',
    'House Wiring Technician',
    'Plumber',
    'Carpenter',
    'Door and Window Fitter',
    'Tile and Marble Installer',
    'Welding Worker',
    'Construction Labour',
    'Helper'
  ];

  const handleWorkTypeToggle = (wt) => {
    setFormData(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(wt)
        ? prev.workTypes.filter(t => t !== wt)
        : [...prev.workTypes, wt]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill your full name and phone number.');
      return;
    }

    const additionalSkills = formData.additionalSkillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const created = addWorker({
      ...formData,
      additionalSkills
    });

    setRegisteredWorker(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: '#EA580C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <HardHat size={28} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Worker & Mistri Registration
          </Typography>
          <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 600, mb: 1 }}>
            “Aapke Hunar Ko Mile Naye Kaam Ke Mauke.”
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
            Register your trade skill and preferred working area to receive genuine customer work enquiries directly.
          </Typography>
        </Box>

        {registeredWorker ? (
          <Paper sx={{ p: 5, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
            <Box sx={{ width: 68, height: 68, borderRadius: '50%', bgcolor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <ShieldAlert size={38} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Registration Submitted!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#B45309', fontWeight: 700, mb: 2 }}>
              Current Status: Pending Admin Review
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3 }}>
              Your worker profile for <strong>{registeredWorker.name} ({registeredWorker.primarySkill})</strong> has been registered. In accordance with KaamSetu trust guidelines, new profiles remain in "Pending Review" until approved by the admin desk before a Verified Badge is issued.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('worker');
                  navigate('/dashboard/worker');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                Go to Worker Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentRole('admin');
                  navigate('/dashboard/admin');
                }}
                sx={{ borderColor: '#0F172A', color: '#0F172A', fontWeight: 700 }}
              >
                Switch to Admin Dashboard to Approve
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <Alert severity="info" sx={{ mb: 3.5, fontSize: '0.85rem' }}>
              <strong>Zero Registration Fees:</strong> KaamSetu does not charge workers any signup fees or cut from your daily wages.
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                {/* Full Name */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Full Name *"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Rameshwar Yadav"
                  />
                </Grid>

                {/* Mobile */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Mobile Number *"
                    fullWidth
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                    helperText="Customers will contact you on this number"
                  />
                </Grid>

                {/* City */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Primary Working City *"
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

                {/* Locality */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Your Locality / Base Area *"
                    fullWidth
                    required
                    value={formData.locality}
                    onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
                    placeholder="e.g. Gomti Nagar, Sector 4"
                  />
                </Grid>

                {/* Primary Skill */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Primary Skill / Trade *"
                    fullWidth
                    required
                    value={formData.primarySkill}
                    onChange={(e) => setFormData(prev => ({ ...prev, primarySkill: e.target.value }))}
                  >
                    {primarySkillOptions.map(skill => (
                      <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Years of Experience */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Years of Practical Experience"
                    fullWidth
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                  />
                </Grid>

                {/* Additional Skills */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Additional Skills (comma separated)"
                    fullWidth
                    value={formData.additionalSkillsText}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalSkillsText: e.target.value }))}
                    placeholder="e.g. Plastering, Foundation Brickwork, Column Shuttering, Wall Putty"
                  />
                </Grid>

                {/* Work Contract Types */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                    Work Preferences:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {workTypeOptions.map(wt => (
                      <FormControlLabel
                        key={wt}
                        control={
                          <Checkbox
                            checked={formData.workTypes.includes(wt)}
                            onChange={() => handleWorkTypeToggle(wt)}
                            color="secondary"
                          />
                        }
                        label={<Typography variant="body2">{wt}</Typography>}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Expected Wage */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Expected Daily Wage or Rate (optional)"
                    fullWidth
                    value={formData.expectedWage}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedWage: e.target.value }))}
                    placeholder="e.g. ₹950 / day or ₹45 / point"
                  />
                </Grid>

                {/* Working Radius */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Working Radius (Km)"
                    fullWidth
                    type="number"
                    value={formData.workingRadiusKm}
                    onChange={(e) => setFormData(prev => ({ ...prev, workingRadiusKm: e.target.value }))}
                  />
                </Grid>

                {/* Immediate Availability */}
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.availableImmediate}
                        onChange={(e) => setFormData(prev => ({ ...prev, availableImmediate: e.target.checked }))}
                        color="success"
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Available for immediate work</Typography>}
                  />
                </Grid>

                {/* Short Bio */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Short Introduction / Past Projects"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell customers about your main specialty, how many helpers you have, or previous prominent buildings completed."
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
                  Register Profile
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
