import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  List,
  ListItem
} from '@mui/material';
import {
  FileText,
  Clock,
  PlusCircle,
  MapPin,
  Bookmark,
  Building2,
  HardHat,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CustomerDashboard = ({ onOpenPostModal }) => {
  const navigate = useNavigate();
  const { requirements, workers, savedWorkers, updateRequirementStatus } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const getStatusHindi = (status) => {
    switch (status) {
      case 'New': return { label: 'नई आवश्यकता', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
      case 'Under Review': return { label: 'समीक्षाधीन', bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Assigned': return { label: 'मिस्त्री आवंटित', bg: '#F3E8FF', color: '#7E22CE', border: '#E9D5FF' };
      case 'Provider Contacted': return { label: 'संपर्क स्थापित', bg: '#E0F2FE', color: '#0369A1', border: '#BAE6FD' };
      case 'Quotation Received': return { label: 'कोटेशन प्राप्त', bg: '#FFEDD5', color: '#C2410C', border: '#FED7AA' };
      case 'Confirmed': return { label: 'पुष्टि हो चुकी', bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' };
      case 'In Progress': return { label: 'कार्य प्रगति पर', bg: '#CCFBF1', color: '#0F766E', border: '#99F6E4' };
      case 'Completed': return { label: 'सफलतापूर्वक पूर्ण', bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      default: return { label: status, bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
    }
  };

  const bookmarkedWorkers = workers.filter(w => savedWorkers.includes(w.id));

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* हेडर */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="मकान मालिक / ग्राहक पोर्टल" size="small" sx={{ bgcolor: '#3B82F6', color: '#FFF', fontWeight: 700 }} />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                लॉगिन खाता: विवेक सिंघानिया (लखनऊ)
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
              मेरा निर्माण एवं कारीगर डैशबोर्ड
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
            startIcon={<PlusCircle size={18} />}
            sx={{
              bgcolor: '#EA580C',
              fontWeight: 700,
              px: { xs: 2, sm: 3 },
              py: 1.2,
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
              '&:hover': { bgcolor: '#C2410C' }
            }}
          >
            नई आवश्यकता पोस्ट करें
          </Button>
        </Box>

        {/* डैशबोर्ड टैब्स */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 4, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: { xs: '0.85rem', sm: '0.92rem' }, minHeight: 56 },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C', height: 3 }
            }}
          >
            <Tab label={`मेरी पोस्ट की गई आवश्यकताएं (${requirements.length})`} />
            <Tab label={`सहेजे गए कारीगर व मिस्त्री (${bookmarkedWorkers.length})`} />
            <Tab label="प्राप्त कोटेशन एवं बातचीत" />
          </Tabs>
        </Paper>

        {/* टैब 0: पोस्ट की गई आवश्यकताएं */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {requirements.map((req) => {
              const statusStyle = getStatusHindi(req.status);
              return (
                <Grid key={req.id} size={{ xs: 12, md: 6 }}>
                  <Card sx={{ borderRadius: 3.5, border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* टॉप रो: रेफरेंस आईडी और स्टेटस */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          रेफरेंस संख्या: {req.id}
                        </Typography>
                        <Chip
                          label={statusStyle.label}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                            fontWeight: 700,
                            fontSize: '0.74rem'
                          }}
                        />
                      </Box>

                      {/* आवश्यकता शीर्षक */}
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, lineHeight: 1.3 }}>
                        {req.requirementType} — {req.serviceCategory}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#64748B', fontSize: '0.82rem', mb: 2, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MapPin size={14} color="#EA580C" />
                          <span>{req.city} ({req.locality})</span>
                        </Box>
                        <span>•</span>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Clock size={14} />
                          <span>पोस्ट किया गया: {req.createdAt}</span>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: '#475569', mb: 2.5, lineHeight: 1.6, flex: 1 }}>
                        {req.description}
                      </Typography>

                      {/* विवरण बॉक्स */}
                      <Box sx={{ bgcolor: '#F8FAFC', p: 1.75, borderRadius: 2, border: '1px solid #F1F5F9', mb: 2 }}>
                        <Grid container spacing={1.5}>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              कार्य का प्रकार:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                              {req.scopeType}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              अनुमानित बजट:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                              {req.budget}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              आवंटित मिस्त्री / ठेकेदार:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#EA580C' }}>
                              {req.assignedProvider || 'समीक्षा की जा रही है (शीघ्र आवंटन)'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* नोट्स */}
                      {req.notes && (
                        <Typography variant="caption" sx={{ color: '#64748B', fontStyle: 'italic', display: 'block', mb: 2 }}>
                          नवीनतम अपडेट: {req.notes}
                        </Typography>
                      )}

                      <Divider sx={{ mb: 2, mt: 'auto' }} />

                      {/* एक्शन बटन */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => {
                            const newStatus = req.status === 'Completed' ? 'In Progress' : 'Completed';
                            updateRequirementStatus(req.id, newStatus);
                          }}
                          sx={{ color: '#64748B', fontSize: '0.8rem', textTransform: 'none' }}
                        >
                          {req.status === 'Completed' ? 'आवश्यकता पुनः खोलें' : 'पूर्ण चिह्नित करें'}
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate('/workers')}
                          sx={{ borderColor: '#EA580C', color: '#EA580C', fontWeight: 700, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(234, 88, 12, 0.08)' } }}
                        >
                          और कारीगर खोजें
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* टैब 1: सहेजे गए कारीगर */}
        {activeTab === 1 && (
          <Box>
            {bookmarkedWorkers.length === 0 ? (
              <Paper sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF' }}>
                <Bookmark size={44} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  अभी तक कोई कारीगर सहेजा नहीं गया है।
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, maxWidth: 450, mx: 'auto' }}>
                  किसी भी कारीगर कार्ड पर बुकमार्क आइकन दबाकर उन्हें अपनी पसंदीदा सूची में जोड़ें।
                </Typography>
                <Button component={Link} to="/workers" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700 }}>
                  कारीगर डायरेक्टरी देखें
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {bookmarkedWorkers.map(w => (
                  <Grid key={w.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                            {w.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                            {w.primarySkill}
                          </Typography>
                        </Box>
                        <Chip size="small" label={w.city} sx={{ bgcolor: '#F1F5F9', fontWeight: 600 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                        {w.experienceYears} वर्ष का अनुभव • अनुमानित मजदूरी: {w.expectedWage}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/workers/${w.id}`}
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{ bgcolor: '#0F172A', fontWeight: 700, mt: 'auto', borderRadius: 1.5 }}
                      >
                        प्रोफाइल देखें एवं संपर्क करें
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* टैब 2: कोटेशन एवं बातचीत */}
        {activeTab === 2 && (
          <Paper sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
              सक्रिय कोटेशन एवं दर बातचीत
            </Typography>
            <List disablePadding>
              {[
                { provider: 'दिनेश वर्मा (पेंटर मिस्त्री)', service: '3 बीएचके फ्लैट रीपेंटिंग एवं पुट्टी', rate: '₹42,000 कुल लेबर अनुबंध', status: 'स्वीकृति हेतु तैयार' },
                { provider: 'शर्मा कंस्ट्रक्शंस एवं सिविल वर्क्स', service: 'जी+1 डुप्लेक्स टर्नकी मकान निर्माण', rate: '₹1,550 / वर्ग फीट निर्मित क्षेत्र', status: 'साइट विज़िट पूरी हुई' },
                { provider: 'अल्ट्राबिल्ड मटेरियल डिपो', service: '400 बोरी PPC सीमेंट + 15 टन TMT सरिया', rate: '₹380/बोरी + ₹68,500/टन', status: 'थोक डिलीवरी कोटेशन' },
              ].map((item, idx) => (
                <ListItem key={idx} sx={{ p: 2, mb: 1.5, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {item.provider}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      प्रोजेक्ट: {item.service} • प्रस्तावित दर: <strong style={{ color: '#16A34A' }}>{item.rate}</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip size="small" label={item.status} sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    <Button size="small" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 1.5, '&:hover': { bgcolor: '#C2410C' } }}>
                      स्वीकार करें व बात करें
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
