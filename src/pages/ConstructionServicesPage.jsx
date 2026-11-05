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
  InputAdornment
} from '@mui/material';
import { Search, Hammer, Building2, Paintbrush, Zap, Droplets } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/common/ServiceCard';

export const ConstructionServicesPage = ({ onOpenQuoteModal }) => {
  const { services } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');

  const categories = ['सभी', 'भवन निर्माण (सिविल)', 'पेंटिंग एवं फिनिशिंग', 'इलेक्ट्रिकल एवं तकनीकी', 'प्लंबिंग एवं फिटिंग'];

  const filteredServices = services.filter(service => {
    if (selectedCategory !== 'सभी' && service.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = service.title.toLowerCase().includes(q);
      const matchDesc = service.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* शीर्षक */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#EA580C', fontWeight: 800, letterSpacing: '0.06em' }}>
            व्यावसायिक निर्माण समाधान
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            निर्माण, नवीनीकरण एवं ट्रेड सेवाएँ
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.05rem' }}>
            पारदर्शी कार्य दायरे और लिखित गारंटी के साथ नया मकान निर्माण, रिनोवेशन, हाउस वायरिंग, पेंटिंग व वाटरप्रूफिंग पैकेज।
          </Typography>
        </Box>

        {/* सर्च और टैब्स */}
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
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <Box sx={{ flex: 1, minWidth: 260 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="सेवाएँ खोजें (जैसे टर्नकी, पेंटिंग, वायरिंग, टाइल)..."
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

          <Tabs
            value={selectedCategory}
            onChange={(e, val) => setSelectedCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.88rem',
                minWidth: 'auto',
                px: 2.2
              },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C', height: 3 }
            }}
          >
            {categories.map(cat => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Paper>

        {/* सेवा ग्रिड */}
        <Grid container spacing={3.5}>
          {filteredServices.map(service => (
            <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ServiceCard
                service={service}
                onEnquire={(s) => onOpenQuoteModal({ item: s, type: 'service' })}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};
