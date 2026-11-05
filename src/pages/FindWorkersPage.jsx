import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Paper,
  Button,
  Chip,
  InputAdornment,
  Divider
} from '@mui/material';
import { Search, MapPin, Filter, RotateCcw, Users, HardHat, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES, WORKER_CATEGORIES } from '../data/mockData';
import { WorkerCard } from '../components/common/WorkerCard';

export const FindWorkersPage = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { workers, activeCity, setActiveCity } = useApp();

  const initialQuery = searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || activeCity;

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity || 'सभी शहर (अखिल भारत)');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyImmediate, setOnlyImmediate] = useState(false);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [minExperience, setMinExperience] = useState('all');

  const workTypeOptions = ['दैनिक मजदूरी', 'प्रोजेक्ट / ठेका कार्य', 'निश्चित दर कार्य', 'प्रति दिन अनुबंध'];

  const allCategoryNames = useMemo(() => {
    const list = [];
    WORKER_CATEGORIES.forEach(group => {
      group.items.forEach(item => {
        list.push(item.name);
      });
    });
    return list;
  }, []);

  const handleWorkTypeToggle = (type) => {
    setSelectedWorkTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedCity('सभी शहर (अखिल भारत)');
    setOnlyVerified(false);
    setOnlyImmediate(false);
    setSelectedWorkTypes([]);
    setMinExperience('all');
    setSearchParams({});
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      // कीवर्ड फ़िल्टर
      if (query) {
        const q = query.toLowerCase();
        const matchesName = worker.name.toLowerCase().includes(q);
        const matchesSkill = worker.primarySkill.toLowerCase().includes(q);
        const matchesAddSkills = worker.additionalSkills?.some(s => s.toLowerCase().includes(q));
        const matchesLoc = worker.locality?.toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesAddSkills && !matchesLoc) return false;
      }

      // श्रेणी फ़िल्टर
      if (selectedCategory && !worker.primarySkill.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }

      // शहर फ़िल्टर
      if (selectedCity && !selectedCity.includes('सभी') && worker.city !== selectedCity) {
        return false;
      }

      // केवल सत्यापित
      if (onlyVerified && !worker.isVerified) {
        return false;
      }

      // केवल तुरंत उपलब्ध
      if (onlyImmediate && !worker.isAvailable) {
        return false;
      }

      // कार्य प्रकार फ़िल्टर
      if (selectedWorkTypes.length > 0) {
        const hasWorkType = worker.workTypes?.some(wt => selectedWorkTypes.includes(wt));
        if (!hasWorkType) return false;
      }

      // अनुभव फ़िल्टर
      if (minExperience !== 'all') {
        const exp = Number(minExperience);
        if (worker.experienceYears < exp) return false;
      }

      return true;
    });
  }, [workers, query, selectedCategory, selectedCity, onlyVerified, onlyImmediate, selectedWorkTypes, minExperience]);

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* पेज शीर्षक */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            सत्यापित कारीगर डायरेक्टरी
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            कुशल राज मिस्त्री एवं कारीगर खोजें
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.05rem' }}>
            अपने शहर में सत्यापित राज मिस्त्री, बढ़ई, इलेक्ट्रीशियन, प्लंबर, टाइल मिस्त्री और निर्माण लेबर से सीधे बात करें।
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          
          {/* बायां फ़िल्टर साइडबार */}
          <Grid size={{ xs: 12, md: 3.5, lg: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                position: { md: 'sticky' },
                top: { md: 95 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Filter size={20} color="#EA580C" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    फ़िल्टर (Filters)
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={handleResetFilters}
                  startIcon={<RotateCcw size={14} />}
                  sx={{ color: '#64748B', fontSize: '0.78rem', textTransform: 'none', fontWeight: 700 }}
                >
                  रीसेट करें
                </Button>
              </Box>

              {/* केवल सत्यापित स्विच */}
              <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2.5, mb: 2.5, border: '1px solid #E2E8F0' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={onlyVerified}
                      onChange={(e) => setOnlyVerified(e.target.checked)}
                      color="secondary"
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ShieldCheck size={16} color="#15803D" />
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '0.86rem' }}>
                        केवल सत्यापित (Verified)
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              {/* तुरंत उपलब्ध */}
              <Box sx={{ mb: 2.5 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={onlyImmediate}
                      onChange={(e) => setOnlyImmediate(e.target.checked)}
                      color="success"
                      size="small"
                    />
                  }
                  label={<Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.86rem', color: '#16A34A' }}>केवल तुरंत उपलब्ध</Typography>}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* शहर चयन */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, display: 'block', mb: 0.8 }}>
                  शहर / जिला चुनें:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setActiveCity(e.target.value);
                  }}
                >
                  <MenuItem value="सभी शहर (अखिल भारत)">सभी शहर (अखिल भारत)</MenuItem>
                  {POPULAR_CITIES.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* श्रेणी चयन */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, display: 'block', mb: 0.8 }}>
                  हुनर / ट्रेड श्रेणी:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="">सभी श्रेणियां</MenuItem>
                  {allCategoryNames.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* कार्य अनुबंध प्रकार */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, display: 'block', mb: 0.8 }}>
                  कार्य का प्रकार (Contract Type):
                </Typography>
                {workTypeOptions.map(wt => (
                  <FormControlLabel
                    key={wt}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedWorkTypes.includes(wt)}
                        onChange={() => handleWorkTypeToggle(wt)}
                        color="secondary"
                      />
                    }
                    label={<Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>{wt}</Typography>}
                    sx={{ display: 'block', m: 0 }}
                  />
                ))}
              </Box>

              {/* न्यूनतम अनुभव */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, display: 'block', mb: 0.8 }}>
                  न्यूनतम अनुभव:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                >
                  <MenuItem value="all">कोई भी अनुभव</MenuItem>
                  <MenuItem value="5">5+ वर्ष अनुभव</MenuItem>
                  <MenuItem value="8">8+ वर्ष अनुभव</MenuItem>
                  <MenuItem value="10">10+ वर्ष (सीनियर मिस्त्री)</MenuItem>
                </TextField>
              </Box>

            </Paper>
          </Grid>

          {/* दायां परिणाम ग्रिड */}
          <Grid size={{ xs: 12, md: 8.5, lg: 9 }}>
            
            {/* शीर्ष खोज बार एवं कुल परिणाम */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3.5,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                mb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
              }}
            >
              <Box sx={{ flex: 1, minWidth: 260 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="कारीगर का नाम, हुनर या इलाका खोजें..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color="#EA580C" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 700 }}>
                कुल परिणाम: <strong style={{ color: '#EA580C', fontSize: '1rem' }}>{filteredWorkers.length}</strong> कुशल कारीगर
              </Typography>
            </Paper>

            {/* कारीगर ग्रिड */}
            {filteredWorkers.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <HardHat size={52} color="#94A3B8" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                  आपके फ़िल्टर से मेल खाता कोई कारीगर नहीं मिला
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                  कृपया कुछ फ़िल्टर हटाएँ या "सभी शहर (अखिल भारत)" चुनें।
                </Typography>
                <Button variant="contained" onClick={handleResetFilters} sx={{ bgcolor: '#EA580C', fontWeight: 800, px: 3, py: 1, borderRadius: 2 }}>
                  फ़िल्टर रीसेट करें
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredWorkers.map(worker => (
                  <Grid key={worker.id} size={{ xs: 12, sm: 6, lg: 6 }}>
                    <WorkerCard
                      worker={worker}
                      onRequestQuote={(w) => onOpenQuoteModal({ item: w, type: 'worker' })}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
