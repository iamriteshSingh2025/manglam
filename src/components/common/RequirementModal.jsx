import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
  IconButton,
  Alert,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import { X as CloseIcon, CheckCircle2, HardHat, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_CITIES } from '../../data/mockData';

export const RequirementModal = ({ open, onClose, defaultCategory = '', defaultType = 'नया निर्माण' }) => {
  const navigate = useNavigate();
  const { postRequirement, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    city: 'लखनऊ (Lucknow)',
    locality: '',
    requirementType: defaultType,
    serviceCategory: defaultCategory || 'राज मिस्त्री / भवन निर्माण',
    description: '',
    budget: '',
    preferredStartDate: '1 सप्ताह के अंदर',
    duration: '',
    scopeType: 'सामग्री + लेबर',
  });

  const [submittedRef, setSubmittedRef] = useState(null);

  const requirementTypes = [
    'नया निर्माण',
    'मकान रिनोवेशन',
    'मरम्मत व सुधार कार्य',
    'लेबर / मजदूर आवश्यकता',
    'इलेक्ट्रिकल या प्लंबिंग',
    'पेंटिंग एवं पुट्टी कार्य',
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

    const created = postRequirement(formData);
    setSubmittedRef(created.id);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setFormData({
      customerName: '',
      mobile: '',
      city: 'लखनऊ (Lucknow)',
      locality: '',
      requirementType: defaultType,
      serviceCategory: defaultCategory || 'राज मिस्त्री / भवन निर्माण',
      description: '',
      budget: '',
      preferredStartDate: '1 सप्ताह के अंदर',
      duration: '',
      scopeType: 'सामग्री + लेबर',
    });
    onClose();
  };

  const handleGoToDashboard = () => {
    setCurrentRole('customer');
    handleResetAndClose();
    navigate('/dashboard/customer');
  };

  return (
    <Dialog
      open={open}
      onClose={handleResetAndClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
        }
      }}
    >
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, bgcolor: '#0F172A', color: '#FFF' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)' }}>
            <HardHat size={24} color="#FFF" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, fontSize: '1.1rem' }}>
              अपनी निर्माण आवश्यकता पोस्ट करें
            </Typography>
            <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 600 }}>
              अपने शहर के सत्यापित मिस्त्री, ठेकेदार व सीधे सप्लायर से निशुल्क कोटेशन पाएं
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleResetAndClose} size="small" sx={{ color: '#94A3B8' }}>
          <CloseIcon size={22} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#E2E8F0', py: 3, bgcolor: '#F8FAFC' }}>
        {submittedRef ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={42} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              आपकी आवश्यकता सफलतापूर्वक पोस्ट हो गई!
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
              आपकी संदर्भ संख्या (रेफरेंस आईडी):
            </Typography>
            <Chip
              label={submittedRef}
              sx={{
                bgcolor: '#0F172A',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '1.2rem',
                py: 2.8,
                px: 2.5,
                borderRadius: 2.5,
                mb: 3,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            />
            <Alert severity="success" icon={<ShieldCheck size={20} />} sx={{ maxWidth: 620, mx: 'auto', textAlign: 'left', mb: 3, borderRadius: 2.5 }}>
              <strong>सीधी बातचीत:</strong> आपकी आवश्यकता हमारे सत्यापित कारीगर नेटवर्क को प्रसारित कर दी गई है। उपयुक्त ठेकेदार और मिस्त्री आपसे सीधे फोन पर बात करेंगे।
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleGoToDashboard}
                endIcon={<ArrowRight size={16} />}
                sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700, px: 3.5, py: 1.2, borderRadius: 2.5 }}
              >
                ग्राहक डैशबोर्ड में ट्रैक करें
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetAndClose}
                sx={{ borderColor: '#CBD5E1', color: '#475569', fontWeight: 700, borderRadius: 2.5 }}
              >
                होम पेज पर लौटें
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Alert severity="info" icon={<ShieldCheck size={18} />} sx={{ mb: 3, borderRadius: 2.5, fontSize: '0.82rem', bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <strong>पारदर्शी प्रक्रिया:</strong> अपनी आवश्यकता का सही-सही विवरण दर्ज करें ताकि सही कारीगर या सप्लायर तुरंत आपसे संपर्क कर सकें।
            </Alert>

            <Grid container spacing={2.2}>
              {/* नाम */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="आपका पूरा नाम *"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="उदा. रमेश कुमार / विवेक सिंघानिया"
                />
              </Grid>

              {/* मोबाइल */}
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
                  helperText="कारीगर व सप्लायर इस नंबर पर सीधे संपर्क करेंगे"
                />
              </Grid>

              {/* शहर */}
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

              {/* इलाका */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="इलाका / लैंडमार्क *"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="उदा. गोमती नगर, शहीद पथ, सेक्टर 4"
                />
              </Grid>

              {/* कार्य प्रकार */}
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

              {/* श्रेणी */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="सेवा अथवा ट्रेड श्रेणी *"
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

              {/* स्कोप मोड */}
              <Grid size={{ xs: 12 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                    ठेका / अनुबंध का प्रकार:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="scopeType"
                    value={formData.scopeType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="केवल लेबर" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>केवल लेबर (Labour Only)</Typography>} />
                    <FormControlLabel value="केवल सामग्री" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>केवल सामग्री (Material Only)</Typography>} />
                    <FormControlLabel value="सामग्री + लेबर" control={<Radio size="small" color="secondary" />} label={<Typography variant="body2" sx={{ fontWeight: 700, color: '#EA580C' }}>सामग्री + लेबर (टर्नकी ठेका)</Typography>} />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* विवरण */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="काम का पूरा विवरण *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  placeholder="प्लॉट साइज (जैसे 1500 वर्ग फीट), कमरों की संख्या, कॉलम ढलाई, 9 इंच ईंट चिनाई, दैनिक मजदूरी या कोई विशेष आवश्यकता लिखें..."
                />
              </Grid>

              {/* अनुमानित बजट */}
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

              {/* कार्य शुरू करने का समय */}
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
                  <MenuItem value="तुरंत (24-48 घंटे)">तुरंत (24-48 घंटे में)</MenuItem>
                  <MenuItem value="1 सप्ताह के अंदर">1 सप्ताह के अंदर</MenuItem>
                  <MenuItem value="15 दिन के अंदर">15 दिन के अंदर</MenuItem>
                  <MenuItem value="अगले महीने / योजना स्तर">अगले महीने</MenuItem>
                </TextField>
              </Grid>

              {/* अनुमानित कार्य अवधि */}
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

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button onClick={handleResetAndClose} sx={{ color: '#64748B', fontWeight: 600 }}>
                रद्द करें
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#EA580C',
                  color: '#FFF',
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.1,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
                  '&:hover': { bgcolor: '#C2410C' }
                }}
              >
                आवश्यकता पोस्ट करें
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
