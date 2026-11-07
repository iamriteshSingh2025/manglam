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
  Alert,
  Chip,
  Divider
} from '@mui/material';
import { Truck, CheckCircle2, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const SupplierRegistrationPage = () => {
  const navigate = useNavigate();
  const { addSupplier, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    location: '',
    city: 'लखनऊ (Lucknow)',
    deliveryLocationsText: 'लखनऊ, उन्नाव, बाराबंकी, सीतापुर',
    materialCategoriesText: 'सीमेंट, सरिया / स्टील, बालू / मौरंग, गिट्टी',
    pricingModel: 'थोक मंडी दर एवं सीधे साइट डिलीवरी',
    minOrderQty: '50 बोरी / 1 डंपर / 1 टन',
  });

  const [registered, setRegistered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactPerson || !formData.phone) {
      alert('कृपया अपनी दुकान/फर्म का नाम, संपर्क व्यक्ति और फोन नंबर भरें।');
      return;
    }

    const deliveryLocations = formData.deliveryLocationsText.split(',').map(s => s.trim()).filter(Boolean);
    const materialCategories = formData.materialCategoriesText.split(',').map(s => s.trim()).filter(Boolean);

    const created = addSupplier({
      ...formData,
      deliveryLocations,
      materialCategories
    });

    setRegistered(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* हेडर */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: '#0F172A', color: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.25)' }}>
            <Truck size={28} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            निर्माण सामग्री सप्लायर पंजीकरण
          </Typography>
          <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 800, mb: 1, fontSize: '1.1rem' }}>
            “अपने निर्माण सामग्री कारोबार को नए ग्राहकों तक पहुँचाएँ।”
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 620, mx: 'auto' }}>
            अपनी दुकान, डीलरशिप या स्टॉकयार्ड को मंगलम विश्वकर्मा मंच पर सूचीबद्ध करें। सीधे घर मालिकों और ठेकेदारों से थोक खरीद पूछताछ पाएं।
          </Typography>
        </Box>

        {registered ? (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
              <CheckCircle2 size={42} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              सप्लायर फर्म पंजीकृत हुई!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3.5, lineHeight: 1.7 }}>
              आपकी सप्लायर प्रोफाइल <strong>{registered.businessName}</strong> दर्ज कर ली गई है। आप अपने सप्लायर डैशबोर्ड में उत्पाद कैटलॉग व दैनिक दरें प्रबंधित कर सकते हैं।
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('supplier');
                  navigate('/dashboard/supplier');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 800, px: 3.5, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                सप्लायर डैशबोर्ड खोलें
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Alert severity="success" icon={<ShieldCheck size={20} />} sx={{ mb: 3.5, fontSize: '0.86rem', borderRadius: 2.5 }}>
              <strong>शून्य कटौती:</strong> ग्राहकों को सीधे अपनी दरें बताएं। मंगलम विश्वकर्मा थोक ट्रकलोड या सामग्री पर कोई कमीशन नहीं लेता।
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="डीलरशिप / फर्म का नाम *"
                    fullWidth
                    required
                    size="small"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="उदा. काशी स्टील एवं सीमेंट ट्रेडर्स"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="संपर्क व्यक्ति का नाम *"
                    fullWidth
                    required
                    size="small"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="उदा. रमेश केशरी"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="मोबाइल नंबर *"
                    fullWidth
                    required
                    size="small"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="उदा. 98390 XXXXX"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="ईमेल (वैकल्पिक)"
                    fullWidth
                    type="email"
                    size="small"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="sales@dealership.com"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="मुख्य व्यवसाय शहर *"
                    fullWidth
                    required
                    size="small"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  >
                    {POPULAR_CITIES.map(c => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="स्टोर / यार्ड का पता *"
                    fullWidth
                    required
                    size="small"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="उदा. ट्रांसपोर्ट नगर, यार्ड 4"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="डिलीवरी शहर एवं कवरेज क्षेत्र (अल्पविराम से अलग करें)"
                    fullWidth
                    size="small"
                    value={formData.deliveryLocationsText}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryLocationsText: e.target.value }))}
                    placeholder="उदा. लखनऊ, उन्नाव, बाराबंकी, सीतापुर"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="उपलब्ध सामग्री श्रेणियां (अल्पविराम से अलग करें)"
                    fullWidth
                    size="small"
                    value={formData.materialCategoriesText}
                    onChange={(e) => setFormData(prev => ({ ...prev, materialCategoriesText: e.target.value }))}
                    placeholder="उदा. सीमेंट, सरिया / स्टील, बालू / मौरंग, ईंट, टाइल्स"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="मूल्य निर्धारण मॉडल"
                    fullWidth
                    size="small"
                    value={formData.pricingModel}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricingModel: e.target.value }))}
                    placeholder="उदा. दैनिक मंडी दर / सीधे साइट डिलीवरी"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="न्यूनतम ऑर्डर मात्रा (MOQ)"
                    fullWidth
                    size="small"
                    value={formData.minOrderQty}
                    onChange={(e) => setFormData(prev => ({ ...prev, minOrderQty: e.target.value }))}
                    placeholder="उदा. 50 बोरी / 1 टन / 400 cft"
                  />
                </Grid>

              </Grid>

              <Divider sx={{ my: 3.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => navigate(-1)} sx={{ color: '#64748B', fontWeight: 600 }}>
                  रद्द करें
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send size={18} />}
                  sx={{
                    bgcolor: '#EA580C',
                    color: '#FFF',
                    fontWeight: 800,
                    px: 4,
                    py: 1.25,
                    borderRadius: 2,
                    fontSize: '0.96rem',
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
                    '&:hover': { bgcolor: '#C2410C' }
                  }}
                >
                  सप्लायर प्रोफाइल पंजीकृत करें
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
