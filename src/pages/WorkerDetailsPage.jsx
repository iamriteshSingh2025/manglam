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
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs
} from '@mui/material';
import {
  MapPin,
  Briefcase,
  Star,
  ShieldCheck,
  Phone,
  Calendar,
  CheckCircle2,
  HardHat,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Send,
  Building2,
  Award,
  PhoneCall
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const WorkerDetailsPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, savedWorkers, toggleSaveWorker, showNotification } = useApp();

  const worker = workers.find(w => w.id === id) || workers[0];
  const isSaved = savedWorkers.includes(worker?.id);

  // सीधा संपर्क फॉर्म
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    siteLocation: '',
    workDuration: '',
    notes: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }
    setEnquirySuccess(true);
    showNotification(`${worker.name} को आपका कोटेशन अनुरोध भेज दिया गया है!`, 'success');
  };

  if (!worker) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">कारीगर प्रोफाइल नहीं मिला।</Typography>
        <Button onClick={() => navigate('/workers')} sx={{ mt: 2, color: '#EA580C', fontWeight: 700 }}>
          कारीगर सूची पर वापस जाएँ
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* ब्रेडक्रम्ब्स */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>होम</Link>
          <Link to="/workers" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>कारीगर खोजें</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 800 }}>{worker.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          
          {/* मुख्य प्रोफाइल विवरण */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                mb: 4,
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
              }}
            >
              {/* प्रोफाइल हेडर बॉक्स */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 76,
                      height: 76,
                      borderRadius: 3.5,
                      bgcolor: '#0F172A',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '2rem',
                      border: '3px solid #EA580C',
                      boxShadow: '0 8px 20px rgba(234, 88, 12, 0.3)'
                    }}
                  >
                    {worker.name.charAt(0)}
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.4rem', sm: '1.8rem' } }}>
                        {worker.name}
                      </Typography>
                      {worker.isVerified ? (
                        <Chip
                          icon={<ShieldCheck size={15} color="#15803D" />}
                          label="एडमिन सत्यापित (Verified)"
                          size="small"
                          sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 800, border: '1px solid #86EFAC' }}
                        />
                      ) : (
                        <Chip label={worker.verificationStatus} size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700 }} />
                      )}
                    </Box>

                    <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 800, mt: 0.3 }}>
                      {worker.primarySkill}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mt: 0.8, color: '#64748B', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MapPin size={16} color="#EA580C" />
                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, fontSize: '0.84rem' }}>
                          {worker.city} • {worker.locality}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Briefcase size={16} color="#0F172A" />
                        <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, fontSize: '0.84rem' }}>
                          {worker.experienceYears} वर्ष का अनुभव
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => toggleSaveWorker(worker.id)}
                  startIcon={isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  sx={{
                    borderColor: isSaved ? '#EA580C' : '#CBD5E1',
                    color: isSaved ? '#EA580C' : '#475569',
                    borderRadius: 2,
                    fontWeight: 700
                  }}
                >
                  {isSaved ? 'सेव किया गया' : 'सेव करें'}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* परिचय / बायो */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                कारीगर परिचय एवं कार्य अनुभव
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 3.5, fontSize: '0.98rem' }}>
                {worker.bio}
              </Typography>

              {/* विशेषज्ञता एवं कौशल */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                कौशल एवं तकनीकी विशेषज्ञता
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                <Chip label={worker.primarySkill} sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 800 }} />
                {worker.additionalSkills?.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ bgcolor: '#F1F5F9', color: '#1E293B', fontWeight: 700, border: '1px solid #E2E8F0' }}
                  />
                ))}
              </Box>

              {/* कार्य शर्तें एवं दरें */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                कार्य शर्तें एवं दर प्राथमिकता
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
                      अपेक्षित कार्य दर:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {worker.expectedWage}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
                      कार्य क्षेत्र (त्रिज्या):
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {worker.workingRadiusKm || 25} किमी तक
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
                      वर्तमान उपलब्धता:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: worker.isAvailable ? '#15803D' : '#D97706' }}>
                      {worker.availability}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* प्रोजेक्ट रिकॉर्ड */}
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                प्रोजेक्ट ट्रैक रिकॉर्ड
              </Typography>
              <Box sx={{ p: 2.5, bgcolor: 'rgba(234, 88, 12, 0.05)', borderRadius: 3, border: '1px dashed rgba(234, 88, 12, 0.35)' }}>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontSize: '0.92rem' }}>
                  {worker.city} एवं आसपास के इलाकों में <strong>{worker.projectsCompleted || 40}+ से अधिक निर्माण एवं रिनोवेशन कार्य</strong> सफलतापूर्वक पूरे किए हैं। सही साहुल-सूत (लाइन-लेवल), मजबूत कॉलम बीम और तय समय सीमा में कार्य समाप्त करने के लिए जाने जाते हैं।
                </Typography>
              </Box>

            </Paper>
          </Grid>

          {/* दायां साइडबार: त्वरित संपर्क एवं कोटेशन अनुरोध */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                position: { md: 'sticky' },
                top: { md: 95 },
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                {worker.name} से संपर्क करें
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2.5 }}>
                अपनी साइट का विवरण भेजें और सीधे फोन पर बात या साइट विजिट तय करें।
              </Typography>

              {enquirySuccess ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                    <CheckCircle2 size={32} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                    पूछताछ सफलतापूर्वक भेजी गई!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2.5, lineHeight: 1.5 }}>
                    {worker.name} को आपकी आवश्यकता भेज दी गई है। वे जल्द ही आपसे फोन पर संपर्क करेंगे।
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEnquirySuccess(false)}
                    sx={{ color: '#EA580C', borderColor: '#EA580C', fontWeight: 700 }}
                  >
                    अन्य संदेश भेजें
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="आपका पूरा नाम *"
                      fullWidth
                      size="small"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="उदा. सुरेश बंसल"
                    />
                    <TextField
                      label="मोबाइल नंबर *"
                      fullWidth
                      size="small"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="उदा. 98390 XXXXX"
                    />
                    <TextField
                      label="साइट का पता / इलाका"
                      fullWidth
                      size="small"
                      value={enquiryForm.siteLocation}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, siteLocation: e.target.value }))}
                      placeholder="उदा. अलीगंज, सेक्टर बी"
                    />
                    <TextField
                      label="अपेक्षित कार्य दिवस / अवधि"
                      fullWidth
                      size="small"
                      value={enquiryForm.workDuration}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, workDuration: e.target.value }))}
                      placeholder="उदा. 10 दिन या 2 माह"
                    />
                    <TextField
                      label="काम का विवरण / नोट"
                      multiline
                      rows={3}
                      fullWidth
                      size="small"
                      value={enquiryForm.notes}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="मकान चिनाई, कॉलम ढलाई या प्लास्टरिंग संबंधी विवरण दें..."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{
                        bgcolor: '#EA580C',
                        color: '#FFF',
                        fontWeight: 800,
                        py: 1.25,
                        borderRadius: 2,
                        boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
                        '&:hover': { bgcolor: '#C2410C' }
                      }}
                    >
                      कोटेशन / बातचीत अनुरोध भेजें
                    </Button>
                  </Box>
                </form>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B' }}>
                <Phone size={16} color="#EA580C" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155' }}>
                  हेल्पलाइन: {worker.phone}
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
