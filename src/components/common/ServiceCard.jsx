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
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServiceCard = ({ service, onEnquire }) => {
  const navigate = useNavigate();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 size={24} color="#EA580C" />;
      case 'Hammer': return <Hammer size={24} color="#EA580C" />;
      case 'Paintbrush': return <Paintbrush size={24} color="#EA580C" />;
      case 'Zap': return <Zap size={24} color="#EA580C" />;
      case 'Droplets': return <Droplets size={24} color="#EA580C" />;
      case 'Grid': return <GridIcon size={24} color="#EA580C" />;
      case 'ShieldCheck': return <ShieldCheck size={24} color="#EA580C" />;
      case 'Flame': return <Flame size={24} color="#EA580C" />;
      default: return <Hammer size={24} color="#EA580C" />;
    }
  };

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
        p: { xs: 2, sm: 2.5 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: 'rgba(234, 88, 12, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getServiceIcon(service.icon)}
        </Box>
        <Chip
          label={service.category}
          size="small"
          sx={{
            fontSize: '0.72rem',
            fontWeight: 600,
            bgcolor: '#F1F5F9',
            color: '#475569',
            border: '1px solid #E2E8F0'
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5, fontSize: '1.1rem' }}>
        {service.title}
      </Typography>

      <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 600, mb: 1.5, fontSize: '0.84rem' }}>
        {service.tagline}
      </Typography>

      <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontSize: '0.86rem', lineHeight: 1.5 }}>
        {service.description}
      </Typography>

      {/* Scope Checklist */}
      <Box sx={{ mb: 2, bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, border: '1px solid #F1F5F9' }}>
        <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700, display: 'block', mb: 1 }}>
          Included Execution Scope:
        </Typography>
        <List dense disablePadding>
          {service.scope.slice(0, 3).map((item, idx) => (
            <ListItem key={idx} disableGutters sx={{ py: 0.2 }}>
              <ListItemIcon sx={{ minWidth: 22 }}>
                <CheckCircle2 size={14} color="#16A34A" />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ fontSize: '0.78rem', color: '#334155', fontWeight: 500 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Key Workers & Timeline */}
      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontSize: '0.78rem', color: '#64748B' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Clock size={14} color="#64748B" />
          <span>{service.duration}</span>
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A' }}>
          {service.pricingModel.split('(')[0]}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => navigate(`/services/${service.id}`)}
          sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600, borderRadius: 2 }}
        >
          View Scope
        </Button>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => onEnquire(service)}
          endIcon={<ArrowRight size={15} />}
          sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
        >
          Get Quote
        </Button>
      </Box>
    </Card>
  );
};
