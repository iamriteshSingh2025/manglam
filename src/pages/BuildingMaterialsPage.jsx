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
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [selectedCity, setSelectedCity] = useState(activeCity || 'सभी शहर (अखिल भारत)');

  const categories = [
    'सभी',
    'सीमेंट',
    'सरिया / स्टील',
    'बालू / मौरंग',
    'गिट्टी',
    'ईंट',
    'टाइल्स'
  ];

  const filteredMaterials = materials.filter(mat => {
    if (selectedCategory !== 'सभी' && !mat.category.includes(selectedCategory) && selectedCategory !== mat.category) return false;
    if (selectedCity && !selectedCity.includes('सभी')) {
      const matchDelivery = mat.deliveryLocations?.some(loc => selectedCity.toLowerCase().includes(loc.toLowerCase()));
      const matchSupplierCity = selectedCity.toLowerCase().includes(mat.supplierCity?.toLowerCase());
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
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* शीर्षक */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            सीधी डीलरशिप एवं मिल सोर्सिंग
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.6rem', sm: '2.1rem', md: '2.6rem' } }}>
            निर्माण सामग्री थोक मंडी भाव
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontSize: { xs: '0.92rem', sm: '1.02rem' } }}>
            सीमेंट, TMT सरिया, शुद्ध बालू/मौरंग, गिट्टी, भट्ठा ईंट और टाइल्स सीधे सत्यापित क्षेत्रीय स्टॉकिस्ट से प्राप्त करें।
          </Typography>
        </Box>

        {/* पारदर्शी बाजार मूल्य सूचना */}
        <Alert
          severity="info"
          icon={<AlertCircle size={20} color="#2563EB" />}
          sx={{ mb: 4, borderRadius: 2.5, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: '0.85rem' }}
        >
          <strong>दैनिक मंडी पारदर्शिता:</strong> सरिया एवं सीमेंट की कीमतें दैनिक मिल व मंडी दरों पर निर्भर करती हैं। थोक ट्रकलोड ऑर्डर के लिए <strong>"रेट पूछें"</strong> पर क्लिक करके सप्लायर से सीधे डिस्पैच कोटेशन प्राप्त करें।
        </Alert>

        {/* फिल्टर और सर्च बार */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3.5,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            mb: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 260 } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="सीमेंट, सरिया, मौरंग, ईंट, सप्लायर खोजें..."
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

          <Box sx={{ minWidth: { xs: '100%', sm: 200 } }}>
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
              <MenuItem value="सभी शहर (अखिल भारत)">सभी शहर (अखिल भारत)</MenuItem>
              {POPULAR_CITIES.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Paper>

        {/* श्रेणी फिल्टर टैब्स */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, val) => setSelectedCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                textTransform: 'none',
                fontSize: { xs: '0.84rem', sm: '0.92rem' },
                minWidth: 'auto',
                px: { xs: 1.8, sm: 2.5 }
              },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C', height: 3 }
            }}
          >
            {categories.map(cat => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* सामग्री ग्रिड */}
        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
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
