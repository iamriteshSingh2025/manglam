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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Breadcrumbs
} from '@mui/material';
import {
  Building2,
  CheckCircle2,
  Clock,
  HardHat,
  Users,
  Send,
  FileCheck,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ServiceDetailsPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, showNotification } = useApp();

  const service = services.find(s => s.id === id) || services[0];

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    city: 'Lucknow',
    plotOrArea: '',
    startDate: 'Within 2 Weeks',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Please fill your name and phone number.');
      return;
    }
    setSubmitted(true);
    showNotification(`Quotation request for "${service.title}" dispatched!`, 'success');
  };

  if (!service) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5">Service not found.</Typography>
        <Button onClick={() => navigate('/services')} sx={{ mt: 2 }}>Back to Services</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
          <Link to="/services" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Construction Services</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 600 }}>{service.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4 }}>
              
              <Chip label={service.category} sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1.5 }} />
              
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                {service.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 600, mb: 3 }}>
                {service.tagline}
              </Typography>

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 4 }}>
                {service.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Execution Scope */}
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                Detailed Scope of Execution
              </Typography>
              <List sx={{ mb: 4 }}>
                {service.scope.map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle2 size={20} color="#16A34A" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontWeight: 600, color: '#1E293B' }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* Crew & Timeline Meta Box */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block', mb: 0.5 }}>
                      Workers & Trades Involved:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
                      {service.requiredWorkers.map(w => (
                        <Chip key={w} label={w} size="small" sx={{ bgcolor: '#0F172A', color: '#FFF', fontWeight: 600 }} />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block', mb: 0.5 }}>
                      Typical Duration:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.5 }}>
                      {service.duration}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1 }}>
                      Pricing: {service.pricingModel}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

          {/* Right Enquiry Box */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', position: { md: 'sticky' }, top: { md: 90 } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                Enquire for {service.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2.5 }}>
                Receive customized site quotations from verified contractors and teams.
              </Typography>

              {submitted ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <CheckCircle2 size={40} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Quotation Request Sent!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1, mb: 2 }}>
                    Your service scope has been logged. Relevant contractors in your city will provide quotation breakdowns.
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C' }}>
                    Send Another
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Your Name *"
                      fullWidth
                      size="small"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <TextField
                      label="Mobile Phone *"
                      fullWidth
                      size="small"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98XXX XXXXX"
                    />
                    <TextField
                      label="Site City & Locality"
                      fullWidth
                      size="small"
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, city: e.target.value }))}
                    />
                    <TextField
                      label="Approximate Area (Sq.Ft / Rooms)"
                      fullWidth
                      size="small"
                      value={bookingForm.plotOrArea}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, plotOrArea: e.target.value }))}
                      placeholder="e.g. 1500 sq.ft plot, 3 BHK"
                    />
                    <TextField
                      label="Additional Notes / Scope"
                      multiline
                      rows={3}
                      fullWidth
                      size="small"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="e.g. Need Turnkey contract including materials, or labour only."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{ bgcolor: '#EA580C', fontWeight: 700, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                    >
                      Request Service Quotation
                    </Button>
                  </Box>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
