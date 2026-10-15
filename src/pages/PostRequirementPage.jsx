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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  HardHat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const PostRequirementPage = () => {
  const navigate = useNavigate();
  const { postRequirement, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    city: 'Lucknow',
    locality: '',
    requirementType: 'New Construction',
    serviceCategory: 'Raj Mistri / House Construction',
    description: '',
    budget: '',
    preferredStartDate: 'Within 1 Week',
    duration: '',
    scopeType: 'Labour + Material'
  });

  const [createdRef, setCreatedRef] = useState(null);

  const requirementTypes = [
    'New Construction',
    'Renovation',
    'Repair',
    'Labour Requirement',
    'Electrical or Plumbing',
    'Painting and Finishing',
    'Material Purchase',
    'Contractor Requirement',
    'Other'
  ];

  const categoryOptions = [
    'Raj Mistri / House Construction',
    'Building Mistri & Masonry',
    'Shuttering Carpenter & Sariya',
    'Painter & Putty Worker',
    'Electrician & House Wiring',
    'Plumber & Sanitary Fitting',
    'Tile, Granite & Marble Work',
    'Waterproofing & Terrace Treatment',
    'Welding & Fabrication',
    'Cement, Sand & Aggregates',
    'TMT Steel / Sariya Supply',
    'General Construction Labour'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile || !formData.description) {
      alert('Please fill the required fields: Name, Mobile, and Project Description.');
      return;
    }

    const res = postRequirement(formData);
    setCreatedRef(res.id);
  };

  const handleGoToCustomerDashboard = () => {
    setCurrentRole('customer');
    navigate('/dashboard/customer');
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
            Post Your Construction Requirement
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 620, mx: 'auto' }}>
            Get verified quotations from skilled mistris, contractors, and material dealers in your city.
          </Typography>
        </Box>

        {createdRef ? (
          <Paper sx={{ p: 5, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
            <Box sx={{ width: 68, height: 68, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={38} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Requirement Successfully Posted!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 2 }}>
              Your unique requirement reference tracking code:
            </Typography>
            <Chip
              label={createdRef}
              sx={{
                bgcolor: '#0F172A',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '1.25rem',
                py: 2.75,
                px: 2.5,
                borderRadius: 2,
                mb: 3
              }}
            />
            <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', textAlign: 'left', mb: 4 }}>
              <strong>Demo Status:</strong> Your requirement has been saved into the interactive data store. You can now view and manage it under the <strong>Customer Dashboard</strong> or review and assign it under the <strong>Admin Dashboard</strong>.
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleGoToCustomerDashboard}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                Open Customer Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setCreatedRef(null);
                  setFormData({
                    customerName: '',
                    mobile: '',
                    city: 'Lucknow',
                    locality: '',
                    requirementType: 'New Construction',
                    serviceCategory: 'Raj Mistri / House Construction',
                    description: '',
                    budget: '',
                    preferredStartDate: 'Within 1 Week',
                    duration: '',
                    scopeType: 'Labour + Material'
                  });
                }}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}
              >
                Post Another Requirement
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
            
            <Alert severity="warning" sx={{ mb: 3.5, fontSize: '0.85rem' }}>
              <strong>Direct Transparent Discussion:</strong> KaamSetu charges zero commission on worker daily wages. Clearly describe your site scope so providers give precise estimates.
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                {/* Customer Name */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Customer / Builder Name *"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="e.g. Deepak Agrawal"
                  />
                </Grid>

                {/* Mobile Phone */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Contact Phone Number *"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="+91 98XXX XXXXX"
                    helperText="For direct quotation communication"
                  />
                </Grid>

                {/* City */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Project City *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {POPULAR_CITIES.map(c => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Locality */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Locality / Sector / Landmark *"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="e.g. Shaheed Path, Sector 4"
                  />
                </Grid>

                {/* Requirement Type */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Requirement Type *"
                    name="requirementType"
                    value={formData.requirementType}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {requirementTypes.map(t => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Service Category */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Primary Trade / Service Category *"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {categoryOptions.map(c => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Scope Mode */}
                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', mb: 0.5 }}>
                      Scope Mode:
                    </FormLabel>
                    <RadioGroup
                      row
                      name="scopeType"
                      value={formData.scopeType}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="Labour only" control={<Radio color="secondary" />} label="Labour Only" />
                      <FormControlLabel value="Material only" control={<Radio color="secondary" />} label="Material Only" />
                      <FormControlLabel value="Labour + Material" control={<Radio color="secondary" />} label="Labour + Material (Complete Turnkey)" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Description */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Detailed Project Scope & Requirements *"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    placeholder="Please mention plot area, number of floors, required mistris and helpers, specific material brands (e.g. Tata Tiscon, UltraTech), or any specific technical drawings."
                  />
                </Grid>

                {/* Budget */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="Estimated Budget (₹ optional)"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    fullWidth
                    placeholder="e.g. 5,00,000"
                  />
                </Grid>

                {/* Preferred Start Date */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    select
                    label="Preferred Start Date"
                    name="preferredStartDate"
                    value={formData.preferredStartDate}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="Immediate (Within 48 hrs)">Immediate (24-48 hrs)</MenuItem>
                    <MenuItem value="Within 1 Week">Within 1 Week</MenuItem>
                    <MenuItem value="Within 15 Days">Within 15 Days</MenuItem>
                    <MenuItem value="Next Month / Planning Stage">Next Month</MenuItem>
                  </TextField>
                </Grid>

                {/* Duration */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="Estimated Work Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    fullWidth
                    placeholder="e.g. 3 Months / 15 Days"
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
                  Post Construction Requirement
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
