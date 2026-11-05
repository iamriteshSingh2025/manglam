import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Building2,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  Grid as GridIcon,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Axe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServiceCard = ({ service, onEnquire }) => {
  const navigate = useNavigate();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 size={22} color="#FFFFFF" />;
      case 'Hammer': return <Hammer size={22} color="#FFFFFF" />;
      case 'Paintbrush': return <Paintbrush size={22} color="#FFFFFF" />;
      case 'Zap': return <Zap size={22} color="#FFFFFF" />;
      case 'Droplets': return <Droplets size={22} color="#FFFFFF" />;
      case 'Grid': return <GridIcon size={22} color="#FFFFFF" />;
      case 'ShieldCheck': return <ShieldCheck size={22} color="#FFFFFF" />;
      case 'Axe': return <Axe size={22} color="#FFFFFF" />;
      default: return <Hammer size={22} color="#FFFFFF" />;
    }
  };

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
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
      }}
    >
      {/* सर्विस इमेज हेडर (AI जनरेटेड इमेज) */}
      {service.image && (
        <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }} className="image-zoom-container">
          <Box
            component="img"
            src={service.image}
            alt={service.title}
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
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.75) 100%)'
            }}
          />
          <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
            <Chip
              label={service.category}
              size="small"
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                color: '#FFF',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            />
          </Box>
          <Box sx={{ position: 'absolute', bottom: 12, left: 14, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: '#EA580C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              {getServiceIcon(service.icon)}
            </Box>
            <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, letterSpacing: '0.02em' }}>
              सत्यापित निर्माण सेवा
            </Typography>
          </Box>
        </Box>
      )}

      <CardContent sx={{ p: { xs: 2.2, sm: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, fontSize: '1.12rem', lineHeight: 1.3 }}>
          {service.title}
        </Typography>

        <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700, mb: 1.5, fontSize: '0.86rem' }}>
          {service.tagline}
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontSize: '0.86rem', lineHeight: 1.6 }}>
          {service.description}
        </Typography>

        {/* कार्य दायरा (इनक्लूजन) */}
        <Box sx={{ mb: 2, bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
          <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, display: 'block', mb: 1 }}>
            शामिल कार्य दायरा (Scope of Work):
          </Typography>
          <List dense disablePadding>
            {service.scope.slice(0, 3).map((item, idx) => (
              <ListItem key={idx} disableGutters sx={{ py: 0.3 }}>
                <ListItemIcon sx={{ minWidth: 22 }}>
                  <CheckCircle2 size={15} color="#16A34A" />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* समय सीमा एवं मूल्य निर्धारण */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontSize: '0.78rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: '#64748B' }}>
            <Clock size={15} color="#EA580C" />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
              {service.duration}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', bgcolor: '#F1F5F9', px: 1, py: 0.4, borderRadius: 1.5 }}>
            {service.pricingModel.split('(')[0]}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* एक्शन बटन */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/services/${service.id}`)}
            sx={{
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              borderRadius: 2,
              fontSize: '0.82rem',
              py: 0.85,
              '&:hover': { borderColor: '#0F172A', bgcolor: '#F8FAFC' }
            }}
          >
            विस्तार देखें
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onEnquire(service)}
            endIcon={<ArrowRight size={15} />}
            sx={{
              bgcolor: '#EA580C',
              color: '#FFF',
              fontWeight: 700,
              borderRadius: 2,
              fontSize: '0.82rem',
              py: 0.85,
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
              '&:hover': { bgcolor: '#C2410C' }
            }}
          >
            कोटेशन पाएं
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
