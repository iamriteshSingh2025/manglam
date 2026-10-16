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

  const categoryLabels = {
    'All': 'सभी',
    'Cement': 'सीमेंट',
    'Steel / Sariya': 'स्टील / सरिया',
    'Sand / Balu': 'रेत / बालू',
    'Aggregate / Gitti': 'गिट्टी / एग्रीगेट',
    'Bricks': 'ईंट',
    'Blocks': 'ब्लॉक्स',
    'Tiles': 'टाइल्स',
    'Paint and Putty': 'पेंट एवं पुट्टी',
    'Electrical Materials': 'इलेक्ट्रिकल सामग्री',
    'Plumbing Materials': 'प्लंबिंग सामग्री'
  };

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
        
        {/* शीर्षक */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            सीधी डीलरशिप सोर्सिंग
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            निर्माण सामग्री मार्केटप्लेस
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            सीमेंट, TMT सरिया, रेत, गिट्टी और फिनिशिंग सामग्री सीधे सत्यापित क्षेत्रीय स्टॉकिस्ट और मिलों से प्राप्त करें।
          </Typography>
        </Box>

        {/* पारदर्शी बाजार मूल्य सूचना */}
        <Alert
          severity="info"
          icon={<AlertCircle size={20} color="#2563EB" />}
          sx={{ mb: 4, borderRadius: 2.5, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}
        >
          <strong>बाजार मूल्य पारदर्शिता:</strong> स्टील सरिया और सीमेंट की कीमतें दैनिक मिल और मंडी दरों के अनुसार बदलती हैं। हम सत्यापित सांकेतिक मूल्य दिखाते हैं; ट्रकलोड ऑर्डर के लिए <strong>"दाम पूछें"</strong> पर क्लिक करके सप्लायर से सीधे वर्तमान डिस्पैच कोटेशन प्राप्त करें।
        </Alert>

        {/* फिल्टर और सर्च बार */}
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
              placeholder="सीमेंट, TMT सरिया, बालू, टाइल्स, सप्लायर का नाम खोजें..."
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
              <MenuItem value="All Cities">सभी डिलीवरी शहर</MenuItem>
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
              <Tab key={cat} label={categoryLabels[cat] || cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* सामग्री ग्रिड */}
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
