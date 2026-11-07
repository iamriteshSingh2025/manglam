import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem
} from '@mui/material';
import {
  Building2,
  Users,
  HardHat,
  PlusCircle,
  MapPin,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ContractorDashboard = () => {
  const { contractors, workers, showNotification } = useApp();
  const myContractor = contractors[0] || {
    businessName: 'शर्मा कंस्ट्रक्शंस एवं सिविल वर्क्स',
    contactPerson: 'ई. आशुतोष शर्मा',
    city: 'लखनऊ',
    teamSize: '35 कुशल कारीगर एवं मिस्त्री'
  };

  // मजदूर भर्ती आवश्यकता स्टेट
  const [labourModalOpen, setLabourModalOpen] = useState(false);
  const [labourReq, setLabourReq] = useState({
    skillNeeded: 'राज मिस्त्री एवं चिनाई हेल्पर',
    headcount: '6 मिस्त्री + 10 हेल्पर',
    siteLocation: 'गोमती नगर विस्तार, लखनऊ',
    durationDays: '20 कार्य दिवस',
    dailyRateOffered: '₹950 / मिस्त्री एवं ₹500 / हेल्पर'
  });

  const [activeHiringPosts, setActiveHiringPosts] = useState([
    {
      id: 'LBR-101',
      skillNeeded: 'सरिया मोड़ाई / बार बेंडिंग मिस्त्री',
      headcount: '4 कुशल मिस्त्री',
      siteLocation: 'शहीद पथ साइट, लखनऊ',
      durationDays: '12 दिन',
      dailyRateOffered: '₹900 / दिन',
      applicantsCount: 6,
      status: 'भर्ती जारी है'
    },
    {
      id: 'LBR-102',
      skillNeeded: 'शटरिंग बढ़ई (कारपेंटर)',
      headcount: '8 कारीगर',
      siteLocation: 'इंदिरानगर कमर्शियल प्लाजा',
      durationDays: '15 दिन',
      dailyRateOffered: '₹900 / दिन',
      applicantsCount: 11,
      status: 'भर्ती जारी है'
    }
  ]);

  const handlePostLabourReq = (e) => {
    e.preventDefault();
    const newPost = {
      id: `LBR-${Math.floor(100 + Math.random() * 900)}`,
      ...labourReq,
      applicantsCount: 0,
      status: 'भर्ती जारी है'
    };
    setActiveHiringPosts(prev => [newPost, ...prev]);
    showNotification('कारीगर आवश्यकता सफलतापूर्वक पोस्ट हुई! नजदीकी मिस्त्रियों को अलर्ट भेजा गया है।', 'success');
    setLabourModalOpen(false);
  };

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* हेडर बैनर */}
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
                width: 60,
                height: 60,
                borderRadius: 2.5,
                bgcolor: '#8B5CF6',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}
            >
              <Building2 size={32} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                {myContractor.businessName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#C4B5FD', fontWeight: 600 }}>
                ठेकेदार: {myContractor.contactPerson} • मुख्यालय: {myContractor.city}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                कार्यकारी टीम: {myContractor.teamSize} • सत्यापित सिविल कंस्ट्रक्शन लाइसेंस
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => setLabourModalOpen(true)}
            startIcon={<PlusCircle size={18} />}
            sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
          >
            कारीगर / मिस्त्री टीम हायर करें
          </Button>
        </Paper>

        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
          
          {/* सक्रिय साइटें */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
              सक्रिय निर्माण साइटें
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
              {[
                { title: 'जी+2 लक्ज़री आवासीय डुप्लेक्स विला', location: 'गोमती नगर, सेक्टर 4', progress: 'स्लैब शटरिंग एवं सरिया जाल बाइंडिंग', crew: '14 कारीगर सक्रिय', budget: '₹42,00,000' },
                { title: 'कमर्शियल रिटेल शोरूम स्ट्रक्चर निर्माण', location: 'वाराणसी रिंग रोड', progress: 'प्रथम तल ईंट चिनाई कार्य', crew: '18 कारीगर सक्रिय', budget: '₹75,00,000' }
              ].map((site, i) => (
                <Card key={i} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {site.title}
                      </Typography>
                      <Chip label="कार्य प्रगति पर" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B', fontSize: '0.85rem', mb: 1.5 }}>
                      <MapPin size={15} color="#EA580C" />
                      <span>{site.location}</span>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                      वर्तमान माइलस्टोन: <strong>{site.progress}</strong> • तैनात टीम: {site.crew}
                    </Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        अनुबंध मूल्य: <strong style={{ color: '#0F172A' }}>{site.budget}</strong>
                      </Typography>
                      <Button size="small" sx={{ color: '#EA580C', fontWeight: 700 }}>
                        साइट लॉग एवं दैनिक हाजिरी देखें →
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* ठेकेदार द्वारा पोस्ट की गई कारीगर भर्तियाँ */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
              आपकी कारीगर भर्ती पोस्ट्स
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activeHiringPosts.map((post) => (
                <Card key={post.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {post.skillNeeded} ({post.headcount})
                      </Typography>
                      <Chip label={post.status} size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                      📍 {post.siteLocation} • अवधि: {post.durationDays} • प्रस्तावित दर: {post.dailyRateOffered}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, pt: 1, borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#16A34A' }}>
                        {post.applicantsCount} कारीगरों ने आवेदन किया
                      </Typography>
                      <Button size="small" variant="outlined" sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                        आवेदनकर्ताओं की सूची देखें
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

          </Grid>

          {/* दायाँ कॉलम: टीम संसाधन एवं डायरेक्ट सोर्सिंग */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                ठेकेदारी टीम एवं मशीनरी संसाधन
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                शर्मा सिविल वर्क्स के तहत उपलब्ध कुल श्रम शक्ति
              </Typography>
              <List dense disablePadding>
                {[
                  { trade: 'मुख्य हेड राज मिस्त्री', count: '6 स्थायी' },
                  { trade: 'बार बेंडिंग / सेंटरिंग उस्ताद', count: '4 स्थायी' },
                  { trade: 'कुशल शटरिंग बढ़ई', count: '8 ऑन-कॉल' },
                  { trade: 'चिनाई लेबर व हेल्पर', count: '17 ऑन-कॉल' },
                  { trade: 'कंक्रीट मिक्सर व शटरिंग प्लेट्स', count: '2 मशीन + 5,000 वर्ग फीट प्लेट' }
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>
                      {item.trade}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.count}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                त्वरित सामग्री एवं कारीगर सोर्सिंग
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                कामसेतु मंच से सीधे सामग्री और सब-कांट्रैक्टर मंगाएं
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button component={Link} to="/materials" variant="outlined" fullWidth sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                  थोक सीमेंट एवं TMT सरिया ऑर्डर करें
                </Button>
                <Button component={Link} to="/workers" variant="outlined" fullWidth sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                  स्पेशलिस्ट इलेक्ट्रीशियन व प्लंबर खोजें
                </Button>
              </Box>
            </Paper>

          </Grid>

        </Grid>

        {/* मोडल: कारीगर भर्ती आवश्यकता पोस्ट करें */}
        <Dialog open={labourModalOpen} onClose={() => setLabourModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            साइट हेतु कारीगर / मिस्त्री आवश्यकता पोस्ट करें
          </DialogTitle>
          <form onSubmit={handlePostLabourReq}>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="आवश्यक हुनर / कारीगर श्रेणी *"
                  fullWidth
                  required
                  value={labourReq.skillNeeded}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, skillNeeded: e.target.value }))}
                  placeholder="उदा. शटरिंग कारपेंटर एवं सरिया हेल्पर"
                />
                <TextField
                  label="आवश्यक कारीगरों की संख्या *"
                  fullWidth
                  required
                  value={labourReq.headcount}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, headcount: e.target.value }))}
                  placeholder="उदा. 8 मिस्त्री + 12 हेल्पर"
                />
                <TextField
                  label="निर्माण साइट का स्थान (इलाका / शहर) *"
                  fullWidth
                  required
                  value={labourReq.siteLocation}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, siteLocation: e.target.value }))}
                  placeholder="उदा. शहीद पथ, सेक्टर 7, लखनऊ"
                />
                <TextField
                  label="कार्य अवधि (दिन / सप्ताह) *"
                  fullWidth
                  required
                  value={labourReq.durationDays}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, durationDays: e.target.value }))}
                  placeholder="उदा. 15 कार्य दिवस"
                />
                <TextField
                  label="प्रस्तावित दैनिक मजदूरी या दर *"
                  fullWidth
                  required
                  value={labourReq.dailyRateOffered}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, dailyRateOffered: e.target.value }))}
                  placeholder="उदा. ₹950/दिन (मिस्त्री), ₹500/दिन (हेल्पर)"
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setLabourModalOpen(false)} sx={{ color: '#64748B' }}>रद्द करें</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
                कारीगरों को जॉब अलर्ट भेजें
              </Button>
            </DialogActions>
          </form>
        </Dialog>

      </Container>
    </Box>
  );
};
