import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  Divider
} from '@mui/material';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage = () => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'General Inquiry',
    city: 'Lucknow',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill your name, phone number, and message.');
      return;
    }
    setSubmitted(true);
    showNotification('Thank you! Your message has been dispatched to KaamSetu support.', 'success');
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            We're Here to Help
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Contact KaamSetu Support & Grievance Desk
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            Have a question about worker registration, contractor tenders, material dealerships, or need dispute assistance?
          </Typography>
        </Box>

        <Grid container spacing={4}>
          
          {/* Left Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#0F172A', color: '#FFF', height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF', mb: 2 }}>
                Operations & Support
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 4, lineHeight: 1.6 }}>
                Our customer desk coordinates directly with local construction markets across India.
              </Typography>

              {/* Direct Founder Card */}
              <Box sx={{ p: 2.5, bgcolor: 'rgba(234, 88, 12, 0.15)', borderRadius: 3, border: '1px solid rgba(234, 88, 12, 0.4)', mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Main Owner & Managing Founder
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', my: 0.5 }}>
                  Abhishek Mishra (Raka Mishra ji)
                </Typography>
                <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 1.5, fontSize: '0.86rem' }}>
                  Direct line for commercial partnerships, labour disputes, and contractor inquiries.
                </Typography>
                <Button
                  component="a"
                  href="tel:+918739000333"
                  variant="contained"
                  fullWidth
                  startIcon={<Phone size={16} />}
                  sx={{ bgcolor: '#EA580C', fontWeight: 700, py: 1, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                >
                  Call Direct: +91 8739000333
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <MapPin size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      Operational Hub
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      Sector 12, Hazratganj / Cyber City, Lucknow (U.P.), India
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Phone size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      Toll-Free Helpline (Demo)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      +91 (0522) 289-XXXX • Mon - Sat, 8:00 AM to 7:00 PM
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Mail size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      Official Email
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      support@kaamsetu.demo • admin@kaamsetu.demo
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AlertTriangle size={20} color="#FB923C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FB923C' }}>
                      Dispute & Grievance Reporting
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      Select "Report Dispute" in the form to escalate work quality or attendance issues.
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </Paper>
          </Grid>

          {/* Right Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              
              {submitted ? (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                    Message Dispatched Successfully!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 460, mx: 'auto', mb: 3 }}>
                    Reference ticket <strong>#KS-SUP-{Math.floor(10000 + Math.random() * 90000)}</strong> generated. An operations specialist will call or respond to you shortly.
                  </Typography>
                  <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C' }}>
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2.5 }}>
                    Send Us a Message or Report an Issue
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Your Full Name *"
                        fullWidth
                        size="small"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Phone Number *"
                        fullWidth
                        size="small"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98XXX XXXXX"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Email Address (optional)"
                        fullWidth
                        size="small"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        select
                        label="Topic / Purpose *"
                        fullWidth
                        size="small"
                        value={formData.topic}
                        onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                      >
                        <MenuItem value="General Inquiry">General Marketplace Inquiry</MenuItem>
                        <MenuItem value="Worker Registration Help">Worker Registration Assistance</MenuItem>
                        <MenuItem value="Contractor Onboarding">Contractor Onboarding</MenuItem>
                        <MenuItem value="Material Supplier Dealership">Material Supplier Partnership</MenuItem>
                        <MenuItem value="Report Dispute">Report a Dispute or Non-performance</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Your Message or Project Details *"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Provide relevant reference IDs, location details, or specific feedback."
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Send size={16} />}
                      sx={{
                        bgcolor: '#EA580C',
                        fontWeight: 700,
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#C2410C' }
                      }}
                    >
                      Dispatch Message
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
