import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Package,
  Truck,
  MapPin,
  Building2,
  CheckCircle2,
  FileQuestion,
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MaterialCard = ({ material, onRequestQuote }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="interactive-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3.5,
        bgcolor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        p: { xs: 2, sm: 2.5 },
      }}
    >
      {/* Category & Availability badge */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Chip
          label={material.category}
          size="small"
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            bgcolor: 'rgba(234, 88, 12, 0.08)',
            color: '#EA580C',
            border: '1px solid rgba(234, 88, 12, 0.2)'
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#16A34A' }} />
          <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
            {material.availability}
          </Typography>
        </Box>
      </Box>

      {/* Product Name */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.75, lineHeight: 1.3 }}>
        {material.name}
      </Typography>

      {/* Supplier Name & City */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#64748B' }}>
        <Building2 size={15} color="#0F172A" />
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', fontSize: '0.84rem' }}>
          {material.supplierName}
        </Typography>
        {material.demoSupplierVerified && (
          <Tooltip title="Registered Business Supplier with commercial trade license" arrow>
            <ShieldCheck size={15} color="#16A34A" />
          </Tooltip>
        )}
      </Box>

      {/* Price / Request Price Block */}
      <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, mb: 2, border: '1px solid #F1F5F9' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            Indicative Rate:
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            {material.price > 0 && material.priceType?.includes('Fixed') ? (
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                ₹{material.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>/ {material.unit}</span>
              </Typography>
            ) : (
              <Chip
                icon={<FileQuestion size={13} color="#C2410C" />}
                label="Request Price / Daily Mandi Rate"
                size="small"
                sx={{
                  bgcolor: '#FFF7ED',
                  color: '#C2410C',
                  border: '1px solid #FFEDD5',
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            )}
          </Box>
        </Box>

        {/* Minimum Order Qty */}
        {material.minOrderQty && (
          <Typography variant="caption" sx={{ color: '#475569', display: 'block', mt: 0.5 }}>
            <strong>MOQ:</strong> {material.minOrderQty}
          </Typography>
        )}
      </Box>

      {/* Delivery Locations */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', gap: 0.75, color: '#64748B', fontSize: '0.8rem' }}>
        <Truck size={15} color="#EA580C" style={{ marginTop: 2, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.4 }}>
          <strong>Delivery Locations:</strong> {material.deliveryLocations.join(', ')}
        </Typography>
      </Box>

      {/* Short Description */}
      <Typography variant="caption" sx={{ color: '#64748B', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
        {material.description}
      </Typography>

      <Divider sx={{ mt: 'auto', mb: 1.75 }} />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => navigate(`/materials/${material.id}`)}
          sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600, borderRadius: 2 }}
        >
          Details
        </Button>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => onRequestQuote(material)}
          sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
        >
          Request Quote
        </Button>
      </Box>
    </Card>
  );
};
