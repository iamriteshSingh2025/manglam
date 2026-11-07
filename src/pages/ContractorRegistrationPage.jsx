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
import { Building2, CheckCircle2, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const ContractorRegistrationPage = () => {
  const navigate = useNavigate();
  const { addContractor, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobile: '',
    city: 'लखनऊ (Lucknow)',
    serviceArea: 'लखनऊ, कानपुर, अयोध्या',
    teamSize: '25-40 कुशल कारीगर व मिस्त्री',
    servicesOfferedText: 'नया मकान निर्माण, टर्नकी सिविल प्रोजेक्ट्स, आरसीसी फ्रेमिंग',
    projectTypeText: 'आवासीय डुप्लेक्स, कमर्शियल कॉम्प्लेक्स, बाउंड्री वॉल',
    description: ''
  });

  const [registered, setRegistered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactPerson || !formData.mobile) {
      alert('कृपया अपनी फर्म का नाम, संपर्क व्यक्ति का नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }

    const servicesOffered = formData.servicesOfferedText.split(',').map(s => s.trim()).filter(Boolean);
    const projectType = formData.projectTypeText.split(',').map(s => s.trim()).filter(Boolean);

    const created = addContractor({
      ...formData,
      servicesOffered,
      projectType
    });

    setRegistered(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* हेडर */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: '#0F172A', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.25)' }}>
            <Building2 size={28} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            सिविल ठेकेदार ऑनबोर्डिंग
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
            अपनी सिविल कंस्ट्रक्शन फर्म को पंजीकृत करें। आवासीय व कमर्शियल टर्नकी प्रोजेक्ट टेंडर्स पाएं और थोक लेबर हायरिंग आवश्यकता पोस्ट करें।
          </Typography>
        </Box>

        {registered ? (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
              <CheckCircle2 size={42} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              आवेदन सफलतापूर्वक दर्ज हुआ!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3.5, lineHeight: 1.7 }}>
              आपकी फर्म <strong>{registered.businessName}</strong> का विवरण दर्ज कर लिया गया है। आप अपने ठेकेदार डैशबोर्ड में प्रोजेक्ट्स और लेबर मांग प्रबंधित कर सकते हैं।
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('contractor');
                  navigate('/dashboard/contractor');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 800, px: 3.5, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                ठेकेदार डैशबोर्ड खोलें
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            
            <Alert severity="info" icon={<ShieldCheck size={18} />} sx={{ mb: 3.5, borderRadius: 2.5, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <strong>सीधा संपर्क मंच:</strong> बिल्डरों व घर मालिकों से सीधे प्रोजेक्ट टेंडर्स प्राप्त करें। कोई मध्यस्थ नहीं।
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="फर्म / व्यावसायिक नाम *"
                    fullWidth
                    required
                    size="small"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="उदा. शर्मा कंस्ट्रक्शंस एंड सिविल वर्क्स"
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
                    placeholder="उदा. इंजीनियर आशुतोष शर्मा"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="मोबाइल नंबर *"
                    fullWidth
                    required
                    size="small"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="उदा. 98390 XXXXX"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="मुख्य मुख्यालय शहर *"
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
                    label="कार्य कवरेज क्षेत्र (जिले)"
                    fullWidth
                    size="small"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceArea: e.target.value }))}
                    placeholder="उदा. लखनऊ, कानपुर, अयोध्या"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="कुल कारीगर / मजदूर दल संख्या"
                    fullWidth
                    size="small"
                    value={formData.teamSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                    placeholder="उदा. 35 कुशल कारीगर व मिस्त्री"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="प्रदत्त सेवाएँ (अल्पविराम से अलग करें)"
                    fullWidth
                    size="small"
                    value={formData.servicesOfferedText}
                    onChange={(e) => setFormData(prev => ({ ...prev, servicesOfferedText: e.target.value }))}
                    placeholder="उदा. नया मकान निर्माण, टर्नकी सिविल प्रोजेक्ट्स, आरसीसी फ्रेमिंग"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="फर्म का अनुभव एवं पूर्व प्रमुख प्रोजेक्ट्स"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="अनुभव के वर्ष, मशीनरी (कंक्रीट मिक्सर, लिफ्ट, शटरिंग प्लेट्स) एवं पूर्ण किए गए विला या कमर्शियल भवनों का विवरण दें..."
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
                  ठेकेदार प्रोफाइल पंजीकृत करें
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
