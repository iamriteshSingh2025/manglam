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
  BadgeAlert
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

  // Quick Search State
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCity, setSearchCity] = useState('All Cities');
  const [searchWorkType, setSearchWorkType] = useState('New Construction');
  const [searchKeyword, setSearchKeyword] = useState('');

  // How it works tab state
  const [howItWorksTab, setHowItWorksTab] = useState(0);

  // Category view tab
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(0);

  // Worker filter tab
  const [workerFilterTab, setWorkerFilterTab] = useState('All');

  // Inline requirement quick form state
  const [quickReq, setQuickReq] = useState({
    name: '',
    phone: '',
    category: 'Raj Mistri / House Construction',
    description: '',
    city: 'Lucknow'
  });
  const [quickReqSuccess, setQuickReqSuccess] = useState(null);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword) params.append('query', searchKeyword);
    if (searchCategory) params.append('category', searchCategory);
    if (searchCity && searchCity !== 'All Cities') params.append('city', searchCity);
    if (searchWorkType) params.append('workType', searchWorkType);

    navigate(`/workers?${params.toString()}`);
  };

  const handleQuickReqSubmit = (e) => {
    e.preventDefault();
    if (!quickReq.name || !quickReq.phone || !quickReq.description) {
      alert('Please fill your name, phone and work description.');
      return;
    }
    const created = postRequirement({
      customerName: quickReq.name,
      mobile: quickReq.phone,
      serviceCategory: quickReq.category,
      description: quickReq.description,
      city: quickReq.city,
      requirementType: 'Quick Requirement',
      scopeType: 'Labour + Material'
    });
    setQuickReqSuccess(created.id);
  };

  const filteredWorkers = workers.filter(w => {
    if (workerFilterTab === 'All') return true;
    return w.primarySkill.toLowerCase().includes(workerFilterTab.toLowerCase());
  }).slice(0, 6);

  return (
    <Box sx={{ pb: 8 }}>
      
      {/* 1. HERO SECTION */}
      <Box
        className="gradient-hero"
        sx={{
          color: '#FFFFFF',
          pt: { xs: 6, md: 9 },
          pb: { xs: 8, md: 11 },
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            
            {/* Left Hero Content */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(234, 88, 12, 0.15)', border: '1px solid rgba(234, 88, 12, 0.35)', borderRadius: 5, px: 2, py: 0.75, mb: 2.5 }}>
                <Sparkles size={16} color="#FB923C" />
                <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  India's Dedicated Construction & Skilled Labour Marketplace
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.1rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2.5,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                }}
              >
                Ghar Banwana Ho Ya Kaam Dhundhna Ho —{' '}
                <span style={{ color: '#EA580C', position: 'relative', display: 'inline-block' }}>
                  Sahi Log Ek Jagah.
                </span>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#CBD5E1',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: 640,
                }}
              >
                Find skilled mistris, trusted contractors, and direct building material suppliers for your next house construction or renovation project. Workers find genuine customer enquiries without middlemen.
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/workers')}
                  startIcon={<Users size={20} />}
                  sx={{
                    bgcolor: '#EA580C',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    py: 1.5,
                    px: 3.5,
                    borderRadius: 2.5,
                    boxShadow: '0 8px 24px rgba(234, 88, 12, 0.45)',
                    '&:hover': { bgcolor: '#C2410C' },
                  }}
                >
                  Find a Worker
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register-worker')}
                  startIcon={<HardHat size={20} />}
                  sx={{
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    py: 1.5,
                    px: 3,
                    borderRadius: 2.5,
                    '&:hover': {
                      borderColor: '#EA580C',
                      bgcolor: 'rgba(234, 88, 12, 0.1)',
                    },
                  }}
                >
                  Register as a Worker
                </Button>

                <Button
                  size="large"
                  onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
                  startIcon={<FileText size={18} />}
                  sx={{
                    color: '#FDBA74',
                    textDecoration: 'underline',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    textTransform: 'none',
                    '&:hover': { color: '#FED7AA', bgcolor: 'transparent' }
                  }}
                >
                  Post a Construction Requirement →
                </Button>
              </Box>

              {/* Key Platform Metrics Pill */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                    4,500+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Skilled Workers Listed
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 32, bgcolor: 'rgba(255, 255, 255, 0.15)' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#EA580C', lineHeight: 1 }}>
                    1,200+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Project Enquiries
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 32, bgcolor: 'rgba(255, 255, 255, 0.15)' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#38BDF8', lineHeight: 1 }}>
                    85+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    Cities & Districts
                  </Typography>
                </Box>
              </Box>

            </Grid>

            {/* Right Hero Visual Card */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 4,
                  p: { xs: 2.5, sm: 3.5 },
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HardHat size={20} color="#EA580C" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                      Live Construction Network
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label="Verified Ecosystem"
                    sx={{ bgcolor: 'rgba(22, 163, 74, 0.2)', color: '#4ADE80', fontWeight: 600, fontSize: '0.7rem' }}
                  />
                </Box>

                {/* Simulated Marketplace Activity Snippets */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  
                  {/* Item 1: Skilled Worker */}
                  <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2.5, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#EA580C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                          R
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF', lineHeight: 1.2 }}>
                            Rameshwar "Ramesh" Yadav
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#F97316', fontWeight: 600 }}>
                            Senior Raj Mistri • 14 Yrs Exp
                          </Typography>
                        </Box>
                      </Box>
                      <Chip size="small" icon={<ShieldCheck size={12} color="#15803D" />} label="Verified" sx={{ bgcolor: '#DCFCE7', color: '#15803D', height: 20, fontSize: '0.65rem' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 0.5 }}>
                      📍 Lucknow (Gomti Nagar) • Foundation & Brick Masonry • Available Immediately
                    </Typography>
                  </Box>

                  {/* Item 2: Customer Requirement */}
                  <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2.5, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#38BDF8' }}>
                        Active Requirement: G+1 House Construction
                      </Typography>
                      <Chip size="small" label="Labour + Material" sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', height: 20, fontSize: '0.65rem' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#CBD5E1', display: 'block' }}>
                      Plot: 1,500 sq.ft • Varanasi • Budget: ~₹28 Lakh • 4 Contractor Quotations Received
                    </Typography>
                  </Box>

                  {/* Item 3: Material Supplier */}
                  <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2.5, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Building2 size={16} color="#FB923C" />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>
                          Kashi Steel & TMT Sariya Traders
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700 }}>
                        In Stock
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                      Fe-550D TMT (8mm - 20mm) • Direct Mandi / Mill Rate • Dispatched within 24 Hours
                    </Typography>
                  </Box>

                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* 2. QUICK SEARCH BAR SECTION */}
      <Container maxWidth="xl" sx={{ mt: -5, position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3.5,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: '#0F172A', fontWeight: 800, mb: 2, fontSize: '0.95rem' }}>
            🔍 Search Skilled Workers, Tradesmen & Materials
          </Typography>

          <form onSubmit={handleQuickSearch}>
            <Grid container spacing={2} alignItems="center">
              
              {/* Keyword Search */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Raj Mistri, Painter, Sariya..."
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

              {/* Category Select */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="">All Work Categories</MenuItem>
                  <MenuItem value="Raj Mistri">Raj Mistri / Masonry</MenuItem>
                  <MenuItem value="Painter">Painter / Wall Finishing</MenuItem>
                  <MenuItem value="Electrician">Electrician & Wiring</MenuItem>
                  <MenuItem value="Plumber">Plumber & Sanitary</MenuItem>
                  <MenuItem value="Carpenter">Carpenter & Centering</MenuItem>
                  <MenuItem value="Tile and Marble">Tile & Marble Installer</MenuItem>
                  <MenuItem value="Construction Labour">General Labour / Helpers</MenuItem>
                  <MenuItem value="Building Materials">Building Materials</MenuItem>
                </TextField>
              </Grid>

              {/* City Select */}
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
                  <MenuItem value="All Cities">All Cities</MenuItem>
                  {POPULAR_CITIES.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Work Type */}
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={searchWorkType}
                  onChange={(e) => setSearchWorkType(e.target.value)}
                >
                  <MenuItem value="New Construction">New Construction</MenuItem>
                  <MenuItem value="Repair">Repair Work</MenuItem>
                  <MenuItem value="Renovation">Home Renovation</MenuItem>
                </TextField>
              </Grid>

              {/* Search Submit */}
              <Grid size={{ xs: 12, md: 1.5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#EA580C',
                    color: '#FFF',
                    fontWeight: 700,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#C2410C' },
                  }}
                >
                  Search
                </Button>
              </Grid>

            </Grid>
          </form>

          {/* Quick tags */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Trending Searches:
            </Typography>
            {['Raj Mistri', 'House Painter', 'Electrician', 'CPVC Plumber', 'TMT Sariya 12mm', 'UltraTech Cement'].map(term => (
              <Chip
                key={term}
                label={term}
                size="small"
                onClick={() => {
                  setSearchKeyword(term);
                  navigate(`/workers?query=${encodeURIComponent(term)}`);
                }}
                sx={{
                  height: 22,
                  fontSize: '0.72rem',
                  bgcolor: '#F1F5F9',
                  color: '#334155',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#E2E8F0', color: '#EA580C' }
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>

      {/* 3. POPULAR CATEGORIES GRID */}
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              Skill Directory
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Explore Construction & Trade Categories
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/workers"
            endIcon={<ChevronRight size={18} />}
            sx={{ color: '#EA580C', fontWeight: 700, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Explore All Categories
          </Button>
        </Box>

        {/* Category Group Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={selectedCategoryGroup}
            onChange={(e, val) => setSelectedCategoryGroup(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.92rem',
                minWidth: 'auto',
                px: 2.5
              },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C' }
            }}
          >
            {WORKER_CATEGORIES.map((grp, idx) => (
              <Tab key={grp.group} label={grp.group} />
            ))}
          </Tabs>
        </Box>

        {/* Selected Group Category Cards */}
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
                    width: 44,
                    height: 44,
                    borderRadius: 2,
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
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.25, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {cat.count}+ Available
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 4. HOW IT WORKS (FOR CUSTOMERS / WORKERS / SUPPLIERS) */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFF', my: 10, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: '#FB923C', fontWeight: 800, letterSpacing: '0.06em' }}>
              Transparent Work Process
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 1.5 }}>
              How KaamSetu Works
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', maxWidth: 650, mx: 'auto' }}>
              A professional connection bridge designed specifically for the needs of Indian construction sites.
            </Typography>

            {/* Role switch tabs */}
            <Box sx={{ display: 'inline-flex', bgcolor: 'rgba(255, 255, 255, 0.06)', p: 0.6, borderRadius: 3, mt: 3, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Button
                variant={howItWorksTab === 0 ? 'contained' : 'text'}
                onClick={() => setHowItWorksTab(0)}
                sx={{
                  bgcolor: howItWorksTab === 0 ? '#EA580C' : 'transparent',
                  color: '#FFF',
                  borderRadius: 2.2,
                  px: 2.5,
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  '&:hover': { bgcolor: howItWorksTab === 0 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                For Customers & Builders
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
                  fontSize: '0.86rem',
                  '&:hover': { bgcolor: howItWorksTab === 1 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                For Skilled Workers
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
                  fontSize: '0.86rem',
                  '&:hover': { bgcolor: howItWorksTab === 2 ? '#C2410C' : 'rgba(255,255,255,0.05)' }
                }}
              >
                For Material Suppliers
              </Button>
            </Box>
          </Box>

          {/* Tab 0: Customers */}
          {howItWorksTab === 0 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'Select Service or Worker', desc: 'Browse categorized mistris, plumbers, electricians, or full turnkey construction scopes.' },
                { step: '02', title: 'Share Requirement & Location', desc: 'Specify your plot size, building floor, required mistris, or material quantities in minutes.' },
                { step: '03', title: 'Receive Competitive Enquiries', desc: 'Local vetted mistris & contractors review your scope and provide realistic quotations.' },
                { step: '04', title: 'Discuss & Finalize Directly', desc: 'Inspect past works, agree on daily wages or contract milestones, and kickstart site execution.' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.8, mb: 1.5, fontFamily: '"Outfit", sans-serif' }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
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

          {/* Tab 1: Workers */}
          {howItWorksTab === 1 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'Register Your Profile', desc: 'Enter your name, mobile, and primary skill (Raj Mistri, Electrician, Painter, etc.) without paperwork fee.' },
                { step: '02', title: 'Select Work Area & Experience', desc: 'Set your preferred working radius in your city and whether you work on daily wage or contract.' },
                { step: '03', title: 'Admin Review & Verification', desc: 'Our operational desk reviews your experience. Approved profiles receive trust verification badges.' },
                { step: '04', title: 'Receive Direct Job Enquiries', desc: 'Get notified of new construction projects and renovation jobs in your locality.' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.8, mb: 1.5 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
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

          {/* Tab 2: Suppliers */}
          {howItWorksTab === 2 && (
            <Grid container spacing={3}>
              {[
                { step: '01', title: 'Register Material Business', desc: 'List your dealership or store details, commercial address, and material categories.' },
                { step: '02', title: 'Add Products & Delivery Areas', desc: 'Publish cement grades, TMT sariya sizes, sand, bricks, and your minimum delivery quantities.' },
                { step: '03', title: 'Receive Bulk Purchase Inquiries', desc: 'Builders, contractors, and individual home builders post daily material demands.' },
                { step: '04', title: 'Provide Mandi Rates & Deliver', desc: 'Quote wholesale rates per bag or tonne, coordinate site unloading, and build repeat trade.' }
              ].map((item) => (
                <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#EA580C', opacity: 0.8, mb: 1.5 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
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

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              ⚠️ Disclaimer: KaamSetu connects both parties and verifies credentials, but does not guarantee employment or project outcomes.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* 5. FEATURED WORKERS SECTION */}
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              Skilled Craftsmen
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Featured Workers & Mistris
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Demonstration profiles vetted for experience, wage preferences, and active availability.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/workers"
            endIcon={<ArrowRight size={18} />}
            sx={{ color: '#EA580C', fontWeight: 700 }}
          >
            View All Workers
          </Button>
        </Box>

        {/* Filter Pills */}
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 3 }}>
          {['All', 'Raj Mistri', 'Electrician', 'Painter', 'Carpenter', 'Plumber', 'Tile'].map((tab) => (
            <Chip
              key={tab}
              label={tab === 'All' ? 'All Skills' : tab}
              onClick={() => setWorkerFilterTab(tab)}
              sx={{
                bgcolor: workerFilterTab === tab ? '#0F172A' : '#F1F5F9',
                color: workerFilterTab === tab ? '#FFF' : '#334155',
                fontWeight: 600,
                cursor: 'pointer',
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

      {/* 6. CONSTRUCTION SERVICES SHOWCASE */}
      <Box sx={{ bgcolor: '#F8FAFC', py: 9, borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              End-To-End Contracting
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Comprehensive Construction Services
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}>
              From initial foundation excavation to luxury interior paint and terrace waterproofing.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {services.slice(0, 6).map(service => (
              <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ServiceCard
                  service={service}
                  onEnquire={(s) => onOpenQuoteModal({ item: s, type: 'service' })}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/services"
              variant="outlined"
              size="large"
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, px: 4, borderRadius: 2 }}
            >
              Explore All 8+ Construction Services →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 7. BUILDING MATERIALS MARKETPLACE */}
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
              Wholesale & Direct Delivery
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Building Materials Marketplace
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Direct supplier quotes for Cement, TMT Sariya, Sand, Aggregates, Bricks, and Tiles.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/materials"
            endIcon={<ArrowRight size={18} />}
            sx={{ color: '#EA580C', fontWeight: 700 }}
          >
            Browse All Materials
          </Button>
        </Box>

        <Grid container spacing={3}>
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

      {/* 8. POST YOUR REQUIREMENT INLINE SECTION */}
      <Box sx={{ bgcolor: '#0B132B', color: '#FFF', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            
            <Grid size={{ xs: 12, md: 5 }}>
              <Chip
                label="Direct Customer Connect"
                size="small"
                sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700, mb: 2 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFF', mb: 2 }}>
                Have a Construction Project in Mind?
              </Typography>
              <Typography variant="body1" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.6 }}>
                Submit your project requirements — whether you need 5 Raj Mistris for slab casting, 2 painters for your house, or 10 tonnes of TMT sariya.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'Instant demo reference ID generated',
                  'Free matching with suitable local contractors & mistris',
                  'Compare multiple quotations before committing',
                  'Zero advance broker commission'
                ].map((feat, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircle2 size={18} color="#EA580C" />
                    <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500 }}>
                      {feat}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Quick Requirement Form Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  borderRadius: 3.5,
                  bgcolor: '#FFFFFF',
                  color: '#0F172A',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.25)'
                }}
              >
                {quickReqSuccess ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                      <CheckCircle2 size={32} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                      Requirement Submitted!
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                      Your reference ID:
                    </Typography>
                    <Chip label={quickReqSuccess} sx={{ bgcolor: '#0F172A', color: '#EA580C', fontWeight: 800, fontSize: '1rem', py: 2, mb: 3 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/customer')}
                        sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700 }}
                      >
                        View in Dashboard
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setQuickReqSuccess(null)}
                        sx={{ borderColor: '#CBD5E1', color: '#0F172A' }}
                      >
                        Submit Another
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <form onSubmit={handleQuickReqSubmit}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
                      Post Construction Requirement
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Your Name *"
                          fullWidth
                          size="small"
                          required
                          value={quickReq.name}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Alok Verma"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Mobile Number *"
                          fullWidth
                          size="small"
                          required
                          value={quickReq.phone}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98XXX XXXXX"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          select
                          label="City *"
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
                          label="Trade Category *"
                          fullWidth
                          size="small"
                          value={quickReq.category}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <MenuItem value="Raj Mistri / House Construction">Raj Mistri / House Construction</MenuItem>
                          <MenuItem value="Painter / Putty Worker">Painter & Wall Finishing</MenuItem>
                          <MenuItem value="Electrician / House Wiring">Electrician & Wiring</MenuItem>
                          <MenuItem value="Plumber / Sanitary Fitting">Plumber & Sanitary</MenuItem>
                          <MenuItem value="Tile, Granite & Marble Work">Tile & Marble Installer</MenuItem>
                          <MenuItem value="Steel / Sariya & Cement">Building Material Purchase</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Describe Your Requirement *"
                          multiline
                          rows={3}
                          fullWidth
                          required
                          value={quickReq.description}
                          onChange={(e) => setQuickReq(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="e.g. Need 4 Raj Mistris for 12 days to complete ground floor brickwork in Gomti Nagar."
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
                        sx={{ color: '#EA580C', fontWeight: 600, textTransform: 'none' }}
                      >
                        Open Full Requirement Form →
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: '#EA580C',
                          fontWeight: 700,
                          px: 3,
                          borderRadius: 2,
                          '&:hover': { bgcolor: '#C2410C' }
                        }}
                      >
                        Submit Requirement
                      </Button>
                    </Box>
                  </form>
                )}
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* 9 & 10. WORKER & SUPPLIER REGISTRATION CTA CARDS */}
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Grid container spacing={3}>
          
          {/* Worker CTA Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                bgcolor: '#0F172A',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <HardHat size={24} color="#FFF" />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#FFF' }}>
                “Aapke Hunar Ko Mile Naye Kaam Ke Mauke.”
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.6 }}>
                Apni skill aur working area register karein, aur relevant customer enquiries se judne ka mauka paayein. Free registration with verified skill badge.
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  component={Link}
                  to="/register-worker"
                  variant="contained"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    bgcolor: '#EA580C',
                    color: '#FFF',
                    fontWeight: 700,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#C2410C' }
                  }}
                >
                  Register as a Worker
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Supplier CTA Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                bgcolor: '#1E293B',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Truck size={24} color="#0F172A" />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#FFF' }}>
                “Apne Construction Business Ko Naye Customers Tak Pahunchayein.”
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.6 }}>
                Apne products, service area aur quotation details list karke customer enquiries prapt karein. Connect with builders & contractors directly.
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  component={Link}
                  to="/register-supplier"
                  variant="contained"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    bgcolor: '#38BDF8',
                    color: '#0F172A',
                    fontWeight: 700,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#7DD3FC' }
                  }}
                >
                  Register as a Supplier
                </Button>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>

      {/* 11. TRUST AND SAFETY SECTION */}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Trust, Verification & Safe Marketplace Practices
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                How KaamSetu maintains transparency between workers, customers, contractors, and suppliers.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                title: 'Provider Profile Review',
                desc: 'Every worker, contractor, and material supplier application undergoes manual admin review before badges are assigned.'
              },
              {
                title: 'Clear Quotation & Scope',
                desc: 'Discuss work measurements, materials involved, and completion timeline in writing before starting site execution.'
              },
              {
                title: 'Transparent Pricing Discussion',
                desc: 'Daily wages and contract rates are agreed directly without hidden platform deduction cuts from workers.'
              },
              {
                title: 'Report a Problem & Dispute Help',
                desc: 'Dedicated dispute and complaint mechanism for misrepresentation or quality deviations.'
              }
            ].map((item, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.75 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Founder & Owner Direct Connect Card */}
          <Box sx={{ mt: 4, p: 3, bgcolor: '#0F172A', borderRadius: 3, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Chip
                label="Direct Founder Commitment"
                size="small"
                sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700, fontSize: '0.68rem', mb: 1 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF' }}>
                Main Owner: Abhishek Mishra (Raka Mishra ji)
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
                “Har mistri ko sammanjanak kaam, har ghar banane wale ko sahi dar aur pakka bharosa.”
              </Typography>
            </Box>
            <Button
              component="a"
              href="tel:+918739000333"
              variant="contained"
              startIcon={<PhoneCall size={16} />}
              sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
            >
              Call Raka Mishra ji: 8739000333
            </Button>
          </Box>
        </Paper>
      </Container>

    </Box>
  );
};
