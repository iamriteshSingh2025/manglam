import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  InputAdornment,
  Alert,
  Chip
} from '@mui/material';
import { Search, Package, MapPin, Truck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';
import { MaterialCard } from '../components/common/MaterialCard';

export const BuildingMaterialsPage = ({ onOpenQuoteModal }) => {
  const { materials, activeCity, setActiveCity } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState(activeCity || 'All Cities');

  const categories = [
    'All',
    'Cement',
    'Steel / Sariya',
    'Sand / Balu',
    'Aggregate / Gitti',
    'Bricks',
    'Blocks',
    'Tiles',
    'Paint and Putty',
    'Electrical Materials',
    'Plumbing Materials'
  ];

  const filteredMaterials = materials.filter(mat => {
    if (selectedCategory !== 'All' && mat.category !== selectedCategory) return false;
    if (selectedCity && selectedCity !== 'All Cities') {
      const matchDelivery = mat.deliveryLocations?.some(loc => loc.toLowerCase().includes(selectedCity.toLowerCase()));
      const matchSupplierCity = mat.supplierCity?.toLowerCase() === selectedCity.toLowerCase();
      if (!matchDelivery && !matchSupplierCity) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      const matchName = mat.name.toLowerCase().includes(q);
      const matchSup = mat.supplierName.toLowerCase().includes(q);
      const matchCat = mat.category.toLowerCase().includes(q);
      if (!matchName && !matchSup && !matchCat) return false;
    }
    return true;
  });

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        
        {/* Title */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            Direct Dealership Sourcing
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Building Materials Marketplace
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Source cement, TMT sariya, sand, aggregates, and finishing supplies directly from verified regional stockists and mills.
          </Typography>
        </Box>

        {/* Transparent Market Pricing Notice */}
        <Alert
          severity="info"
          icon={<AlertCircle size={20} color="#2563EB" />}
          sx={{ mb: 4, borderRadius: 2.5, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}
        >
          <strong>Market Price Transparency:</strong> Steel rebar and cement prices fluctuate based on daily mill and mandi rates. We show indicative prices where verified; for live truckload orders, use <strong>"Request Price"</strong> to receive the current dispatch quote directly from the supplier.
        </Alert>

        {/* Filter & Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            mb: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search cement, TMT sariya, balu, tiles, supplier name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#EA580C" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ minWidth: 180 }}>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setActiveCity(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={16} color="#64748B" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="All Cities">All Delivery Cities</MenuItem>
              {POPULAR_CITIES.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Paper>

        {/* Category Filter Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, val) => setSelectedCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.86rem',
                minWidth: 'auto',
                px: 2
              },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C' }
            }}
          >
            {categories.map(cat => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* Materials Grid */}
        <Grid container spacing={3}>
          {filteredMaterials.map(mat => (
            <Grid key={mat.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <MaterialCard
                material={mat}
                onRequestQuote={(m) => onOpenQuoteModal({ item: m, type: 'material' })}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};
