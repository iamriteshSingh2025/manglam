import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Alert,
  Chip,
  Grid
} from '@mui/material';
import { X as CloseIcon, Send, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuotationModal = ({ open, onClose, targetItem, type = 'worker' }) => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'लखनऊ (Lucknow)',
    quantityOrDays: '',
    siteAddress: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!targetItem) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }

    setSubmitted(true);
    showNotification(`${targetItem.name || targetItem.title || targetItem.businessName} को आपका कोटेशन अनुरोध भेज दिया गया है!`, 'success');
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      city: 'लखनऊ (Lucknow)',
      quantityOrDays: '',
      siteAddress: '',
      message: ''
    });
    onClose();
  };

  const getTitle = () => {
    if (type === 'worker') return `${targetItem.name} से कोटेशन / बातचीत हेतु अनुरोध`;
    if (type === 'material') return `${targetItem.name} हेतु दर व डिलीवरी पूछताछ`;
    return `${targetItem.title} सेवा हेतु पूछताछ`;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}>
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, bgcolor: '#0F172A', color: '#FFF' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.05rem' }}>
          {getTitle()}
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: '#94A3B8' }}>
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3, bgcolor: '#F8FAFC' }}>
        {submitted ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={36} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              पूछताछ सफलतापूर्वक भेजी गई!
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mb: 2.5, px: 2, lineHeight: 1.6 }}>
              आपकी पूछताछ संदर्भ संख्या <strong>#कोटेशन-{Math.floor(100000 + Math.random() * 900000)}</strong> दर्ज कर ली गई है। सेवा प्रदाता आपके विवरण की समीक्षा कर सीधे आपसे फोन पर संपर्क करेंगे।
            </Typography>
            <Button variant="contained" onClick={handleClose} sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700, borderRadius: 2 }}>
              पूर्ण (बंद करें)
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* चयनित मद सारांश */}
            <Box sx={{ p: 1.75, bgcolor: '#FFFFFF', borderRadius: 3, border: '1px solid #E2E8F0', mb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {targetItem.name || targetItem.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#EA580C', fontWeight: 700 }}>
                  {targetItem.primarySkill || targetItem.category || targetItem.supplierCity || 'सत्यापित सेवा'}
                </Typography>
              </Box>
              <Chip
                size="small"
                label={targetItem.expectedWage || (targetItem.price ? `₹${targetItem.price}` : 'दैनिक मंडी भाव')}
                sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#C2410C', fontWeight: 700, fontSize: '0.72rem' }}
              />
            </Box>

            <Alert severity="info" icon={<ShieldCheck size={18} />} sx={{ mb: 2.5, borderRadius: 2.5, fontSize: '0.8rem', bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <strong>शून्य बिचौलिया:</strong> आपका फोन नंबर केवल इस सत्यापित प्रदाता से सीधे बातचीत हेतु उपयोग होगा। कोई कमीशन नहीं काटा जाता।
            </Alert>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="आपका पूरा नाम"
                  name="name"
                  placeholder="उदा. रमेश कुमार"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="मोबाइल नंबर"
                  name="phone"
                  placeholder="उदा. 98390 XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="शहर / जिला"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={type === 'material' ? "आवश्यक मात्रा (उदा. 100 बोरी / 2 टन)" : "अपेक्षित कार्य दिवस / अवधि"}
                  name="quantityOrDays"
                  placeholder={type === 'material' ? "जैसे 100 बोरी या 500 cft" : "जैसे 15 दिन या ठेका"}
                  value={formData.quantityOrDays}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="साइट का पता / इलाका"
                  name="siteAddress"
                  placeholder="उदा. गोमती नगर विस्तार, प्लॉट 45"
                  value={formData.siteAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  label="काम का विवरण / विशेष निर्देश"
                  name="message"
                  placeholder="काम का संक्षिप्त विवरण दें (जैसे मकान चिनाई, कॉलम ढलाई या सीमेंट सप्लाई)..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button onClick={handleClose} sx={{ color: '#64748B', fontWeight: 600 }}>
                रद्द करें
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send size={15} />}
                sx={{
                  bgcolor: '#EA580C',
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#C2410C' }
                }}
              >
                कोटेशन अनुरोध भेजें
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
