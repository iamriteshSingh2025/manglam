import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Truck, CheckCircle2, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/mockData';

export const SupplierRegistrationPage = () => {
  const navigate = useNavigate();
  const { addSupplier, setCurrentRole } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    location: '',
    city: 'Lucknow',
    deliveryLocationsText: 'Lucknow, Unnao, Barabanki',
    materialCategoriesText: 'Cement, Sand / Balu, Aggregate / Gitti, Steel / Sariya',
    pricingModel: 'Wholesale Mandi & Site Delivery',
    minOrderQty: '50 Bags / 1 Truckload',
  });

  const [registered, setRegistered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactPerson || !formData.phone) {
      alert('Please fill business name, contact person, and phone number.');
      return;
    }

    const deliveryLocations = formData.deliveryLocationsText.split(',').map(s => s.trim()).filter(Boolean);
    const materialCategories = formData.materialCategoriesText.split(',').map(s => s.trim()).filter(Boolean);

    const created = addSupplier({
      ...formData,
      deliveryLocations,
      materialCategories
    });

    setRegistered(created);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: '#38BDF8', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Truck size={28} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Building Material Supplier Registration
          </Typography>
          <Typography variant="h6" sx={{ color: '#EA580C', fontWeight: 600, mb: 1 }}>
            “Apne Construction Business Ko Naye Customers Tak Pahunchayein.”
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 620, mx: 'auto' }}>
            List your store, dealership, or stockyard on KaamSetu. Receive verified purchase inquiries directly from homeowners, builders, and contractors.
          </Typography>
        </Box>

        {registered ? (
          <Paper sx={{ p: 5, borderRadius: 4, textAlign: 'center', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }}>
            <Box sx={{ width: 68, height: 68, borderRadius: '50%', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircle2 size={38} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Supplier Business Registered!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', mb: 3 }}>
              Your supplier profile for <strong>{registered.businessName}</strong> has been created. You can now manage your product catalogue and respond to material purchase quotations in the Supplier Dashboard.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentRole('supplier');
                  navigate('/dashboard/supplier');
                }}
                endIcon={<ArrowRight size={18} />}
                sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, '&:hover': { bgcolor: '#C2410C' } }}
              >
                Go to Supplier Dashboard
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <Alert severity="info" sx={{ mb: 3.5, fontSize: '0.85rem' }}>
              <strong>Zero Listing Deduction:</strong> Quote your prices directly to customers. KaamSetu does not own inventory or take commission on wholesale truckloads.
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Business / Trade Dealership Name *"
                    fullWidth
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="e.g. Kashi Steel & Cement Traders"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Contact Person Name *"
                    fullWidth
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="e.g. Ramesh Keshari"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Phone Number *"
                    fullWidth
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Business Email (optional)"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="sales@dealership.com"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Primary Business City *"
                    fullWidth
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  >
                    {POPULAR_CITIES.map(c => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Store / Warehouse Location *"
                    fullWidth
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Transport Nagar, Yard #4"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Delivery Cities & Coverage Area (comma separated)"
                    fullWidth
                    value={formData.deliveryLocationsText}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryLocationsText: e.target.value }))}
                    placeholder="e.g. Lucknow, Unnao, Barabanki, Sitapur"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Material Categories Offered (comma separated)"
                    fullWidth
                    value={formData.materialCategoriesText}
                    onChange={(e) => setFormData(prev => ({ ...prev, materialCategoriesText: e.target.value }))}
                    placeholder="e.g. Cement, Steel / Sariya, Sand / Balu, Bricks, Tiles"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Pricing Model"
                    fullWidth
                    value={formData.pricingModel}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricingModel: e.target.value }))}
                    placeholder="e.g. Daily Mandi Rate / Wholesale Site Delivery"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Minimum Order Quantity (MOQ)"
                    fullWidth
                    value={formData.minOrderQty}
                    onChange={(e) => setFormData(prev => ({ ...prev, minOrderQty: e.target.value }))}
                    placeholder="e.g. 50 Bags / 1 Tonne / 400 cft"
                  />
                </Grid>

              </Grid>

              <Divider sx={{ my: 3.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => navigate(-1)} sx={{ color: '#64748B' }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send size={18} />}
                  sx={{
                    bgcolor: '#EA580C',
                    fontWeight: 700,
                    px: 4,
                    py: 1.3,
                    borderRadius: 2.2,
                    fontSize: '0.95rem',
                    '&:hover': { bgcolor: '#C2410C' }
                  }}
                >
                  Register Supplier Business
                </Button>
              </Box>

            </form>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
