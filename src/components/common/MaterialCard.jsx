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
  Building2,
  ShieldCheck,
  Star,
  ArrowRight,
  PhoneCall
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
        borderRadius: 4,
        bgcolor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* मैटेरियल इमेज */}
      {material.image && (
        <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }} className="image-zoom-container">
          <Box
            component="img"
            src={material.image}
            alt={material.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.6) 100%)'
            }}
          />
          <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
            <Chip
              label={material.category}
              size="small"
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                bgcolor: '#EA580C',
                color: '#FFF',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            />
          </Box>
          <Box sx={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', alignItems: 'center', gap: 0.6, bgcolor: 'rgba(15, 23, 42, 0.85)', px: 1, py: 0.3, borderRadius: 1.5, backdropFilter: 'blur(6px)' }}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4ADE80' }} />
            <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.7rem' }}>
              {material.availability}
            </Typography>
          </Box>
        </Box>
      )}

      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* सामग्री का नाम */}
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, lineHeight: 1.35, fontSize: '1rem' }}>
          {material.name}
        </Typography>

        {/* सप्लायर का नाम व शहर */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#64748B' }}>
          <Building2 size={16} color="#EA580C" />
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', fontSize: '0.84rem' }}>
            {material.supplierName}
          </Typography>
          {material.demoSupplierVerified && (
            <Tooltip title="सत्यापित डीलर / व्यापार लाइसेंस सत्यापित" arrow>
              <ShieldCheck size={16} color="#16A34A" />
            </Tooltip>
          )}
        </Box>

        {/* मूल्य / मंडी भाव ब्लॉक */}
        <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2.5, mb: 2, border: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              अनुमानित मंडी दर:
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              {material.price > 0 && material.priceType?.includes('स्थिर') ? (
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                  ₹{material.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>/ {material.unit}</span>
                </Typography>
              ) : (
                <Chip
                  label="दैनिक मंडी भाव / कोटेशन दर"
                  size="small"
                  sx={{
                    bgcolor: '#FFF7ED',
                    color: '#C2410C',
                    border: '1px solid #FFEDD5',
                    fontWeight: 700,
                    fontSize: '0.72rem'
                  }}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, pt: 1, borderTop: '1px dashed #E2E8F0' }}>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              न्यूनतम ऑर्डर:
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
              {material.minOrderQty}
            </Typography>
          </Box>
        </Box>

        {/* विवरण */}
        <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.82rem', mb: 2, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {material.description}
        </Typography>

        {/* डिलीवरी शहर एवं रेटिंग */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: '#64748B' }}>
            <Truck size={15} color="#0F172A" />
            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
              {material.supplierCity} एवं आसपास
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, bgcolor: '#FEF3C7', px: 1, py: 0.25, borderRadius: 1.5 }}>
            <Star size={13} fill="#D97706" color="#D97706" />
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#92400E' }}>
              {material.rating || 4.8}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* एक्शन बटन */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/materials/${material.id}`)}
            sx={{
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.82rem',
              py: 0.85,
              borderRadius: 2,
              '&:hover': { borderColor: '#0F172A', bgcolor: '#F8FAFC' }
            }}
          >
            विवरण देखें
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onRequestQuote(material)}
            startIcon={<PhoneCall size={14} />}
            sx={{
              bgcolor: '#EA580C',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.82rem',
              py: 0.85,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
              '&:hover': { bgcolor: '#C2410C' }
            }}
          >
            रेट पूछें
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};
