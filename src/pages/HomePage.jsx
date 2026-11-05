import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  HardHat,
  Search,
  MapPin,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  PhoneCall,
  ChevronRight,
  Layers,
  Award,
  Truck,
  FileText,
  Star,
  Quote
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WORKER_CATEGORIES, POPULAR_CITIES } from '../data/mockData';
import { WorkerCard } from '../components/common/WorkerCard';
import { ServiceCard } from '../components/common/ServiceCard';
import { MaterialCard } from '../components/common/MaterialCard';

export const HomePage = ({ onOpenPostModal, onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const { workers, services, materials, activeCity, setActiveCity, postRequirement } = useApp();

  // त्वरित खोज स्टेट
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCity, setSearchCity] = useState('सभी शहर (अखिल भारत)');
  const [searchWorkType, setSearchWorkType] = useState('नया निर्माण');
  const [searchKeyword, setSearchKeyword] = useState('');

  // प्रक्रिया टैब
  const [howItWorksTab, setHowItWorksTab] = useState(0);

  // श्रेणी दृश्य टैब
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(0);

  // कारीगर फ़िल्टर टैब
  const [workerFilterTab, setWorkerFilterTab] = useState('सभी');

  // इनलाइन आवश्यकता फॉर्म
  const [quickReq, setQuickReq] = useState({
    name: '',
    phone: '',
    category: 'राज मिस्त्री / भवन निर्माण',
    description: '',
    city: 'लखनऊ (Lucknow)'
  });
  const [quickReqSuccess, setQuickReqSuccess] = useState(null);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword) params.append('query', searchKeyword);
    if (searchCategory) params.append('category', searchCategory);
    if (searchCity && !searchCity.includes('सभी')) params.append('city', searchCity);
    if (searchWorkType) params.append('workType', searchWorkType);

    navigate(`/workers?${params.toString()}`);
  };

  const handleQuickReqSubmit = (e) => {
    e.preventDefault();
    if (!quickReq.name || !quickReq.phone || !quickReq.description) {
      alert('कृपया अपना नाम, मोबाइल नंबर और काम का विवरण भरें।');
      return;
    }
    const created = postRequirement({
      customerName: quickReq.name,
      mobile: quickReq.phone,
      serviceCategory: quickReq.category,
      description: quickReq.description,
      city: quickReq.city,
      requirementType: 'त्वरित आवश्यकता',
      scopeType: 'सामग्री + लेबर'
    });
    setQuickReqSuccess(created.id);
  };

  const filteredWorkers = workers.filter(w => {
    if (workerFilterTab === 'सभी') return true;
    return w.primarySkill.toLowerCase().includes(workerFilterTab.toLowerCase());
  }).slice(0, 6);

  return (
    <Box sx={{ pb: 8 }}>
      
      {/* 1. हीरो सेक्शन (HERO SECTION WITH AI GENERATED IMAGE) */}
      <Box
        className="gradient-hero"
        sx={{
          color: '#FFFFFF',
          pt: { xs: 5, md: 8 },
          pb: { xs: 9, md: 12 },
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            
            {/* बायां हीरो कंटेंट */}
            <Grid size={{ xs: 12, lg: 6.5 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(234, 88, 12, 0.18)', border: '1px solid rgba(234, 88, 12, 0.45)', borderRadius: 5, px: 2, py: 0.8, mb: 3 }}>
                <Sparkles size={16} color="#FB923C" />
                <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 800, letterSpacing: '0.04em' }}>
                  भारत का समर्पित निर्माण, कारीगर एवं सामग्री मंच
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3.1rem', md: '3.7rem' },
                  fontWeight: 800,
                  lineHeight: 1.18,
                  mb: 2.5,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                }}
              >
                घर बनवाना हो या काम ढूँढना हो —{' '}
                <span style={{ color: '#EA580C', position: 'relative', display: 'inline-block' }}>
                  सही लोग एक जगह।
                </span>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#CBD5E1',
                  fontSize: { xs: '1.02rem', md: '1.18rem' },
                  lineHeight: 1.65,
                  mb: 4,
                  maxWidth: 620,
                }}
              >
                मकान निर्माण और रिनोवेशन के लिए अनुभवी <strong>राज मिस्त्री</strong>, <strong>सिविल ठेकेदार</strong> और सीधे <strong>सामग्री सप्लायर</strong> खोजें। बिना बिचौलिये के सीधे फोन पर बात करें।
              </Typography>

              {/* एक्शन बटन */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4.5 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/workers')}
                  startIcon={<Users size={20} />}
                  sx={{
                    bgcolor: '#EA580C',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    py: 1.5,
                    px: 3.5,
                    borderRadius: 2.5,
                    boxShadow: '0 8px 25px rgba(234, 88, 12, 0.45)',
                    '&:hover': { bgcolor: '#C2410C' },
                  }}
                >
                  कारीगर खोजें
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register-worker')}
                  startIcon={<HardHat size={20} />}
                  sx={{
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    py: 1.5,
                    px: 3,
                    borderRadius: 2.5,
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      borderColor: '#EA580C',
                      bgcolor: 'rgba(234, 88, 12, 0.12)',
                    },
                  }}
                >
                  कारीगर पंजीकरण
                </Button>

                <Button
                  size="large"
                  onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
                  startIcon={<FileText size={18} />}
                  sx={{
                    color: '#FDBA74',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': { color: '#FED7AA', bgcolor: 'transparent' }
                  }}
                >
                  मुफ़्त में आवश्यकता पोस्ट करें →
                </Button>
              </Box>

              {/* प्लेटफॉर्म आँकड़े */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3.5, pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                    4,500+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                    सत्यापित कुशल कारीगर
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 36, bgcolor: 'rgba(255, 255, 255, 0.18)' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', lineHeight: 1 }}>
                    1,200+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                    सक्रिय प्रोजेक्ट पूछताछ
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 36, bgcolor: 'rgba(255, 255, 255, 0.18)' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>
                    85+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                    शहर एवं जिले
                  </Typography>
                </Box>
              </Box>

            </Grid>

            {/* दायां हीरो विज़ुअल (AI जनरेटेड इमेज एवं फ्लोटिंग कार्ड्स) */}
            <Grid size={{ xs: 12, lg: 5.5 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4.5,
                  overflow: 'hidden',
                  boxShadow: '0 24px 50px rgba(0,0,0,0.5)',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                {/* AI जनरेटेड हीरो इमेज */}
                <Box
                  component="img"
                  src="/images/hero_construction.jpg"
                  alt="कुशल भारतीय राज मिस्त्री - मंगलम विश्वकर्मा"
                  sx={{
                    width: '100%',
                    height: { xs: 340, sm: 420, md: 460 },
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* इमेज पर डार्क ग्रेडिएंट ओवरले */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.85) 100%)'
                  }}
                />

                {/* शीर्ष सत्यापित बैज */}
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <Chip
                    icon={<ShieldCheck size={14} color="#FFF" />}
                    label="100% भौतिक सत्यापित नेटवर्क"
                    sx={{
                      bgcolor: '#16A34A',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: '0.74rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  />
                </Box>

                {/* बॉटम फ्लोटिंग कार्ड */}
                <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.16)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#EA580C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          रा
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', lineHeight: 1.2 }}>
                            रामेश्वर "रमेश" यादव
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700 }}>
                            सीनियर राज मिस्त्री • 14 वर्ष अनुभव
                          </Typography>
                        </Box>
                      </Box>
                      <Chip size="small" label="तुरंत उपलब्ध" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 800, fontSize: '0.68rem', height: 22 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#CBD5E1', display: 'block' }}>
                      📍 लखनऊ (गोमती नगर) • कॉलम बीम, नींव व ईंट चिनाई के विशेषज्ञ
                    </Typography>
                  </Box>
                </Box>

              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* 2. त्वरित सर्च बार (QUICK SEARCH BAR) */}
      <Container maxWidth="xl" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={5}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
          }}
        >
          <Typography variant="subtitle1" sx={{ color: '#0F172A', fontWeight: 800, mb: 2, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
            🔍 कुशल कारीगर, निर्माण सेवाएँ एवं सामग्री खोजें
          </Typography>

          <form onSubmit={handleQuickSearch}>
            <Grid container spacing={2} alignItems="center">
              
              {/* कीवर्ड खोज */}
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="जैसे: राज मिस्त्री, पेंटर, सरिया, सीमेंट..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color="#EA580C" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* श्रेणी चुनें */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="">सभी कार्य श्रेणियां</MenuItem>
                  <MenuItem value="राज मिस्त्री">राज मिस्त्री (भवन निर्माण)</MenuItem>
                  <MenuItem value="पेंटर">पेंटर एवं वॉल पुट्टी</MenuItem>
                  <MenuItem value="इलेक्ट्रीशियन">इलेक्ट्रीशियन एवं वायरिंग</MenuItem>
                  <MenuItem value="प्लंबर">प्लंबर एवं सेनेटरी</MenuItem>
                  <MenuItem value="बढ़ई">बढ़ई एवं शटरिंग</MenuItem>
                  <MenuItem value="टाइल्स">टाइल्स एवं मार्बल मिस्त्री</MenuItem>
                  <MenuItem value="निर्माण सामग्री">निर्माण सामग्री (सीमेंट/सरिया)</MenuItem>
                </TextField>
              </Grid>

              {/* शहर चुनें */}
              <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={16} color="#64748B" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="सभी शहर (अखिल भारत)">सभी शहर (अखिल भारत)</MenuItem>
                  {POPULAR_CITIES.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* सर्च सबमिट बटन */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#EA580C',
                    color: '#FFF',
                    fontWeight: 800,
                    py: 1.1,
                    fontSize: '0.94rem',
                    borderRadius: 2,
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
                    '&:hover': { bgcolor: '#C2410C' },
                  }}
                >
                  कारीगर व सामग्री खोजें
                </Button>
              </Grid>

            </Grid>
          </form>

          {/* ट्रेंडिंग सर्च टैग */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2.2, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
              ट्रेंडिंग सर्च:
            </Typography>
            {['राज मिस्त्री', 'हाउस पेंटर', 'इलेक्ट्रीशियन', 'सीपीवीसी प्लंबर', 'TMT सरिया 12mm', 'अल्ट्राटेक सीमेंट', 'विट्रिफाइड टाइल्स'].map(term => (
              <Chip
                key={term}
                label={term}
                size="small"
                onClick={() => {
                  setSearchKeyword(term);
                  navigate(`/workers?query=${encodeURIComponent(term)}`);
                }}
                sx={{
                  height: 24,
                  fontSize: '0.74rem',
                  bgcolor: '#F1F5F9',
                  color: '#334155',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#E2E8F0', color: '#EA580C' }
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>

      {/* 3. कार्य श्रेणियां एक्सप्लोरर (CATEGORIES EXPLORER) */}
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              कार्य श्रेणियां
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              निर्माण एवं ट्रेड श्रेणियां खोजें
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/workers"
            endIcon={<ChevronRight size={18} />}
            sx={{ color: '#EA580C', fontWeight: 800, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            सभी श्रेणियां देखें
          </Button>
        </Box>

        {/* श्रेणी ग्रुप टैब्स */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={selectedCategoryGroup}
            onChange={(e, val) => setSelectedCategoryGroup(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.94rem',
                minWidth: 'auto',
                px: 2.5
              },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C', height: 3 }
            }}
          >
            {WORKER_CATEGORIES.map((grp) => (
              <Tab key={grp.group} label={grp.group} />
            ))}
          </Tabs>
        </Box>

        {/* चयनित ग्रुप कार्ड्स */}
        <Grid container spacing={2}>
          {WORKER_CATEGORIES[selectedCategoryGroup].items.map((cat) => (
            <Grid key={cat.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                className="interactive-card"
                onClick={() => navigate(`/workers?category=${encodeURIComponent(cat.name)}`)}
                sx={{
                  p: 2.2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: '#FFFFFF',
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(234, 88, 12, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EA580C',
                    flexShrink: 0
                  }}
                >
                  <HardHat size={22} />
                </Box>
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.3, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    {cat.count}+ कारीगर उपलब्ध
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 4. संपूर्ण निर्माण सेवाएँ (CONSTRUCTION SERVICES WITH AI PHOTOS) */}
      <Box sx={{ bgcolor: '#F8FAFC', py: 9, mt: 9, borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              सम्पूर्ण निर्माण सेवाएँ
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
              टर्नकी एवं लेबर ठेका निर्माण सेवाएँ
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', fontSize: '1.05rem' }}>
              नींव खुदाई और ईंट चिनाई से लेकर मॉड्यूलर किचन, लक्ज़री पेंटिंग एवं वाटरप्रूफिंग तक के सम्पूर्ण समाधान।
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {services.slice(0, 6).map(service => (
              <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ServiceCard
                  service={service}
                  onEnquire={(s) => onOpenQuoteModal({ item: s, type: 'service' })}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              component={Link}
              to="/services"
              variant="outlined"
              size="large"
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 800, px: 4, py: 1.2, borderRadius: 2.5, '&:hover': { borderColor: '#0F172A', bgcolor: '#FFF' } }}
            >
              सभी निर्माण सेवाएँ देखें →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 5. प्रमुख कुशल कारीगर (FEATURED WORKERS & MISTRIS) */}
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              अनुभवी कारीगर
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              शीर्ष रेटेड कुशल राज मिस्त्री एवं कारीगर
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
              अनुभव, दैनिक मजदूरी दर और तत्काल उपलब्धता के आधार पर सत्यापित प्रोफाइल्स।
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/workers"
            endIcon={<ArrowRight size={18} />}
            sx={{ color: '#EA580C', fontWeight: 800 }}
          >
            सभी कारीगर देखें
          </Button>
        </Box>

        {/* फ़िल्टर पिल्स */}
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 3.5 }}>
          {['सभी', 'राज मिस्त्री', 'इलेक्ट्रीशियन', 'पेंटर', 'बढ़ई', 'प्लंबर', 'टाइल्स'].map((tab) => (
            <Chip
              key={tab}
              label={tab === 'सभी' ? 'सभी हुनर' : tab}
              onClick={() => setWorkerFilterTab(tab)}
              sx={{
                bgcolor: workerFilterTab === tab ? '#0F172A' : '#F1F5F9',
                color: workerFilterTab === tab ? '#FFF' : '#334155',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                px: 1,
                py: 2,
                borderRadius: 2,
                '&:hover': { bgcolor: workerFilterTab === tab ? '#0F172A' : '#E2E8F0' }
              }}
            />
          ))}
        </Box>

        <Grid container spacing={3}>
          {filteredWorkers.map(worker => (
            <Grid key={worker.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <WorkerCard
                worker={worker}
                onRequestQuote={(w) => onOpenQuoteModal({ item: w, type: 'worker' })}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 6. निर्माण सामग्री मार्केटप्लेस (BUILDING MATERIALS MARKETPLACE) */}
      <Box sx={{ bgcolor: '#F1F5F9', py: 9, borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
            <Box>
              <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
                थोक एवं सीधे साइट डिलीवरी
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                निर्माण सामग्री लाइव मंडी भाव
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                सीमेंट, TMT सरिया, शुद्ध बालू/मौरंग, गिट्टी, भट्ठा ईंट और टाइल्स के थोक सप्लायर।
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/materials"
              endIcon={<ArrowRight size={18} />}
              sx={{ color: '#EA580C', fontWeight: 800 }}
            >
              सभी सामग्री देखें
            </Button>
          </Box>

          <Grid container spacing={3.5}>
            {materials.slice(0, 6).map(material => (
              <Grid key={material.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <MaterialCard
                  material={material}
                  onRequestQuote={(m) => onOpenQuoteModal({ item: m, type: 'material' })}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7. पारदर्शी कार्य प्रक्रिया (HOW IT WORKS) */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFF', py: 9 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#FB923C', fontWeight: 800, letterSpacing: '0.06em' }}>
              पारदर्शी कार्य प्रक्रिया
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 1.5 }}>
              मंगलम विश्वकर्मा कैसे काम करता है
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', maxWidth: 650, mx: 'auto', fontSize: '1.05rem' }}>
              भारतीय निर्माण स्थलों की वास्तविक जरूरतों को ध्यान में रखकर बनाया गया एक भरोसेमंद और सीधा मंच।
            </Typography>

            {/* रोल स्विच टैब्स */}
            <Box sx={{ display: 'inline-flex', bgcolor: 'rgba(255, 255, 255, 0.06)', p: 0.6, borderRadius: 3, mt: 3.5, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Button
                variant={howItWorksTab === 0 ? 'contained' : 'text'}
                onClick={() => setHowItWorksTab(0)}
                sx={{
                  bgcolor: howItWorksTab === 0 ? '#EA580C' : 'transparent',
                  color: '#FFF',
                  borderRadius: 2.2,
                  px: 2.5,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  '&:hover': { bgcolor: howItWorksTab === 0 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                1. घर मालिकों के लिए
              </Button>
              <Button
                variant={howItWorksTab === 1 ? 'contained' : 'text'}
                onClick={() => setHowItWorksTab(1)}
                sx={{
                  bgcolor: howItWorksTab === 1 ? '#EA580C' : 'transparent',
                  color: '#FFF',
                  borderRadius: 2.2,
                  px: 2.5,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  '&:hover': { bgcolor: howItWorksTab === 1 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                2. कुशल कारीगरों के लिए
              </Button>
              <Button
                variant={howItWorksTab === 2 ? 'contained' : 'text'}
                onClick={() => setHowItWorksTab(2)}
                sx={{
                  bgcolor: howItWorksTab === 2 ? '#EA580C' : 'transparent',
                  color: '#FFF',
                  borderRadius: 2.2,
                  px: 2.5,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  '&:hover': { bgcolor: howItWorksTab === 2 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                3. सामग्री सप्लायरों के लिए
              </Button>
            </Box>
          </Box>

          {/* टैब 0: घर मालिक */}
          {howItWorksTab === 0 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'आवश्यकता पोस्ट करें या खोजें', desc: 'अपने मकान का प्लॉट साइज, मंजिलें, आवश्यक मिस्त्री अथवा सामग्री दर्ज करें या सत्यापित सूची देखें।' },
                { step: '02', title: 'सीधे कोटेशन व बातचीत', desc: 'स्थानीय सत्यापित मिस्त्री व ठेकेदार आपसे सीधे फोन पर बात करेंगे और साइट विजिट तय करेंगे।' },
                { step: '03', title: 'पारदर्शी दरें तय करें', desc: 'दैनिक मजदूरी अथवा ठेके का दायरा आमने-सामने तय करें। कोई बिचौलिया या छुपा हुआ कमीशन नहीं।' },
                { step: '04', title: 'कार्य प्रारंभ एवं भुगतान', desc: 'काम की प्रगति के अनुसार कारीगर को सीधे भुगतान करें। पूर्ण संतुष्टि के साथ अपना सपनों का घर बनाएं।' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.9, mb: 1.5 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {/* टैब 1: कारीगर */}
          {howItWorksTab === 1 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'निशुल्क प्रोफाइल बनाएं', desc: 'अपना नाम, मोबाइल और प्राथमिक हुनर (राज मिस्त्री, बढ़ई, इलेक्ट्रीशियन आदि) बिना किसी शुल्क के दर्ज करें।' },
                { step: '02', title: 'अनुभव व कार्य क्षेत्र चुनें', desc: 'अपने शहर का कार्य क्षेत्र और दैनिक मजदूरी अथवा ठेके की प्राथमिकता सेट करें।' },
                { step: '03', title: 'एडमिन भौतिक सत्यापन', desc: 'हमारी संचालन टीम आपके अनुभव और आईडी की पुष्टि कर आपके प्रोफाइल को सत्यापन बैज देती है।' },
                { step: '04', title: 'सीधे ग्राहक कॉल पाएं', desc: 'घर मालिकों से सीधे काम के फोन कॉल पाएं और अपनी मेहनत की 100% कमाई बिना कमीशन के प्राप्त करें।' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.9, mb: 1.5 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {/* टैब 2: सप्लायर */}
          {howItWorksTab === 2 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'स्टोर / डीलरशिप लिस्ट करें', desc: 'सीमेंट, सरिया, ईंट, रेत या अन्य सामग्रियों की श्रेणियां और डिलीवरी शहर जोड़ें।' },
                { step: '02', title: 'थोक दरें एवं डिलीवरी क्षेत्र', desc: 'सीमेंट ब्रांड्स, TMT सरिया साइज और न्यूनतम डिलीवरी मात्रा प्रकाशित करें।' },
                { step: '03', title: 'सीधे खरीददार पाएं', desc: 'बिल्डरों, सिविल ठेकेदारों और मकान मालिकों से सीधे खरीदारी की पूछताछ पाएं।' },
                { step: '04', title: 'सीधा व्यापार एवं भुगतान', desc: 'थोक दरें कोट करें, सीधे साइट पर अनलोडिंग कराएं और स्थायी ग्राहक नेटवर्क बनाएं।' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.9, mb: 1.5 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* 8. संस्थापक की सीधी गारंटी एवं भरोसा (FOUNDER ASSURANCE BANNER) */}
      <Container maxWidth="xl" sx={{ my: 9 }}>
        <Paper
          sx={{
            p: { xs: 3.5, sm: 5.5 },
            borderRadius: 4.5,
            background: 'linear-gradient(135deg, #090E17 0%, #0F172A 60%, #1E293B 100%)',
            color: '#FFF',
            border: '1.5px solid rgba(234, 88, 12, 0.35)',
            boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ maxWidth: 720 }}>
              <Chip
                label="संस्थापक की सीधी निगरानी एवं गारंटी"
                size="small"
                sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 800, mb: 2, fontSize: '0.74rem' }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFF', mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                मंगलम विश्वकर्मा का भरोसा — संस्थापक का सीधा वचन
              </Typography>
              <Typography variant="body1" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.7, fontSize: '1.05rem' }}>
                "हमारे मंच पर जुड़ने वाले हर राज मिस्त्री और कारीगर को अपनी मेहनत की पूरी मजदूरी मिलनी चाहिए — <strong>बिना किसी बिचौलिये या कमीशन के</strong>। किसी भी असुविधा, विवाद या पूछताछ के लिए आप सीधे मुझसे संपर्क कर सकते हैं।"
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#FED7AA', fontWeight: 800 }}>
                — अभिषेक मिश्रा (राका भैया) • मुख्य संस्थापक एवं प्रबंध संचालक
              </Typography>
            </Box>

            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', p: 3, borderRadius: 3.5, border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center', minWidth: 260 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1 }}>
                सीधा संपर्क / व्हाट्सएप:
              </Typography>
              <Button
                component="a"
                href="tel:+918739000333"
                variant="contained"
                startIcon={<PhoneCall size={18} />}
                sx={{
                  bgcolor: '#EA580C',
                  color: '#FFF',
                  fontWeight: 800,
                  fontSize: '1rem',
                  py: 1.4,
                  px: 3,
                  borderRadius: 2.5,
                  boxShadow: '0 6px 20px rgba(234, 88, 12, 0.5)',
                  '&:hover': { bgcolor: '#C2410C' }
                }}
              >
                +91 8739000333
              </Button>
              <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700, display: 'block', mt: 1.5 }}>
                ✓ 24x7 सीधी सहायता उपलब्ध
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* 9. त्वरित आवश्यकता पोस्टिंग फॉर्म (INLINE REQUIREMENT FORM) */}
      <Box sx={{ bgcolor: '#0B132B', color: '#FFF', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            
            <Grid size={{ xs: 12, md: 5 }}>
              <Chip
                label="मुफ़्त निर्माण आवश्यकता पोस्ट करें"
                size="small"
                sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 800, mb: 2 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFF', mb: 2 }}>
                क्या आप नया मकान बनवा रहे हैं या काम ढूँढ रहे हैं?
              </Typography>
              <Typography variant="body1" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.7 }}>
                अपनी आवश्यकता दर्ज करें — चाहे आपको छत ढलाई के लिए 6 राज मिस्त्री चाहिए हों, पूरे घर की पेंटिंग करवानी हो, या 10 टन सरिया की आवश्यकता हो।
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'त्वरित सन्दर्भ संख्या (रेफरेंस आईडी) प्राप्त होती है',
                  'आपके स्थानीय क्षेत्र के सत्यापित कारीगरों से सीधा मिलान',
                  'काम शुरू करने से पहले कई कोटेशन की तुलना करें',
                  'कारीगरों की मजदूरी से शून्य कमीशन'
                ].map((feat, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircle2 size={18} color="#EA580C" />
                    <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 600 }}>
                      {feat}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* त्वरित आवश्यकता फॉर्म कार्ड */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  borderRadius: 4,
                  bgcolor: '#FFFFFF',
                  color: '#0F172A',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3)'
                }}
              >
                {quickReqSuccess ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                      <CheckCircle2 size={34} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                      आवश्यकता सफलतापूर्वक दर्ज हुई!
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                      आपकी संदर्भ संख्या:
                    </Typography>
                    <Chip label={quickReqSuccess} sx={{ bgcolor: '#0F172A', color: '#EA580C', fontWeight: 800, fontSize: '1.1rem', py: 2.5, mb: 3 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/customer')}
                        sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700 }}
                      >
                        डैशबोर्ड में देखें
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setQuickReqSuccess(null)}
                        sx={{ borderColor: '#CBD5E1', color: '#0F172A' }}
                      >
                        दूसरी आवश्यकता पोस्ट करें
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <form onSubmit={handleQuickReqSubmit}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
                      निशुल्क कोटेशन प्राप्त करें
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="आपका नाम *"
                          fullWidth
                          size="small"
                          required
                          value={quickReq.name}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="उदा. आलोक वर्मा"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="मोबाइल नंबर *"
                          fullWidth
                          size="small"
                          required
                          value={quickReq.phone}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="उदा. 98390 XXXXX"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          select
                          label="शहर *"
                          fullWidth
                          size="small"
                          value={quickReq.city}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, city: e.target.value }))}
                        >
                          {POPULAR_CITIES.map(c => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          select
                          label="कार्य श्रेणी *"
                          fullWidth
                          size="small"
                          value={quickReq.category}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <MenuItem value="राज मिस्त्री / भवन निर्माण">राज मिस्त्री / भवन निर्माण</MenuItem>
                          <MenuItem value="पेंटर / पुट्टी कारीगर">पेंटर एवं वॉल पुट्टी</MenuItem>
                          <MenuItem value="इलेक्ट्रीशियन / हाउस वायरिंग">इलेक्ट्रीशियन एवं वायरिंग</MenuItem>
                          <MenuItem value="प्लंबर / सेनेटरी फिटिंग">प्लंबर एवं सेनेटरी फिटिंग</MenuItem>
                          <MenuItem value="टाइल्स, मार्बल व ग्रेनाइट कार्य">टाइल्स एवं मार्बल मिस्त्री</MenuItem>
                          <MenuItem value="सरिया एवं सीमेंट खरीद">निर्माण सामग्री खरीद</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="काम का विवरण *"
                          multiline
                          rows={3}
                          fullWidth
                          required
                          value={quickReq.description}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="उदा. गोमती नगर में ग्राउंड फ्लोर ईंट चिनाई के लिए 4 राज मिस्त्री और 6 मजदूरों की आवश्यकता है।"
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
                        sx={{ color: '#EA580C', fontWeight: 700, textTransform: 'none' }}
                      >
                        विस्तृत फॉर्म खोलें →
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: '#EA580C',
                          fontWeight: 800,
                          px: 3.5,
                          py: 1,
                          borderRadius: 2,
                          boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
                          '&:hover': { bgcolor: '#C2410C' }
                        }}
                      >
                        आवश्यकता दर्ज करें
                      </Button>
                    </Box>
                  </form>
                )}
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* 10. ग्राहक एवं कारीगर अनुभव (TESTIMONIALS) */}
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            सच्चा अनुभव
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            कारीगरों और घर मालिकों की जुबानी
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            मंगलम विश्वकर्मा मंच से जुड़े लोगों का वास्तविक अनुभव।
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              name: 'इंजीनियर आलोक श्रीवास्तव',
              role: 'घर मालिक, लखनऊ',
              text: 'मुझे अपने 2 मंजिला मकान के लिए विश्वसनीय राज मिस्त्री नहीं मिल रहे थे। मंगलम विश्वकर्मा के माध्यम से रामेश्वर यादव जी से संपर्क हुआ। पूरा काम बिना किसी परेशानी और समय पर पूरा हुआ।',
              rating: 5
            },
            {
              name: 'दिनेश वर्मा',
              role: 'कुशल पेंटर, वाराणसी',
              text: 'पहले ठेकेदारों के चक्कर में मजदूरी का बड़ा हिस्सा कट जाता था। राका भैया के इस मंच पर जुड़ने के बाद मुझे सीधे घर मालिकों से काम मिला और पूरी कमाई मेरे हाथ में आई।',
              rating: 5
            },
            {
              name: 'सुनील अग्रवाल',
              role: 'सीमेंट सप्लायर, कानपुर',
              text: 'सीमेंट और सरिया की थोक डिलीवरी के लिए यह बेहतरीन मंच है। बिल्डर्स और सीधे घर बनाने वालों से सीधी बातचीत होती है जिससे हमारा कारोबार 40% बढ़ा है।',
              rating: 5
            }
          ].map((testi, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3.5, borderRadius: 3.5, border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, mb: 3, flex: 1, fontStyle: 'italic' }}>
                  "{testi.text}"
                </Typography>
                <Box sx={{ borderTop: '1px solid #F1F5F9', pt: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {testi.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#EA580C', fontWeight: 700 }}>
                    {testi.role}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
};
