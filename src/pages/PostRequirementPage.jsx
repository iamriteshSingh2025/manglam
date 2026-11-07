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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  HardHat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const PostRequirementPage = () => {
  const navigate = useNavigate();
  const { postRequirement, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    city: 'लखनऊ (Lucknow)',
    locality: '',
    requirementType: 'नया निर्माण',
    serviceCategory: 'राज मिस्त्री / भवन निर्माण',
    description: '',
    budget: '',
    preferredStartDate: '1 सप्ताह के अंदर',
    duration: '',
    scopeType: 'सामग्री + लेबर'
  });

  const [createdRef, setCreatedRef] = useState(null);

  const requirementTypes = [
    'नया निर्माण',
    'मकान रिनोवेशन',
    'मरम्मत व सुधार कार्य',
    'लेबर / मजदूर आवश्यकता',
    'इलेक्ट्रिकल या प्लंबिंग',
    'पेंटिंग एवं फिनिशिंग',
    'निर्माण सामग्री खरीद',
    'ठेकेदार आवश्यकता',
    'अन्य सिविल कार्य'
  ];

  const categoryOptions = [
    'राज मिस्त्री / भवन निर्माण',
    'बिल्डिंग मिस्त्री एवं चिनाई',
    'शटरिंग बढ़ई व सरिया बाइंडिंग',
    'पेंटर एवं वॉल पुट्टी कारीगर',
    'इलेक्ट्रीशियन व हाउस वायरिंग',
    'प्लंबर व सेनेटरी फिटिंग',
    'टाइल्स, मार्बल व ग्रेनाइट कार्य',
    'छत वाटरप्रूफिंग व सीलन उपचार',
    'वेल्डिंग, ग्रिल व फैब्रिकेशन',
    'सीमेंट, बालू व मौरंग आपूर्ति',
    'सरिया (TMT Rebar) थोक खरीद',
    'सामान्य निर्माण श्रमिक (लेबर)'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile || !formData.description) {
      alert('कृपया आवश्यक विवरण भरें: आपका नाम, मोबाइल नंबर और काम का विवरण।');
      return;
    }

    const res = postRequirement(formData);
    setCreatedRef(res.id);
  };

  const handleGoToCustomerDashboard = () => {
    setCurrentRole('customer');
    navigate('/dashboard/customer');
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* पेज हेडर */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: '#EA580C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: '0 6px 18px rgba(234, 88, 12, 0.35)' }}>
            <FileText size={28} />
          </Box>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            निशुल्क निर्माण कोटेशन
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            अपनी निर्माण आवश्यकता पोस्ट करें
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
            अपने प्रोजेक्ट का विवरण दर्ज करें और अपने शहर के सत्यापित मिस्त्री, ठेकेदार व सप्लायर से सीधे कोटेशन प्राप्त करें।
          </Typography>
        </Box>

        {createdRef ? (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
              <CheckCircle2 size={42} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              आवश्यकता सफलतापूर्वक पोस्ट हो गई!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 2 }}>
              आपकी आवश्यकता संदर्भ संख्या:
            </Typography>
            <Chip
              label={createdRef}
              sx={{
                bgcolor: '#0F172A',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '1.25rem',
                py: 2.8,
                px: 3,
                borderRadius: 2.5,
                mb: 3
              }}
            />
            <Alert severity="success" icon={<ShieldCheck size={20} />} sx={{ maxWidth: 560, mx: 'auto', textAlign: 'left', mb: 4, borderRadius: 2.5 }}>
              <strong>सीधी बातचीत:</strong> आपकी निर्माण आवश्यकता संबंधित क्षेत्र के सत्यापित कारीगरों को भेज दी गई है। उपयुक्त कारीगर या ठेकेदार आपसे सीधे फोन पर बातचीत करेंगे।
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleGoToCustomerDashboard}
                endIcon={<ArrowRight size={16} />}
                sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 800, px: 3.5, py: 1.2, borderRadius: 2 }}
              >
                ग्राहक डैशबोर्ड में ट्रैक करें
              </Button>
              <Button
                variant="outlined"
                onClick={() => setCreatedRef(null)}
                sx={{ borderColor: '#CBD5E1', color: '#475569', fontWeight: 700, borderRadius: 2 }}
              >
                अन्य आवश्यकता पोस्ट करें
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            
            <Alert severity="info" icon={<ShieldCheck size={18} />} sx={{ mb: 3.5, borderRadius: 2.5, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <strong>पारदर्शी सीधा मंच:</strong> कारीगरों की मजदूरी से शून्य कमीशन काटा जाता है। साइट का सही नाप और दायरा दर्ज करें ताकि सटीक अनुमान प्राप्त हो सके।
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="आपका पूरा नाम *"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    required
                    placeholder="उदा. विवेक सिंघानिया"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="मोबाइल नंबर *"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    required
                    placeholder="उदा. 98390 XXXXX"
                    helperText="सत्यापित कारीगर इस नंबर पर संपर्क करेंगे"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="शहर / जिला *"
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

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="साइट का इलाका / लैंडमार्क *"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    required
                    placeholder="उदा. शहीद पथ, सेक्टर 4"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="आवश्यकता का प्रकार *"
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

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="ट्रेड / सेवा श्रेणी *"
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

                {/* स्कोप प्रकार */}
                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                      अनुबंध का दायरा (Scope Type):
                    </FormLabel>
                    <RadioGroup row name="scopeType" value={formData.scopeType} onChange={handleChange}>
                      <FormControlLabel value="केवल लेबर" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>केवल लेबर (Labour Only)</Typography>} />
                      <FormControlLabel value="केवल सामग्री" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>केवल सामग्री (Material Only)</Typography>} />
                      <FormControlLabel value="सामग्री + लेबर" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 800, color: '#EA580C' }}>सामग्री + लेबर (टर्नकी ठेका)</Typography>} />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="काम का पूरा विवरण *"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3.5}
                    required
                    placeholder="प्लॉट साइज, कमरों की संख्या, कॉलम ढलाई, 9 इंच ईंट चिनाई, दैनिक दर अथवा कोई विशेष आवश्यकता लिखें..."
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="अनुमानित बजट (₹ वैकल्पिक)"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="जैसे 50,000 या 25,00,000"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    select
                    label="काम कब शुरू करना है?"
                    name="preferredStartDate"
                    value={formData.preferredStartDate}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="तुरंत (24-48 घंटे)">तुरंत (24-48 घंटे)</MenuItem>
                    <MenuItem value="1 सप्ताह के अंदर">1 सप्ताह के अंदर</MenuItem>
                    <MenuItem value="15 दिन के अंदर">15 दिन के अंदर</MenuItem>
                    <MenuItem value="अगले महीने">अगले महीने</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="अनुमानित कार्य अवधि"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="जैसे 15 दिन या 4 माह"
                  />
                </Grid>

              </Grid>

              <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => navigate('/')} sx={{ color: '#64748B', fontWeight: 600 }}>
                  रद्द करें
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send size={16} />}
                  sx={{
                    bgcolor: '#EA580C',
                    color: '#FFF',
                    fontWeight: 800,
                    px: 3.5,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
                    '&:hover': { bgcolor: '#C2410C' }
                  }}
                >
                  आवश्यकता पोस्ट करें
                </Button>
              </Box>

            </form>
          </Paper>
        )}
      </Container>
    </Box>
  );
};
