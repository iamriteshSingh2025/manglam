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
  const [selectedCity, setSelectedCity] = useState(initialCity || 'All Cities');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyImmediate, setOnlyImmediate] = useState(false);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [minExperience, setMinExperience] = useState('all');

  const workTypeOptions = ['Daily Wage', 'Per-Day Contract', 'Fixed-Price Job', 'Project-Based Work'];

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
    setSelectedCity('All Cities');
    setOnlyVerified(false);
    setOnlyImmediate(false);
    setSelectedWorkTypes([]);
    setMinExperience('all');
    setSearchParams({});
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      // Keyword filter
      if (query) {
        const q = query.toLowerCase();
        const matchesName = worker.name.toLowerCase().includes(q);
        const matchesSkill = worker.primarySkill.toLowerCase().includes(q);
        const matchesAddSkills = worker.additionalSkills?.some(s => s.toLowerCase().includes(q));
        const matchesLoc = worker.locality?.toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesAddSkills && !matchesLoc) return false;
      }

      // Category filter
      if (selectedCategory && !worker.primarySkill.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }

      // City filter
      if (selectedCity && selectedCity !== 'All Cities' && worker.city !== selectedCity) {
        return false;
      }

      // Verified only
      if (onlyVerified && !worker.isVerified) {
        return false;
      }

      // Immediate availability only
      if (onlyImmediate && !worker.isAvailable) {
        return false;
      }

      // Work type filter
      if (selectedWorkTypes.length > 0) {
        const hasWorkType = worker.workTypes?.some(wt => selectedWorkTypes.includes(wt));
        if (!hasWorkType) return false;
      }

      // Experience filter
      if (minExperience !== 'all') {
        const exp = Number(minExperience);
        if (worker.experienceYears < exp) return false;
      }

      return true;
    });
  }, [workers, query, selectedCategory, selectedCity, onlyVerified, onlyImmediate, selectedWorkTypes, minExperience]);

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        
        {/* Page Title & Breadcrumb */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            Verified Directory
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Find Skilled Workers & Mistris
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Browse vetted Raj Mistris, Carpenters, Electricians, Plumbers, and Labourers across Indian cities.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          
          {/* Left Filter Sidebar */}
          <Grid size={{ xs: 12, md: 3.5, lg: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3.5,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                position: { md: 'sticky' },
                top: { md: 90 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Filter size={18} color="#EA580C" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    Filters
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={handleResetFilters}
                  startIcon={<RotateCcw size={14} />}
                  sx={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'none' }}
                >
                  Reset
                </Button>
              </Box>

              {/* Verified Only Toggle */}
              <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, mb: 2.5, border: '1px solid #F1F5F9' }}>
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
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '0.85rem' }}>
                        Verified Only
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              {/* Immediate Availability */}
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
                  label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Available Immediately</Typography>}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* City Selection */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700, display: 'block', mb: 0.75 }}>
                  City / Location:
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
                  <MenuItem value="All Cities">All Cities</MenuItem>
                  {POPULAR_CITIES.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Category Selection */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700, display: 'block', mb: 0.75 }}>
                  Trade / Skill Category:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {allCategoryNames.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Work Type Options */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700, display: 'block', mb: 0.75 }}>
                  Work Contract Type:
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
                    label={<Typography variant="caption" sx={{ color: '#475569', fontWeight: 500 }}>{wt}</Typography>}
                    sx={{ display: 'block', m: 0 }}
                  />
                ))}
              </Box>

              {/* Experience */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700, display: 'block', mb: 0.75 }}>
                  Minimum Experience:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                >
                  <MenuItem value="all">Any Experience</MenuItem>
                  <MenuItem value="5">5+ Years</MenuItem>
                  <MenuItem value="8">8+ Years</MenuItem>
                  <MenuItem value="10">10+ Years (Senior Mistris)</MenuItem>
                </TextField>
              </Box>

            </Paper>
          </Grid>

          {/* Right Results Grid */}
          <Grid size={{ xs: 12, md: 8.5, lg: 9 }}>
            
            {/* Top Search Input & Result Count */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                mb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ flex: 1, minWidth: 260 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by worker name, skill, or locality..."
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

              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                Showing <strong style={{ color: '#0F172A' }}>{filteredWorkers.length}</strong> Workers
              </Typography>
            </Paper>

            {/* Workers Grid */}
            {filteredWorkers.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <HardHat size={48} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                  No workers found matching your filters
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                  Try resetting some filters or selecting "All Cities".
                </Typography>
                <Button variant="contained" onClick={handleResetFilters} sx={{ bgcolor: '#EA580C', fontWeight: 600 }}>
                  Reset Filters
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
