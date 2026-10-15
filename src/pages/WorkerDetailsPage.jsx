import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs
} from '@mui/material';
import {
  MapPin,
  Briefcase,
  Star,
  ShieldCheck,
  Phone,
  Calendar,
  CheckCircle2,
  HardHat,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Send,
  Building2,
  Award
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const WorkerDetailsPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, savedWorkers, toggleSaveWorker, showNotification } = useApp();

  const worker = workers.find(w => w.id === id) || workers[0];
  const isSaved = savedWorkers.includes(worker?.id);

  // Direct contact form
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    siteLocation: '',
    workDuration: '',
    notes: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      alert('Please enter your name and phone number.');
      return;
    }
    setEnquirySuccess(true);
    showNotification(`Enquiry sent directly to ${worker.name}!`, 'success');
  };

  if (!worker) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Worker profile not found.</Typography>
        <Button onClick={() => navigate('/workers')} sx={{ mt: 2, color: '#EA580C' }}>
          Back to Workers Directory
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
          <Link to="/workers" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Find Workers</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 600 }}>{worker.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          
          {/* Main Profile Info */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                mb: 4
              }}
            >
              {/* Header Profile Box */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 3,
                      bgcolor: '#0F172A',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      border: '3px solid #EA580C'
                    }}
                  >
                    {worker.name.charAt(0)}
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {worker.name}
                      </Typography>
                      {worker.isVerified ? (
                        <Chip
                          icon={<ShieldCheck size={15} color="#15803D" />}
                          label="Admin Verified"
                          size="small"
                          sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }}
                        />
                      ) : (
                        <Chip label={worker.verificationStatus} size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309' }} />
                      )}
                    </Box>

                    <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 700, mt: 0.25 }}>
                      {worker.primarySkill}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5, color: '#64748B', fontSize: '0.85rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MapPin size={15} color="#EA580C" />
                        <span>{worker.city} • {worker.locality}</span>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Briefcase size={15} color="#0F172A" />
                        <span>{worker.experienceYears} Years Experience</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => toggleSaveWorker(worker.id)}
                  startIcon={isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  sx={{
                    borderColor: isSaved ? '#EA580C' : '#CBD5E1',
                    color: isSaved ? '#EA580C' : '#475569',
                    borderRadius: 2
                  }}
                >
                  {isSaved ? 'Saved' : 'Save Profile'}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Bio / Description */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                Worker Background & Trade Experience
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
                {worker.bio}
              </Typography>

              {/* Specializations & Skills */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Skills & Technical Competencies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                <Chip label={worker.primarySkill} sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700 }} />
                {worker.additionalSkills?.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ bgcolor: '#F1F5F9', color: '#1E293B', fontWeight: 600, border: '1px solid #E2E8F0' }}
                  />
                ))}
              </Box>

              {/* Contract preferences & Working terms */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Work Terms & Engagement Preferences
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      Expected Rate:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {worker.expectedWage}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      Working Radius:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      Up to {worker.workingRadiusKm || 25} Km
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      Availability Status:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: worker.isAvailable ? '#16A34A' : '#D97706' }}>
                      {worker.availability}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Simulated Projects Record */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Recent Project Track Record (Demo Record)
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'rgba(234, 88, 12, 0.04)', borderRadius: 2.5, border: '1px dashed rgba(234, 88, 12, 0.3)' }}>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                  Completed <strong>{worker.projectsCompleted || 40}+ construction and repair projects</strong> across {worker.city}. Specializes in high-quality structural alignment, safety precautions on height, and on-time milestone delivery.
                </Typography>
              </Box>

            </Paper>
          </Grid>

          {/* Right Sidebar: Quick Contact & Quotation Enquiry */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                position: { md: 'sticky' },
                top: { md: 90 },
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                Connect with {worker.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Submit your site details to request a quotation or schedule a site visit.
              </Typography>

              {enquirySuccess ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                    <CheckCircle2 size={28} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Enquiry Dispatched!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                    {worker.name} has been notified of your project enquiry. You will receive an SMS and call update.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEnquirySuccess(false)}
                    sx={{ color: '#EA580C', borderColor: '#EA580C' }}
                  >
                    Send Another Request
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Your Name *"
                      fullWidth
                      size="small"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Suresh Bansal"
                    />
                    <TextField
                      label="Mobile Number *"
                      fullWidth
                      size="small"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98XXX XXXXX"
                    />
                    <TextField
                      label="Site Address / Locality"
                      fullWidth
                      size="small"
                      value={enquiryForm.siteLocation}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, siteLocation: e.target.value }))}
                      placeholder="e.g. Aliganj, Sector B"
                    />
                    <TextField
                      label="Estimated Duration or Days"
                      fullWidth
                      size="small"
                      value={enquiryForm.workDuration}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, workDuration: e.target.value }))}
                      placeholder="e.g. 5 Days / 1 Month"
                    />
                    <TextField
                      label="Scope & Notes"
                      multiline
                      rows={3}
                      fullWidth
                      size="small"
                      value={enquiryForm.notes}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Describe what needs to be constructed, repaired or installed."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{
                        bgcolor: '#EA580C',
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#C2410C' }
                      }}
                    >
                      Request Quotation
                    </Button>
                  </Box>
                </form>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B' }}>
                <Phone size={15} color="#EA580C" />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Phone: {worker.phone}
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
