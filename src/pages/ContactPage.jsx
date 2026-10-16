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
    topic: 'सामान्य पूछताछ',
    city: 'Lucknow',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('कृपया अपना नाम, फोन नंबर और संदेश भरें।');
      return;
    }
    setSubmitted(true);
    showNotification('धन्यवाद! आपका संदेश कामसेतु सहायता टीम को भेज दिया गया है।', 'success');
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* हेडर */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            हम आपकी सहायता के लिए यहाँ हैं
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            कामसेतु सहायता एवं शिकायत डेस्क
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            कारीगर पंजीकरण, ठेकेदार टेंडर, सामग्री डीलरशिप या विवाद सहायता से संबंधित कोई प्रश्न है?
          </Typography>
        </Box>

        <Grid container spacing={4}>
          
          {/* बाईं तरफ संपर्क जानकारी */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#0F172A', color: '#FFF', height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF', mb: 2 }}>
                संचालन एवं सहायता
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 4, lineHeight: 1.6 }}>
                हमारी ग्राहक सहायता टीम पूरे भारत में स्थानीय निर्माण बाजारों के साथ सीधे समन्वय करती है।
              </Typography>

              {/* संस्थापक कार्ड */}
              <Box sx={{ p: 2.5, bgcolor: 'rgba(234, 88, 12, 0.15)', borderRadius: 3, border: '1px solid rgba(234, 88, 12, 0.4)', mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  मुख्य मालिक एवं प्रबंध संस्थापक
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', my: 0.5 }}>
                  अभिषेक मिश्रा (राका मिश्रा जी)
                </Typography>
                <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 1.5, fontSize: '0.86rem' }}>
                  व्यावसायिक साझेदारी, श्रम विवाद और ठेकेदार पूछताछ के लिए सीधा संपर्क।
                </Typography>
                <Button
                  component="a"
                  href="tel:+918739000333"
                  variant="contained"
                  fullWidth
                  startIcon={<Phone size={16} />}
                  sx={{ bgcolor: '#EA580C', fontWeight: 700, py: 1, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                >
                  सीधे कॉल करें: +91 8739000333
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <MapPin size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      संचालन मुख्यालय
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      सेक्टर 12, हजरतगंज / साइबर सिटी, लखनऊ (उ.प्र.), भारत
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Phone size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      टोल-फ्री हेल्पलाइन (डेमो)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      +91 (0522) 289-XXXX • सोम - शनि, सुबह 8:00 से शाम 7:00 बजे तक
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Mail size={20} color="#EA580C" style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      आधिकारिक ईमेल
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
                      विवाद एवं शिकायत रिपोर्टिंग
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      कार्य गुणवत्ता या उपस्थिति संबंधी समस्याओं को बढ़ाने के लिए फॉर्म में "विवाद रिपोर्ट करें" चुनें।
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </Paper>
          </Grid>

          {/* दाईं तरफ संपर्क फॉर्म */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              
              {submitted ? (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                    संदेश सफलतापूर्वक भेजा गया!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 460, mx: 'auto', mb: 3 }}>
                    संदर्भ टिकट <strong>#KS-SUP-{Math.floor(10000 + Math.random() * 90000)}</strong> बनाया गया। हमारे संचालन विशेषज्ञ शीघ्र ही आपसे कॉल या संपर्क करेंगे।
                  </Typography>
                  <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C' }}>
                    एक और संदेश भेजें
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2.5 }}>
                    हमें संदेश भेजें या समस्या रिपोर्ट करें
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="आपका पूरा नाम *"
                        fullWidth
                        size="small"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="फोन नंबर *"
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
                        label="ईमेल पता (वैकल्पिक)"
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
                        label="विषय / उद्देश्य *"
                        fullWidth
                        size="small"
                        value={formData.topic}
                        onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                      >
                        <MenuItem value="सामान्य पूछताछ">सामान्य मार्केटप्लेस पूछताछ</MenuItem>
                        <MenuItem value="कारीगर पंजीकरण सहायता">कारीगर पंजीकरण सहायता</MenuItem>
                        <MenuItem value="ठेकेदार ऑनबोर्डिंग">ठेकेदार ऑनबोर्डिंग</MenuItem>
                        <MenuItem value="सामग्री सप्लायर साझेदारी">सामग्री सप्लायर साझेदारी</MenuItem>
                        <MenuItem value="विवाद रिपोर्ट">विवाद या गैर-प्रदर्शन की रिपोर्ट</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="आपका संदेश या प्रोजेक्ट विवरण *"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="प्रासंगिक संदर्भ आईडी, स्थान विवरण या विशिष्ट प्रतिक्रिया प्रदान करें।"
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
                      संदेश भेजें
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
