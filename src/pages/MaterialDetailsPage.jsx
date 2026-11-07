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
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import {
  Package,
  Truck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Send,
  Star,
  PhoneCall
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const MaterialDetailsPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { materials, showNotification } = useApp();

  const material = materials.find(m => m.id === id) || materials[0];

  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    siteLocation: '',
    quantity: material?.minOrderQty || '50 बोरी / 1 ट्रक',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) {
      alert('कृपया अपना नाम और मोबाइल नंबर भरें।');
      return;
    }
    setSubmitted(true);
    showNotification(`${material.supplierName} को आपका कोटेशन अनुरोध भेज दिया गया है!`, 'success');
  };

  if (!material) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">सामग्री विवरण नहीं मिला।</Typography>
        <Button onClick={() => navigate('/materials')} sx={{ mt: 2, color: '#EA580C', fontWeight: 700 }}>
          सामग्री डायरेक्टरी पर लौटें
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>होम</Link>
          <Link to="/materials" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>निर्माण सामग्री</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 800 }}>{material.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4, boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)', overflow: 'hidden' }}>
              
              {/* सामग्री फोटो */}
              {material.image && (
                <Box sx={{ mb: 3.5, borderRadius: 3, overflow: 'hidden', height: { xs: 200, sm: 300 } }}>
                  <Box
                    component="img"
                    src={material.image}
                    alt={material.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                <Chip label={material.category} sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 800 }} />
                <Chip label={material.availability} size="small" sx={{ bgcolor: '#DCFCE7', color: '#16A34A', fontWeight: 700 }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                {material.name}
              </Typography>

              {/* सप्लायर विवरण */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                <Building2 size={18} color="#EA580C" />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1E293B' }}>
                  डीलर: {material.supplierName} ({material.supplierCity})
                </Typography>
                <Chip size="small" icon={<ShieldCheck size={14} color="#15803D" />} label="सत्यापित डीलर" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
              </Box>

              {/* मूल्य बैनर */}
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
                      वर्तमान मंडी दर / सांकेतिक मूल्य:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A' }}>
                      {material.price > 0 && material.priceType?.includes('स्थिर')
                        ? `₹${material.price.toLocaleString('en-IN')} / ${material.unit}`
                        : 'दैनिक मंडी भाव (सप्लायर से पूछें)'}
                    </Typography>
                  </Box>
                  <Chip label={`न्यूनतम ऑर्डर: ${material.minOrderQty}`} sx={{ bgcolor: '#FFF', border: '1px solid #CBD5E1', fontWeight: 700 }} />
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 3.5 }}>
                {material.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* तकनीकी विनिर्देश तालिका */}
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                तकनीकी विनिर्देश (Technical Specifications)
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2.5, mb: 3 }}>
                <Table size="small">
                  <TableBody>
                    {material.specifications && Object.entries(material.specifications).map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: 800, color: '#0F172A', width: '40%', bgcolor: '#F8FAFC' }}>
                          {key}
                        </TableCell>
                        <TableCell sx={{ color: '#334155', fontWeight: 600 }}>
                          {val}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* डिलीवरी क्षेत्र */}
              <Box sx={{ p: 2.5, bgcolor: '#EFF6FF', borderRadius: 3, border: '1px solid #BFDBFE' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Truck size={18} color="#2563EB" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                    सीधे साइट डिलीवरी क्षेत्र:
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#1E3A8A', fontWeight: 600 }}>
                  {material.deliveryLocations?.join(', ')} एवं आसपास के 40 किमी दायरे में डंपर / ट्रक द्वारा सीधे साइट पर अनलोडिंग।
                </Typography>
              </Box>

            </Paper>
          </Grid>

          {/* दायां कोटेशन बॉक्स */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3.5, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', position: { md: 'sticky' }, top: { md: 95 }, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                थोक दर एवं डिलीवरी पूछताछ
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2.5 }}>
                सीधे डीलर से वर्तमान मंडी रेट, अनलोडिंग चार्ज और डिलीवरी समय की पुष्टि करें।
              </Typography>

              {submitted ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <CheckCircle2 size={44} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                    पूछताछ दर्ज कर ली गई!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                    {material.supplierName} आपको वर्तमान डिस्पैच रेट के साथ सीधे फोन करेंगे।
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C', fontWeight: 700 }}>
                    अन्य पूछताछ भेजें
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="आपका पूरा नाम *"
                      size="small"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="उदा. राजेश अग्रवाल"
                    />
                    <TextField
                      label="मोबाइल नंबर *"
                      size="small"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="उदा. 98390 XXXXX"
                    />
                    <TextField
                      label="डिलीवरी साइट का पता / शहर"
                      size="small"
                      value={orderForm.siteLocation}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, siteLocation: e.target.value }))}
                      placeholder="उदा. ट्रांसपोर्ट नगर, लखनऊ"
                    />
                    <TextField
                      label="आवश्यक मात्रा (बोरी / टन / cft)"
                      size="small"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                    <TextField
                      label="विशेष निर्देश / नोट"
                      multiline
                      rows={3}
                      size="small"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="डिलीवरी समय या अनलोडिंग संबंधी कोई निर्देश लिखें..."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 800, py: 1.25, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                    >
                      थोक दर कोटेशन मांगें
                    </Button>
                  </Box>
                </form>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B' }}>
                <PhoneCall size={16} color="#EA580C" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155' }}>
                  हेल्पलाइन: +91 8739000333 (राका भैया)
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
