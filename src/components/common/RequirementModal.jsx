import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
  IconButton,
  Alert,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import { X as CloseIcon, CheckCircle2, HardHat, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_CITIES } from '../../data/mockData';

export const RequirementModal = ({ open, onClose, defaultCategory = '', defaultType = 'New Construction' }) => {
  const navigate = useNavigate();
  const { postRequirement, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    city: 'Lucknow',
    locality: '',
    requirementType: defaultType,
    serviceCategory: defaultCategory || 'Raj Mistri / House Construction',
    description: '',
    budget: '',
    preferredStartDate: 'Within 1 Week',
    duration: '',
    scopeType: 'Labour + Material',
  });

  const [submittedRef, setSubmittedRef] = useState(null);

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
      alert('Please fill the required fields: Customer Name, Mobile Number, and Description.');
      return;
    }

    const created = postRequirement(formData);
    setSubmittedRef(created.id);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setFormData({
      customerName: '',
      mobile: '',
      city: 'Lucknow',
      locality: '',
      requirementType: defaultType,
      serviceCategory: defaultCategory || 'Raj Mistri / House Construction',
      description: '',
      budget: '',
      preferredStartDate: 'Within 1 Week',
      duration: '',
      scopeType: 'Labour + Material',
    });
    onClose();
  };

  const handleGoToDashboard = () => {
    setCurrentRole('customer');
    handleResetAndClose();
    navigate('/dashboard/customer');
  };

  return (
    <Dialog
      open={open}
      onClose={handleResetAndClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: { xs: 1, sm: 2 },
          bgcolor: '#FFFFFF',
        }
      }}
    >
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HardHat size={22} color="#FFF" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              Post Your Construction Requirement
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Connect with verified mistris, contractors & material suppliers in your city.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleResetAndClose} size="small">
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#E2E8F0', py: 2.5 }}>
        {submittedRef ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Box sx={{ width: 68, height: 68, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={38} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Requirement Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
              Your requirement has been saved with reference number:
            </Typography>
            <Chip
              label={submittedRef}
              sx={{
                bgcolor: '#0F172A',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '1.1rem',
                py: 2.5,
                px: 2,
                borderRadius: 2,
                mb: 3
              }}
            />
            <Alert severity="info" sx={{ maxWidth: 580, mx: 'auto', textAlign: 'left', mb: 3 }}>
              <strong>Demo Confirmation:</strong> This requirement has been logged in your local session data. You can track this requirement status, assigned providers, and quotation responses directly inside the <strong>Customer Dashboard</strong> or <strong>Admin Dashboard</strong>.
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleGoToDashboard}
                endIcon={<ArrowRight size={16} />}
                sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700, px: 3, py: 1 }}
              >
                Track in Customer Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetAndClose}
                sx={{ borderColor: '#CBD5E1', color: '#475569', fontWeight: 600 }}
              >
                Close & Return
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Alert severity="warning" sx={{ mb: 2.5, py: 0.5, fontSize: '0.82rem' }}>
              <strong>Fair Scope Notice:</strong> Please describe your required work accurately. Workers & suppliers respond with customized estimates and site visits.
            </Alert>

            <Grid container spacing={2}>
              {/* Customer Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Your Full Name *"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g. Ramesh Chandra / Sharma & Associates"
                />
              </Grid>

              {/* Mobile */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Mobile Number *"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="+91 98765 XXXXX"
                  helperText="Used for SMS & direct quotation updates"
                />
              </Grid>

              {/* City */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  size="small"
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
                  label="Locality / Area / Landmark *"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g. Gomti Nagar, Extension Road"
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
                  size="small"
                  required
                >
                  {requirementTypes.map(t => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Category */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="Service or Trade Category *"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                >
                  {categoryOptions.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Scope Type Radio */}
              <Grid size={{ xs: 12 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', mb: 0.5 }}>
                    Scope Mode:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="scopeType"
                    value={formData.scopeType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Labour only" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2">Labour Only</Typography>} />
                    <FormControlLabel value="Material only" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2">Material Only</Typography>} />
                    <FormControlLabel value="Labour + Material" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Labour + Material (Turnkey)</Typography>} />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Project Work Description *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  placeholder="Specify total area (sq.ft), number of floors/rooms, specific materials, daily wage preference, or any urgency."
                />
              </Grid>

              {/* Approx Budget */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="Approx. Budget (₹ optional)"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  placeholder="e.g. 50,000 or 15,00,000"
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
                  size="small"
                >
                  <MenuItem value="Immediate (Within 24-48 hrs)">Immediate (24-48 hrs)</MenuItem>
                  <MenuItem value="Within 1 Week">Within 1 Week</MenuItem>
                  <MenuItem value="Within 15 Days">Within 15 Days</MenuItem>
                  <MenuItem value="Next Month / Planning Stage">Next Month</MenuItem>
                </TextField>
              </Grid>

              {/* Work Duration */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="Estimated Duration (optional)"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  placeholder="e.g. 10 Days / 3 Months"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button onClick={handleResetAndClose} sx={{ color: '#64748B' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#EA580C',
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#C2410C' }
                }}
              >
                Submit Requirement & Get Quotations
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
