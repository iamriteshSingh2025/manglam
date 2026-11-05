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
  ArrowLeft,
  PhoneCall
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
    city: 'लखनऊ (Lucknow)',
    plotOrArea: '',
    startDate: '2 सप्ताह के अंदर',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }
    setSubmitted(true);
    showNotification(`"${service.title}" सेवा हेतु आपका कोटेशन अनुरोध भेज दिया गया है!`, 'success');
  };

  if (!service) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">सेवा विवरण नहीं मिला।</Typography>
        <Button onClick={() => navigate('/services')} sx={{ mt: 2, color: '#EA580C', fontWeight: 700 }}>
          सभी सेवाएँ देखें
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>होम</Link>
          <Link to="/services" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>निर्माण सेवाएँ</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 800 }}>{service.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4, boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)', overflow: 'hidden' }}>
              
              {/* सर्विस फोटो */}
              {service.image && (
                <Box sx={{ mb: 3.5, borderRadius: 3, overflow: 'hidden', height: { xs: 220, sm: 320 } }}>
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              )}

              <Chip label={service.category} sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 800, mb: 1.5 }} />
              
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
                {service.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 700, mb: 3, fontSize: '1.05rem' }}>
                {service.tagline}
              </Typography>

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 4, fontSize: '1rem' }}>
                {service.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* कार्य दायरा */}
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                शामिल कार्य दायरा (Scope of Execution)
              </Typography>
              <List sx={{ mb: 4 }}>
                {service.scope.map((item, idx) => (
                  <ListItem key={idx} sx={{ py: 0.8, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle2 size={18} color="#16A34A" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontWeight: 700, color: '#1E293B', fontSize: '0.94rem' }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* आवश्यक दल एवं अवधि */}
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Clock size={18} color="#EA580C" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        अनुमानित कार्य अवधि:
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>
                      {service.duration}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Users size={18} color="#EA580C" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        शामिल कुशल कारीगर:
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>
                      {service.requiredWorkers.join(', ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

          {/* दायां कोटेशन बॉक्स */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', position: { md: 'sticky' }, top: { md: 95 }, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                निशुल्क कोटेशन प्राप्त करें
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2.5 }}>
                अपनी साइट का साइज व आवश्यकता दर्ज करें। सत्यापित ठेकेदार सीधे संपर्क करेंगे।
              </Typography>

              {submitted ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <CheckCircle2 size={44} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                    कोटेशन अनुरोध भेजा गया!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                    हमारा ऑपरेशन्स डेस्क उपयुक्त ठेकेदारों को आपकी मांग अग्रेषित कर रहा है।
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C', fontWeight: 700 }}>
                    दूसरा अनुरोध भेजें
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="आपका पूरा नाम *"
                      size="small"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="उदा. अमित सक्सेना"
                    />
                    <TextField
                      label="मोबाइल नंबर *"
                      size="small"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="उदा. 98390 XXXXX"
                    />
                    <TextField
                      label="प्लॉट या कार्य क्षेत्र (वर्ग फीट)"
                      size="small"
                      value={bookingForm.plotOrArea}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, plotOrArea: e.target.value }))}
                      placeholder="उदा. 1500 sq.ft या 3 कमरा"
                    />
                    <TextField
                      label="काम कब शुरू करना है?"
                      size="small"
                      value={bookingForm.startDate}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                    <TextField
                      label="विशेष आवश्यकता या नोट"
                      multiline
                      rows={3}
                      size="small"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="लेबर ठेका चाहिए या सामग्री सहित, कोई विशेष ब्रांड प्राथमिकता..."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 800, py: 1.25, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                    >
                      कोटेशन अनुरोध भेजें
                    </Button>
                  </Box>
                </form>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 700 }}>
                  दर संरचना (Pricing Model):
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
                  {service.pricingModel}
                </Typography>
              </Box>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
