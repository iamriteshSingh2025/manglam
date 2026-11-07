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
  MenuItem,
  List,
  ListItem,
  Alert
} from '@mui/material';
import {
  Truck,
  Package,
  PlusCircle,
  Building2,
  DollarSign,
  Send,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupplierDashboard = () => {
  const { materials, addMaterial, showNotification } = useApp();

  // डेमो सप्लायर: अल्ट्राबिल्ड सीमेंट एवं एग्रीगेट्स
  const myMaterials = materials.filter(m => m.supplierName?.includes('UltraBuild') || m.supplierName?.includes('UltraTech') || m.supplierName?.includes('अल्ट्रा'));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'सीमेंट',
    price: '',
    unit: 'बोरी (50 किग्रा)',
    minOrderQty: '50 बोरी',
    description: '',
  });

  const [enquiries, setEnquiries] = useState([
    {
      id: 'INQ-901',
      customer: 'रजनीश बिल्डटेक प्रा. लि.',
      product: 'अल्ट्राटेक सुपर PPC सीमेंट',
      qtyRequested: '400 बोरी',
      siteLocation: 'पनकी इंडस्ट्रियल एरिया, कानपुर',
      urgency: '3 दिनों के भीतर आवश्यक',
      status: 'कोटेशन प्रतीक्षित'
    },
    {
      id: 'INQ-902',
      customer: 'विवेक सिंघानिया (मकान साइट)',
      product: 'ब्लू स्टोन गिट्टी (20mm)',
      qtyRequested: '500 घन फीट (1 डंपर)',
      siteLocation: 'शहीद पथ, लखनऊ',
      urgency: '7 दिनों के भीतर',
      status: 'कोटेशन प्रतीक्षित'
    }
  ]);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [quoteRate, setQuoteRate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('कल सुबह 10:00 बजे');

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) {
      alert('कृपया उत्पाद का नाम दर्ज करें।');
      return;
    }
    addMaterial({
      ...newProduct,
      supplierName: 'अल्ट्राबिल्ड सीमेंट एवं एग्रीगेट्स',
      supplierCity: 'लखनऊ',
      deliveryLocations: ['लखनऊ', 'उन्नाव', 'बाराबंकी', 'कानपुर']
    });
    setAddModalOpen(false);
    showNotification('नया उत्पाद सफलतापूर्वक कैटलॉग में जोड़ा गया!', 'success');
    setNewProduct({
      name: '',
      category: 'सीमेंट',
      price: '',
      unit: 'बोरी (50 किग्रा)',
      minOrderQty: '50 बोरी',
      description: '',
    });
  };

  const handleSendSupplierQuote = () => {
    if (!quoteRate) {
      alert('कृपया कोटेशन दर दर्ज करें।');
      return;
    }
    setEnquiries(prev => prev.map(item => item.id === activeEnquiry.id ? { ...item, status: `कोटेशन प्रेषित: ${quoteRate}` } : item));
    showNotification(`${activeEnquiry.customer} को सामग्री कोटेशन सफलतापूर्वक प्रेषित किया गया!`, 'success');
    setQuoteModalOpen(false);
    setActiveEnquiry(null);
    setQuoteRate('');
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
                bgcolor: '#0284C7',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
              }}
            >
              <Truck size={32} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                अल्ट्राबिल्ड सीमेंट एवं निर्माण सामग्री डिपो
              </Typography>
              <Typography variant="body2" sx={{ color: '#7DD3FC', fontWeight: 600 }}>
                प्रोपराइटर: सुनील अग्रवाल • मुख्य यार्ड: ट्रांसपोर्ट नगर, लखनऊ
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                अधिकृत होलसेल डीलर • डिलीवरी कवरेज: लखनऊ, बाराबंकी, उन्नाव, सीतापुर
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => setAddModalOpen(true)}
            startIcon={<PlusCircle size={18} />}
            sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
          >
            नया उत्पाद जोड़ें
          </Button>
        </Paper>

        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
          
          {/* बायाँ: ग्राहकों की खरीद एवं कोटेशन पूछताछ */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
              ग्राहकों की खरीद पूछताछ एवं डिलीवरी मांग
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
              {enquiries.map((inq) => (
                <Card key={inq.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          ग्राहक: {inq.customer}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                          {inq.product} • मात्रा: {inq.qtyRequested}
                        </Typography>
                      </Box>
                      <Chip
                        label={inq.status}
                        size="small"
                        sx={{
                          bgcolor: inq.status.includes('कोटेशन') && !inq.status.includes('प्रतीक्षित') ? '#DCFCE7' : '#FEF3C7',
                          color: inq.status.includes('कोटेशन') && !inq.status.includes('प्रतीक्षित') ? '#15803D' : '#B45309',
                          fontWeight: 700
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B', fontSize: '0.82rem', mb: 1.5, flexWrap: 'wrap' }}>
                      <MapPin size={14} color="#EA580C" />
                      <span>{inq.siteLocation}</span>
                      <span>•</span>
                      <span>{inq.urgency}</span>
                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        पूछताछ आईडी: {inq.id}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setActiveEnquiry(inq);
                          setQuoteModalOpen(true);
                        }}
                        startIcon={<Send size={14} />}
                        sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 1.5, px: 2, '&:hover': { bgcolor: '#C2410C' } }}
                      >
                        {inq.status.includes('प्रेषित') ? 'कोटेशन अपडेट करें' : 'मूल्य एवं डिलीवरी कोटेशन भेजें'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* सक्रिय उत्पाद सूची */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
              आपके सक्रिय उत्पाद कैटलॉग ({myMaterials.length || materials.slice(0, 4).length} आइटम)
            </Typography>

            <Grid container spacing={2}>
              {(myMaterials.length > 0 ? myMaterials : materials.slice(0, 4)).map(mat => (
                <Grid key={mat.id} size={{ xs: 12, sm: 6 }}>
                  <Paper sx={{ p: 2, borderRadius: 2.5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                    <Chip label={mat.category} size="small" sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.3, mb: 0.5 }}>
                      {mat.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                      {mat.price > 0 ? `₹${mat.price} / ${mat.unit}` : 'अनुरोध पर कोटेशन उपलब्ध'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      न्यूनतम ऑर्डर: {mat.minOrderQty} • स्थिति: <span style={{ color: '#16A34A', fontWeight: 600 }}>उपलब्ध</span>
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

          </Grid>

          {/* दायाँ: फ्लीट एवं डिलीवरी क्षमता */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                वाहन बेड़ा एवं लॉजिस्टिक्स क्षमता
              </Typography>
              <List dense disablePadding>
                {[
                  { key: 'डंपर ट्रक (400 घन फीट क्षमता)', val: '3 ट्रक उपलब्ध' },
                  { key: 'हैवी 10-चक्का ट्रक (800 बोरी सीमेंट)', val: '2 ट्रक उपलब्ध' },
                  { key: 'अनलोडिंग लेबर टीम', val: 'अनुरोध पर तुरंत उपलब्ध' },
                  { key: 'मानक डिलीवरी समय', val: '24 घंटे के भीतर डिस्पैच' }
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1.2, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>{item.key}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>{item.val}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                सत्यापित डिलीवरी सेवा क्षेत्र
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
                {['लखनऊ शहरी', 'बाराबंकी', 'उन्नाव औद्योगिक क्षेत्र', 'सीतापुर रोड', 'रायबरेली हाईवे', 'कानपुर रोड'].map(loc => (
                  <Chip key={loc} label={loc} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 600 }} />
                ))}
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* मोडल: नया उत्पाद जोड़ें */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            मार्केटप्लेस में निर्माण सामग्री उत्पाद जोड़ें
          </DialogTitle>
          <form onSubmit={handleCreateProduct}>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="उत्पाद का नाम एवं ब्रांड *"
                  fullWidth
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="उदा. जिंदल पैंथर 550D TMT स्टील (16mm)"
                />
                <TextField
                  select
                  label="सामग्री श्रेणी *"
                  fullWidth
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                >
                  <MenuItem value="सीमेंट">सीमेंट</MenuItem>
                  <MenuItem value="स्टील / सरिया">स्टील / सरिया</MenuItem>
                  <MenuItem value="रेत / बालू">रेत / बालू</MenuItem>
                  <MenuItem value="गिट्टी / एग्रीगेट">गिट्टी / एग्रीगेट</MenuItem>
                  <MenuItem value="ईंटें (Bricks)">ईंटें (Bricks)</MenuItem>
                  <MenuItem value="ब्लॉक्स (AAC Blocks)">ब्लॉक्स (AAC Blocks)</MenuItem>
                  <MenuItem value="टाइल्स एवं मार्बल">टाइल्स एवं मार्बल</MenuItem>
                  <MenuItem value="पेंट एवं पुट्टी">पेंट एवं पुट्टी</MenuItem>
                  <MenuItem value="इलेक्ट्रिकल सामग्री">इलेक्ट्रिकल सामग्री</MenuItem>
                  <MenuItem value="प्लंबिंग सामग्री">प्लंबिंग सामग्री</MenuItem>
                </TextField>
                <TextField
                  label="वर्तमान मंडी / थोक दर (₹ प्रति इकाई, वैकल्पिक)"
                  fullWidth
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="उदा. 385 (अनुरोध पर मूल्य के लिए खाली छोड़ें)"
                />
                <TextField
                  label="इकाई (उदा. बोरी, टन, घन फीट, प्रति नग)"
                  fullWidth
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                />
                <TextField
                  label="न्यूनतम ऑर्डर मात्रा (MOQ)"
                  fullWidth
                  value={newProduct.minOrderQty}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, minOrderQty: e.target.value }))}
                  placeholder="उदा. 50 बोरी / 1 टन"
                />
                <TextField
                  label="उत्पाद विवरण एवं तकनीकी विनिर्देश"
                  multiline
                  rows={2}
                  fullWidth
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#64748B' }}>रद्द करें</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
                उत्पाद प्रकाशित करें
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* मोडल: ग्राहक को कोटेशन भेजें */}
        <Dialog open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            सामग्री कोटेशन प्रेषित करें
          </DialogTitle>
          <DialogContent dividers>
            {activeEnquiry && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info">
                  ग्राहक <strong>{activeEnquiry.customer}</strong> को <strong>{activeEnquiry.qtyRequested}</strong> {activeEnquiry.product} हेतु कोटेशन प्रस्तुत किया जा रहा है।
                </Alert>
                <TextField
                  label="कुल कोटेड दर (साइट अनलोडिंग सहित) *"
                  fullWidth
                  size="small"
                  value={quoteRate}
                  onChange={(e) => setQuoteRate(e.target.value)}
                  placeholder="उदा. ₹380 / बोरी (कुल ₹1,52,000 डिलीवरी सहित)"
                />
                <TextField
                  label="अनुमानित डिलीवरी समय सीमा"
                  fullWidth
                  size="small"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setQuoteModalOpen(false)} sx={{ color: '#64748B' }}>रद्द करें</Button>
            <Button onClick={handleSendSupplierQuote} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
              कोटेशन भेजें
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
