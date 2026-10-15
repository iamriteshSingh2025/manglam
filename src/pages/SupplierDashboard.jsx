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
  ListItem
} from '@mui/material';
import {
  Truck,
  Package,
  PlusCircle,
  Building2,
  DollarSign,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupplierDashboard = () => {
  const { materials, addMaterial, showNotification } = useApp();

  // Demo supplier: UltraBuild Materials
  const myMaterials = materials.filter(m => m.supplierName.includes('UltraBuild') || m.supplierName.includes('UltraTech'));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Cement',
    price: '',
    unit: 'Bag (50 Kg)',
    minOrderQty: '50 Bags',
    description: '',
  });

  const [enquiries, setEnquiries] = useState([
    {
      id: 'INQ-901',
      customer: 'Rajnish Buildtech Pvt Ltd',
      product: 'UltraTech Super PPC Cement',
      qtyRequested: '400 Bags',
      siteLocation: 'Panki Industrial Area, Kanpur',
      urgency: 'Required in 3 Days',
      status: 'Awaiting Quote'
    },
    {
      id: 'INQ-902',
      customer: 'Vivek Singhania (House Site)',
      product: 'Blue Stone Aggregate / Gitti (20mm)',
      qtyRequested: '500 cft (1 Dumper)',
      siteLocation: 'Shaheed Path, Lucknow',
      urgency: 'Within 7 Days',
      status: 'Awaiting Quote'
    }
  ]);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [quoteRate, setQuoteRate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow 10:00 AM');

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) {
      alert('Please enter product name.');
      return;
    }
    addMaterial({
      ...newProduct,
      supplierName: 'UltraBuild Cement & Aggregates',
      supplierCity: 'Lucknow',
      deliveryLocations: ['Lucknow', 'Unnao', 'Barabanki', 'Kanpur']
    });
    setAddModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Cement',
      price: '',
      unit: 'Bag (50 Kg)',
      minOrderQty: '50 Bags',
      description: '',
    });
  };

  const handleSendSupplierQuote = () => {
    if (!quoteRate) {
      alert('Please enter quotation rate.');
      return;
    }
    setEnquiries(prev => prev.map(item => item.id === activeEnquiry.id ? { ...item, status: `Quoted: ${quoteRate}` } : item));
    showNotification(`Quotation dispatched to ${activeEnquiry.customer}!`, 'success');
    setQuoteModalOpen(false);
    setActiveEnquiry(null);
    setQuoteRate('');
  };

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
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
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                fontWeight: 800
              }}
            >
              <Truck size={32} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                UltraBuild Cement & Aggregates
              </Typography>
              <Typography variant="body2" sx={{ color: '#7DD3FC', fontWeight: 600 }}>
                Owner: Sunil Aggarwal • Yard: Transport Nagar, Lucknow
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Authorized Dealer • Delivery Coverage: Lucknow, Barabanki, Unnao, Sitapur
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => setAddModalOpen(true)}
            startIcon={<PlusCircle size={18} />}
            sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
          >
            Add New Product Listing
          </Button>
        </Paper>

        <Grid container spacing={4}>
          
          {/* Left: Customer Purchase Enquiries */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
              Customer Purchase & Delivery Enquiries
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
              {enquiries.map((inq) => (
                <Card key={inq.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          {inq.customer}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                          {inq.product} • {inq.qtyRequested}
                        </Typography>
                      </Box>
                      <Chip
                        label={inq.status}
                        size="small"
                        sx={{
                          bgcolor: inq.status.includes('Quoted') ? '#DCFCE7' : '#FEF3C7',
                          color: inq.status.includes('Quoted') ? '#15803D' : '#B45309',
                          fontWeight: 700
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B', fontSize: '0.82rem', mb: 1.5 }}>
                      <MapPin size={14} color="#EA580C" />
                      <span>{inq.siteLocation}</span>
                      <span>•</span>
                      <span>{inq.urgency}</span>
                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Ref: {inq.id}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setActiveEnquiry(inq);
                          setQuoteModalOpen(true);
                        }}
                        startIcon={<Send size={14} />}
                        sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 1.5, '&:hover': { bgcolor: '#C2410C' } }}
                      >
                        {inq.status.includes('Quoted') ? 'Update Quotation' : 'Send Price & Delivery Quote'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* My Active Product Listings */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
              Your Active Product Catalogue ({myMaterials.length} items)
            </Typography>

            <Grid container spacing={2}>
              {myMaterials.map(mat => (
                <Grid key={mat.id} size={{ xs: 12, sm: 6 }}>
                  <Paper sx={{ p: 2, borderRadius: 2.5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                    <Chip label={mat.category} size="small" sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.3, mb: 0.5 }}>
                      {mat.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                      {mat.price > 0 ? `₹${mat.price} / ${mat.unit}` : 'Quotation on Request'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      MOQ: {mat.minOrderQty} • Status: <span style={{ color: '#16A34A', fontWeight: 600 }}>Active</span>
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

          </Grid>

          {/* Right: Supplier Logistics Settings */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Fleet & Logistics Capacity
              </Typography>
              <List dense disablePadding>
                {[
                  { key: 'Dumper Trucks (400 cft capacity)', val: '3 Available' },
                  { key: 'Heavy 10-Tyre Trucks (800 Bags)', val: '2 Available' },
                  { key: 'Unloading Labour Crew', val: 'Available on request' },
                  { key: 'Standard Delivery Window', val: 'Within 24 Hours' }
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>{item.key}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>{item.val}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                Registered Delivery Locations
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
                {['Lucknow Urban', 'Barabanki', 'Unnao Industrial', 'Sitapur Road', 'Raebareli Highway'].map(loc => (
                  <Chip key={loc} label={loc} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 600 }} />
                ))}
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* Modal: Add New Product */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Add Building Material Product to Marketplace
          </DialogTitle>
          <form onSubmit={handleCreateProduct}>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Product Name & Brand *"
                  fullWidth
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Jindal Panther 550D TMT Steel (16mm)"
                />
                <TextField
                  select
                  label="Material Category *"
                  fullWidth
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                >
                  <MenuItem value="Cement">Cement</MenuItem>
                  <MenuItem value="Steel / Sariya">Steel / Sariya</MenuItem>
                  <MenuItem value="Sand / Balu">Sand / Balu</MenuItem>
                  <MenuItem value="Aggregate / Gitti">Aggregate / Gitti</MenuItem>
                  <MenuItem value="Bricks">Bricks</MenuItem>
                  <MenuItem value="Blocks">Blocks</MenuItem>
                  <MenuItem value="Tiles">Tiles</MenuItem>
                  <MenuItem value="Paint and Putty">Paint and Putty</MenuItem>
                  <MenuItem value="Electrical Materials">Electrical Materials</MenuItem>
                  <MenuItem value="Plumbing Materials">Plumbing Materials</MenuItem>
                </TextField>
                <TextField
                  label="Current Mandi / Delivery Price (₹ per unit, optional)"
                  fullWidth
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g. 385 (leave empty for Request Price)"
                />
                <TextField
                  label="Unit (e.g. bag, tonne, cft, piece)"
                  fullWidth
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                />
                <TextField
                  label="Minimum Order Quantity (MOQ)"
                  fullWidth
                  value={newProduct.minOrderQty}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, minOrderQty: e.target.value }))}
                  placeholder="e.g. 50 Bags / 1 Tonne"
                />
                <TextField
                  label="Product Description & Technical Specifications"
                  multiline
                  rows={2}
                  fullWidth
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
                Publish Product
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Modal: Send Quote to Customer */}
        <Dialog open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Send Material Quotation
          </DialogTitle>
          <DialogContent dividers>
            {activeEnquiry && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info">
                  Responding to purchase enquiry from <strong>{activeEnquiry.customer}</strong> for <strong>{activeEnquiry.qtyRequested}</strong> of {activeEnquiry.product}.
                </Alert>
                <TextField
                  label="Total Quoted Rate (including site unloading) *"
                  fullWidth
                  size="small"
                  value={quoteRate}
                  onChange={(e) => setQuoteRate(e.target.value)}
                  placeholder="e.g. ₹380 / bag (Total ₹1,52,000 all inclusive)"
                />
                <TextField
                  label="Estimated Delivery Window"
                  fullWidth
                  size="small"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQuoteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSendSupplierQuote} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
              Send Quotation
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
