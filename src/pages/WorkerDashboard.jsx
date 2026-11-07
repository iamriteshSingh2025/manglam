import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Switch,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  Alert
} from '@mui/material';
import {
  HardHat,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WorkerDashboard = () => {
  const { workers, toggleWorkerAvailability, requirements, showNotification } = useApp();

  // रमेश यादव डिफ़ॉल्ट डेमो कारीगर
  const myProfile = workers.find(w => w.id === 'w-101') || workers[0];

  // लखनऊ और संबंधित श्रेणी के मेल खाते कार्य
  const matchedEnquiries = requirements.filter(req =>
    req.city?.toLowerCase().includes(myProfile.city?.toLowerCase() || '') ||
    req.serviceCategory?.toLowerCase().includes(myProfile.primarySkill?.toLowerCase() || '')
  );

  // कोटेशन मोडल स्टेट
  const [selectedReq, setSelectedReq] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteDays, setQuoteDays] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  const handleSendQuote = () => {
    if (!quoteAmount) {
      alert('कृपया अपनी प्रस्तावित दर दर्ज करें।');
      return;
    }
    showNotification(`आवश्यकता ${selectedReq.id} के लिए ग्राहक को ${quoteAmount} का कोटेशन सफलतापूर्वक भेजा गया!`, 'success');
    setSelectedReq(null);
    setQuoteAmount('');
    setQuoteDays('');
    setQuoteNotes('');
  };

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* कारीगर हेडर कार्ड */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3.5,
            bgcolor: '#0F172A',
            color: '#FFF',
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2.5,
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box
              sx={{
                width: 62,
                height: 62,
                borderRadius: '50%',
                bgcolor: '#EA580C',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.6rem',
                border: '2px solid #FFF',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)'
              }}
            >
              {myProfile.name.charAt(0)}
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                  {myProfile.name}
                </Typography>
                {myProfile.isVerified ? (
                  <Chip
                    size="small"
                    icon={<ShieldCheck size={14} color="#15803D" />}
                    label="एडमिन द्वारा सत्यापित"
                    sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }}
                  />
                ) : (
                  <Chip size="small" label="सत्यापन प्रक्रियाधीन" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700 }} />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700, mt: 0.3 }}>
                {myProfile.primarySkill} • {myProfile.city} ({myProfile.locality})
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                {myProfile.experienceYears} वर्ष का अनुभव • अपेक्षित मजदूरी: {myProfile.expectedWage}
              </Typography>
            </Box>
          </Box>

          {/* उपलब्धता स्विच */}
          <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', p: 1.5, px: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                काम हेतु स्थिति:
              </Typography>
              <Typography variant="subtitle2" sx={{ color: myProfile.isAvailable ? '#4ADE80' : '#FBBF24', fontWeight: 800 }}>
                {myProfile.isAvailable ? 'नए काम हेतु उपलब्ध' : 'वर्तमान में व्यस्त'}
              </Typography>
            </Box>
            <Switch
              checked={myProfile.isAvailable}
              onChange={() => toggleWorkerAvailability(myProfile.id)}
              color="success"
            />
          </Box>
        </Paper>

        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
          
          {/* बायाँ कॉलम: प्राप्त कार्य आवश्यकताएं */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                  आपके हुनर से जुड़े नए कार्य अवसर
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {myProfile.city} एवं आसपास के ग्राहकों द्वारा पोस्ट की गई सीधी मांग।
                </Typography>
              </Box>
              <Chip label={`${matchedEnquiries.length} नए काम`} sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {matchedEnquiries.map((req) => (
                <Card key={req.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          ग्राहक: {req.customerName} • {req.city} ({req.locality})
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                          {req.requirementType} — {req.serviceCategory}
                        </Typography>
                      </Box>
                      <Chip label={`आईडी: ${req.id}`} size="small" sx={{ bgcolor: '#F1F5F9', fontWeight: 600 }} />
                    </Box>

                    <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                      {req.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, mb: 2, fontSize: '0.82rem', color: '#334155', border: '1px solid #F1F5F9' }}>
                      <span><strong>अनुमानित बजट:</strong> {req.budget}</span>
                      <span><strong>आरंभ तिथि:</strong> {req.preferredStartDate}</span>
                      <span><strong>कार्य स्कोप:</strong> {req.scopeType}</span>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        पोस्टिंग: {req.createdAt}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setSelectedReq(req)}
                        startIcon={<Send size={15} />}
                        sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 1.5, px: 2, '&:hover': { bgcolor: '#C2410C' } }}
                      >
                        कोटेशन व दर भेजें
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* दायाँ कॉलम: प्रोफाइल और कार्य इतिहास */}
          <Grid size={{ xs: 12, md: 4 }}>
            
            {/* हुनर और विशेषताएँ */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                आपकी तकनीकी विशेषताएँ
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                <Chip label={myProfile.primarySkill} sx={{ bgcolor: '#0F172A', color: '#FFF', fontWeight: 700 }} />
                {myProfile.additionalSkills?.map(s => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 600 }} />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5 }}>
                कार्य सीमा (रेडियस):
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                {myProfile.locality} से {myProfile.workingRadiusKm} किमी तक
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5 }}>
                पसंदीदा कार्य प्रकार:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {myProfile.workTypes?.map(wt => (
                  <Chip key={wt} label={wt} size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600 }} />
                ))}
              </Box>
            </Paper>

            {/* कार्य इतिहास */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                सफलतापूर्वक पूर्ण की गई साइटें
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                कामसेतु मंच के माध्यम से किए गए निर्माण कार्य
              </Typography>
              <List dense disablePadding>
                {[
                  { site: 'जी+1 विला ईंट चिनाई कार्य (गोमती नगर)', days: '28 दिन पूर्ण', earnings: '₹26,600' },
                  { site: 'बाउंड्री वॉल व कॉलम सेंटरिंग (इंदिरानगर)', days: '9 दिन पूर्ण', earnings: '₹8,550' },
                  { site: 'दूसरी मंजिल विस्तार चिनाई (अलीगंज)', days: '14 दिन पूर्ण', earnings: '₹13,300' }
                ].map((job, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1.2, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.5 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                        {job.site}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {job.days}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#16A34A', fontSize: '0.86rem' }}>
                      {job.earnings}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

          </Grid>

        </Grid>

        {/* मोडल: कोटेशन भेजें */}
        <Dialog open={Boolean(selectedReq)} onClose={() => setSelectedReq(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            ग्राहक को कोटेशन व दर भेजें
          </DialogTitle>
          <DialogContent dividers>
            {selectedReq && (
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  आवश्यकता <strong>{selectedReq.id}</strong> ({selectedReq.serviceCategory}) हेतु ग्राहक <strong>{selectedReq.customerName}</strong> को प्रस्ताव प्रस्तुत कर रहे हैं।
                </Alert>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                  <TextField
                    label="आपकी दैनिक मजदूरी या कुल ठेका दर *"
                    fullWidth
                    size="small"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="उदा. ₹950/दिन या ₹35,000 कुल लेबर ठेका"
                  />
                  <TextField
                    label="अनुमानित कार्य दिवस"
                    fullWidth
                    size="small"
                    value={quoteDays}
                    onChange={(e) => setQuoteDays(e.target.value)}
                    placeholder="उदा. 10 कार्य दिवस"
                  />
                  <TextField
                    label="ग्राहक के लिए संदेश / विवरण"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="उदा. मेरे साथ 2 कुशल हेल्पर भी रहेंगे। हम बुधवार से कार्य प्रारंभ कर सकते हैं।"
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSelectedReq(null)} sx={{ color: '#64748B' }}>रद्द करें</Button>
            <Button onClick={handleSendQuote} variant="contained" sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700 }}>
              कोटेशन सबमिट करें
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
