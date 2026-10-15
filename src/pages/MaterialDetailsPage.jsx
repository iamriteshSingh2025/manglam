import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  TextField,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import {
  Package,
  Truck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Send,
  FileQuestion,
  Star
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const MaterialDetailsPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { materials, showNotification } = useApp();

  const material = materials.find(m => m.id === id) || materials[0];

  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    siteLocation: '',
    quantity: material?.minOrderQty || '50 Bags / 1 Truck',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) {
      alert('Please fill your name and phone number.');
      return;
    }
    setSubmitted(true);
    showNotification(`Quotation request sent to ${material.supplierName}!`, 'success');
  };

  if (!material) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5">Material item not found.</Typography>
        <Button onClick={() => navigate('/materials')} sx={{ mt: 2 }}>Back to Materials</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
          <Link to="/materials" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem' }}>Building Materials</Link>
          <Typography sx={{ color: '#0F172A', fontSize: '0.85rem', fontWeight: 600 }}>{material.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4 }}>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Chip label={material.category} sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700 }} />
                <Chip label={material.availability} size="small" sx={{ bgcolor: '#DCFCE7', color: '#16A34A', fontWeight: 600 }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                {material.name}
              </Typography>

              {/* Supplier Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Building2 size={18} color="#0F172A" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B' }}>
                  Supplied by: {material.supplierName}
                </Typography>
                <Chip size="small" icon={<ShieldCheck size={14} color="#15803D" />} label="Verified Dealer" sx={{ bgcolor: '#DCFCE7', color: '#15803D' }} />
              </Box>

              {/* Price Banner */}
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Commercial Pricing:
                    </Typography>
                    {material.price > 0 && material.priceType?.includes('Fixed') ? (
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        ₹{material.price.toLocaleString('en-IN')} <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 500 }}>/ {material.unit}</span>
                      </Typography>
                    ) : (
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#EA580C' }}>
                        Request Price / Daily Rate
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      Minimum Order Quantity (MOQ):
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {material.minOrderQty}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 4 }}>
                {material.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Technical Specifications */}
              {material.specifications && Object.keys(material.specifications).length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                    Product Specifications & Standards
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2 }}>
                    <Table size="small">
                      <TableBody>
                        {Object.entries(material.specifications).map(([key, val]) => (
                          <TableRow key={key}>
                            <TableCell sx={{ fontWeight: 700, color: '#334155', width: '40%', bgcolor: '#F8FAFC' }}>
                              {key}
                            </TableCell>
                            <TableCell sx={{ color: '#475569' }}>
                              {val}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Delivery Locations */}
              <Box sx={{ p: 2, bgcolor: '#F1F5F9', borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Truck size={20} color="#EA580C" />
                <Typography variant="body2" sx={{ color: '#334155' }}>
                  <strong>Available Delivery Areas:</strong> {material.deliveryLocations.join(', ')}
                </Typography>
              </Box>

            </Paper>
          </Grid>

          {/* Right Inquiry Form */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', position: { md: 'sticky' }, top: { md: 90 } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                Request Wholesale Quote
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Connect directly with {material.supplierName} for site delivery.
              </Typography>

              {submitted ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <CheckCircle2 size={40} color="#16A34A" style={{ marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Inquiry Dispatched!
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1, mb: 2 }}>
                    The supplier desk has been notified. You will receive quotation pricing and delivery schedules directly.
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSubmitted(false)} sx={{ color: '#EA580C', borderColor: '#EA580C' }}>
                    Send Another Inquiry
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Your Name / Company *"
                      fullWidth
                      size="small"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <TextField
                      label="Phone Number *"
                      fullWidth
                      size="small"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98XXX XXXXX"
                    />
                    <TextField
                      label="Delivery Site Address & City *"
                      fullWidth
                      size="small"
                      required
                      value={orderForm.siteLocation}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, siteLocation: e.target.value }))}
                      placeholder="e.g. Site #4, Gomti Nagar"
                    />
                    <TextField
                      label="Required Quantity *"
                      fullWidth
                      size="small"
                      required
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                    <TextField
                      label="Delivery Notes or Unloading Access"
                      multiline
                      rows={2}
                      fullWidth
                      size="small"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="e.g. Heavy truck trailer access available."
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={16} />}
                      sx={{ bgcolor: '#EA580C', fontWeight: 700, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
                    >
                      Request Quotation & Delivery
                    </Button>
                  </Box>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
