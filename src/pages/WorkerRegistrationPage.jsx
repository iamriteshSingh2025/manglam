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
  FormControlLabel,
  Checkbox,
  Switch,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  HardHat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES, WORKER_CATEGORIES } from '../data/mockData';

export const WorkerRegistrationPage = () => {
  const navigate = useNavigate();
  const { addWorker, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'लखनऊ (Lucknow)',
    locality: '',
    primarySkill: 'राज मिस्त्री (चिनाई व ढलाई)',
    additionalSkillsText: 'ईंट चिनाई, प्लास्टर, कॉलम ढलाई',
    experienceYears: '8',
    workTypes: ['दैनिक मजदूरी'],
    expectedWage: '₹950 / दिन',
    workingRadiusKm: '25',
    availableImmediate: true,
    bio: ''
  });

  const [registeredWorker, setRegisteredWorker] = useState(null);

  const workTypeOptions = ['दैनिक मजदूरी', 'प्रोजेक्ट / ठेका कार्य', 'निश्चित दर कार्य', 'प्रति दिन अनुबंध'];

  const primarySkillOptions = [
    'राज मिस्त्री (चिनाई व ढलाई)',
    'सीनियर भवन निर्माण मिस्त्री',
    'निर्माण लेबर / बेलदार',
    'शटरिंग व सेंटरिंग बढ़ई',
    'सरिया / बार बेंडिंग मिस्त्री',
    'पेंटर (आंतरिक व बाहरी)',
    'वॉल पुट्टी कारीगर',
    'वाटरप्रूफिंग विशेषज्ञ',
    'इलेक्ट्रीशियन (हाउस वायरिंग)',
    'कंसील्ड वायरिंग तकनीशियन',
    'प्लंबर (पाइप व सेनेटरी)',
    'बढ़ई (फर्नीचर व किवाड़)',
    'खिड़की-दरवाजा फिटर',
    'टाइल्स एवं मार्बल मिस्त्री',
    'वेल्डिंग कारीगर',
    'साइट हेल्पर'
  ];

  const handleWorkTypeToggle = (wt) => {
    setFormData(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(wt)
        ? prev.workTypes.filter(t => t !== wt)
        : [...prev.workTypes, wt]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('कृपया अपना पूरा नाम और मोबाइल नंबर भरें।');
      return;
    }

    const additionalSkills = formData.additionalSkillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const created = addWorker({
      ...formData,
      additionalSkills
    });

    setRegisteredWorker(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* हेडर */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: '#EA580C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: '0 6px 18px rgba(234, 88, 12, 0.35)' }}>
            <HardHat size={30} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            कारीगर एवं मिस्त्री पंजीकरण
          </Typography>
          <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 800, mb: 1, fontSize: '1.1rem' }}>
            “आपके हुनर को मिले नए काम के अवसर — सीधे घर मालिकों से जुड़ें।”
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
            अपना हुनर और कार्य क्षेत्र दर्ज करें। घर मालिकों और ठेकेदारों से सीधे फोन कॉल प्राप्त करें।
          </Typography>
        </Box>

        {registeredWorker ? (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
              <CheckCircle2 size={42} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              पंजीकरण सफलतापूर्वक दर्ज हुआ!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#EA580C', fontWeight: 800, mb: 2 }}>
              वर्तमान स्थिति: एडमिन भौतिक सत्यापन प्रक्रियाधीन
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3.5, lineHeight: 1.7 }}>
              आपका कारीगर प्रोफाइल <strong>{registeredWorker.name} ({registeredWorker.primarySkill})</strong> सफलतापूर्वक दर्ज हो गया है। हमारी संचालन टीम द्वारा आईडी व पूर्व अनुभव की पुष्टि के बाद आपके प्रोफाइल को "सत्यापित बैज" प्रदान किया जाएगा।
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('worker');
                  navigate('/dashboard/worker');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 800, px: 3.5, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                कारीगर डैशबोर्ड खोलें
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentRole('admin');
                  navigate('/dashboard/admin');
                }}
                sx={{ borderColor: '#0F172A', color: '#0F172A', fontWeight: 700, borderRadius: 2 }}
              >
                एडमिन पोर्टल में सत्यापित करें
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
            <Alert severity="success" icon={<ShieldCheck size={20} />} sx={{ mb: 3.5, fontSize: '0.86rem', borderRadius: 2.5 }}>
              <strong>शून्य पंजीकरण शुल्क:</strong> मंगलम विश्वकर्मा (राका भैया) मंच पर कारीगरों से कोई शुल्क नहीं लिया जाता और आपकी मजदूरी से शून्य कमीशन काटा जाता है।
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="आपका पूरा नाम *"
                    fullWidth
                    required
                    size="small"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="उदा. रामेश्वर यादव"
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
                    helperText="घर मालिक व ठेकेदार इसी नंबर पर कॉल करेंगे"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="कार्य का मुख्य शहर *"
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
                    label="आपका इलाका / बेस क्षेत्र *"
                    fullWidth
                    required
                    size="small"
                    value={formData.locality}
                    onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
                    placeholder="उदा. गोमती नगर, इंदिरानगर"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="प्राथमिक हुनर / ट्रेड *"
                    fullWidth
                    required
                    size="small"
                    value={formData.primarySkill}
                    onChange={(e) => setFormData(prev => ({ ...prev, primarySkill: e.target.value }))}
                  >
                    {primarySkillOptions.map(skill => (
                      <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="काम का अनुभव (वर्ष में)"
                    fullWidth
                    size="small"
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="अन्य कौशल (अल्पविराम से अलग करें)"
                    fullWidth
                    size="small"
                    value={formData.additionalSkillsText}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalSkillsText: e.target.value }))}
                    placeholder="उदा. प्लास्टर, कॉलम ढलाई, नींव खुदाई, वॉल पुट्टी"
                  />
                </Grid>

                {/* कार्य वरीयता */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block', mb: 0.8 }}>
                    कार्य अनुबंध प्राथमिकता:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {workTypeOptions.map(wt => (
                      <FormControlLabel
                        key={wt}
                        control={
                          <Checkbox
                            checked={formData.workTypes.includes(wt)}
                            onChange={() => handleWorkTypeToggle(wt)}
                            color="secondary"
                          />
                        }
                        label={<Typography variant="body2" sx={{ fontWeight: 600 }}>{wt}</Typography>}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="अपेक्षित दैनिक मजदूरी दर (वैकल्पिक)"
                    fullWidth
                    size="small"
                    value={formData.expectedWage}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedWage: e.target.value }))}
                    placeholder="उदा. ₹950 / दिन या ₹45 / प्वाइंट"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="कार्य करने का अधिकतम दायरा (किमी)"
                    fullWidth
                    size="small"
                    type="number"
                    value={formData.workingRadiusKm}
                    onChange={(e) => setFormData(prev => ({ ...prev, workingRadiusKm: e.target.value }))}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.availableImmediate}
                        onChange={(e) => setFormData(prev => ({ ...prev, availableImmediate: e.target.checked }))}
                        color="success"
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontWeight: 700, color: '#16A34A' }}>तुरंत कार्य हेतु उपलब्ध हैं</Typography>}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="संक्षिप्त परिचय / पिछले प्रोजेक्ट्स"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="अपने अनुभव, सहायकों की टीम संख्या अथवा पिछले प्रमुख मकानों के बारे में बताएं..."
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
                  प्रोफाइल पंजीकृत करें
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
