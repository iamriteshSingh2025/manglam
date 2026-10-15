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
import { X as CloseIcon, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuotationModal = ({ open, onClose, targetItem, type = 'worker' }) => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Lucknow',
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
      alert('Please provide your name and phone number.');
      return;
    }

    setSubmitted(true);
    showNotification(`Quotation request sent to ${targetItem.name || targetItem.title || targetItem.businessName}!`, 'success');
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      city: 'Lucknow',
      quantityOrDays: '',
      siteAddress: '',
      message: ''
    });
    onClose();
  };

  const getTitle = () => {
    if (type === 'worker') return `Request Quotation from ${targetItem.name}`;
    if (type === 'material') return `Get Price & Delivery Quote for ${targetItem.name}`;
    return `Enquire about ${targetItem.title}`;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>
          {getTitle()}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2.5 }}>
        {submitted ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={34} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
              Enquiry Dispatched!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, px: 2 }}>
              Your enquiry has been logged with reference <strong>#EQ-{Math.floor(100000 + Math.random() * 900000)}</strong>. The provider has received your requirements and will contact you directly via phone.
            </Typography>
            <Button variant="contained" onClick={handleClose} sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 600 }}>
              Done
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Target Item summary badge */}
            <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {targetItem.name || targetItem.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {targetItem.primarySkill || targetItem.category || targetItem.supplierName} • {targetItem.city || targetItem.supplierCity || 'Multi-city'}
                </Typography>
              </Box>
              {targetItem.isVerified && (
                <Chip size="small" icon={<ShieldCheck size={14} color="#16A34A" />} label="Verified" sx={{ bgcolor: '#DCFCE7', color: '#16A34A', fontWeight: 600 }} />
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Your Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Contact Phone *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="+91 98XXX XXXXX"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label={type === 'material' ? 'Required Quantity (e.g. 100 Bags)' : 'Work Duration / Days Needed'}
                  name="quantityOrDays"
                  value={formData.quantityOrDays}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  placeholder={type === 'material' ? 'e.g. 5 Tonnes / 400 cft' : 'e.g. 15 Days work'}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Site City / Locality"
                  name="siteAddress"
                  value={formData.siteAddress}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  placeholder="e.g. Indiranagar, Lucknow"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Specific Notes or Scope of Work"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Mention site access, unloading requirements, or preferred start dates."
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button onClick={handleClose} sx={{ color: '#64748B' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send size={16} />}
                sx={{
                  bgcolor: '#EA580C',
                  fontWeight: 700,
                  px: 2.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#C2410C' }
                }}
              >
                Send Quotation Enquiry
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
