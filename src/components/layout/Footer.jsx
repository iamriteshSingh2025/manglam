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
          
          {/* ब्रांड जानकारी */}
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
                काम<span style={{ color: '#EA580C' }}>सेतु</span>
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#F97316', fontWeight: 600, mb: 1, fontSize: '0.92rem' }}>
              "काम करने वालों को काम, हर घर को विश्वास।"
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2.5, lineHeight: 1.6 }}>
              भारत का समर्पित मार्केटप्लेस — कुशल मिस्त्री, निर्माण ठेकेदार, घर मालिक और निर्माण सामग्री सप्लायर को एक पारदर्शी प्लेटफार्म पर जोड़ता है।
            </Typography>

            <Box sx={{ p: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', borderRadius: 2.5, border: '1px solid rgba(234, 88, 12, 0.3)', mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, display: 'block', mb: 0.5 }}>
                मुख्य मालिक एवं प्रबंध संस्थापक:
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 800 }}>
                अभिषेक मिश्रा (राका मिश्रा जी)
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
                <span>मुख्य कार्यालय: हजरतगंज / साइबर सिटी, भारत</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <Phone size={16} color="#EA580C" />
                <span>डायरेक्टर हेल्पलाइन: <a href="tel:+918739000333" style={{ color: '#FFF' }}>+91 8739000333</a></span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <Mail size={16} color="#EA580C" />
                <span>सहायता: support@kaamsetu.demo</span>
              </Box>
            </Box>
          </Grid>

          {/* कॉलम 2: मार्केटप्लेस खोजें */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              मार्केटप्लेस
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.88rem' }}>
              <MuiLink component={Link} to="/workers" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                कुशल कारीगर खोजें
              </MuiLink>
              <MuiLink component={Link} to="/services" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                निर्माण सेवाएँ
              </MuiLink>
              <MuiLink component={Link} to="/materials" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                निर्माण सामग्री
              </MuiLink>
              <MuiLink component={Link} to="/post-requirement" sx={{ color: '#EA580C', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                जरूरत पोस्ट करें
              </MuiLink>
              <MuiLink component={Link} to="/how-it-works" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                कैसे काम करता है
              </MuiLink>
            </Box>
          </Grid>

          {/* कॉलम 3: कारीगर और ठेकेदारों के लिए */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              सेवा प्रदाताओं के लिए
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.88rem' }}>
              <MuiLink component={Link} to="/register-worker" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                कारीगर के रूप में पंजीकरण
              </MuiLink>
              <MuiLink component={Link} to="/register-contractor" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                ठेकेदार ऑनबोर्डिंग
              </MuiLink>
              <MuiLink component={Link} to="/register-supplier" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                सप्लायर के रूप में पंजीकरण
              </MuiLink>
              <MuiLink component={Link} to="/dashboard/worker" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                कारीगर डैशबोर्ड
              </MuiLink>
              <MuiLink component={Link} to="/dashboard/supplier" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                सप्लायर डैशबोर्ड
              </MuiLink>
            </Box>
          </Grid>

          {/* कॉलम 4: विश्वास एवं पारदर्शिता */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              विश्वास, सुरक्षा एवं प्रशासन
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#10B981' }}>
                <ShieldCheck size={18} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  एडमिन प्रोफाइल सत्यापन नीति
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', lineHeight: 1.5 }}>
                सत्यापित बैज केवल काम सेतु ऑपरेशनल डेस्क द्वारा पूर्ण साख और कार्य समीक्षा के बाद ही दिया जाता है। हम कभी भी स्वचालित रूप से प्रोफाइल सत्यापित नहीं करते।
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, fontSize: '0.82rem' }}>
              <MuiLink component={Link} to="/trust-safety" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                विश्वास दिशानिर्देश
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/terms" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                नियम एवं शर्तें
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/privacy" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                गोपनीयता नीति
              </MuiLink>
              <span style={{ color: '#475569' }}>•</span>
              <MuiLink component={Link} to="/contact" sx={{ color: '#94A3B8', '&:hover': { color: '#EA580C' } }}>
                विवाद रिपोर्ट करें
              </MuiLink>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* नियामक एवं प्लेटफार्म नोटिस */}
        <Box sx={{ p: 2, bgcolor: 'rgba(234, 88, 12, 0.06)', borderRadius: 2, border: '1px dashed rgba(234, 88, 12, 0.25)', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <AlertCircle size={18} color="#EA580C" style={{ marginTop: 2, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
              <strong>उचित व्यवहार नोटिस:</strong> काम सेतु एक सीधा डिस्कवरी और वर्कफ्लो मार्केटप्लेस के रूप में कार्य करता है। काम सेतु स्वयं निर्माण उपकरण नहीं रखता, साइट मजदूर नियुक्त नहीं करता, या निर्माण सामग्री का भंडारण नहीं करता। सभी अनुबंध दायरे, अंतिम दरें, डिलीवरी लॉजिस्टिक्स और गुणवत्ता मील के पत्थर ग्राहकों, कारीगरों, ठेकेदारों और सप्लायरों के बीच सीधे तय किए जाते हैं।
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © {new Date().getFullYear()} काम सेतु टेक्नोलॉजीज इंडिया। सर्वाधिकार सुरक्षित। (डेमो प्रोटोटाइप)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink component={Link} to="/dashboard/admin" sx={{ color: '#F97316', fontSize: '0.78rem', textDecoration: 'underline' }}>
              प्लेटफार्म एडमिन पोर्टल
            </MuiLink>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};
