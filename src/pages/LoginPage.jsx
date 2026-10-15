import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import {
  User,
  HardHat,
  Building2,
  Truck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { currentRole, setCurrentRole, showNotification } = useApp();

  const personas = [
    {
      role: 'customer',
      title: 'Customer / Homeowner',
      name: 'Vivek Singhania',
      city: 'Lucknow',
      tagline: 'Building a new Ground+1 duplex on a 1500 sq.ft plot',
      icon: User,
      color: '#3B82F6',
      dashboardPath: '/dashboard/customer',
      features: ['Post new construction requirements', 'Track quotation responses', 'Saved workers shortlist', 'Building material orders']
    },
    {
      role: 'worker',
      title: 'Skilled Worker / Mistri',
      name: 'Rameshwar "Ramesh" Yadav',
      city: 'Lucknow',
      tagline: 'Senior Raj Mistri (14 Yrs Exp) • Masonry & RCC',
      icon: HardHat,
      color: '#EA580C',
      dashboardPath: '/dashboard/worker',
      features: ['View matched customer job leads in Lucknow', 'Accept or quote on enquiries', 'Toggle availability (Immediate / Busy)', 'Manage daily wage & contract rates']
    },
    {
      role: 'contractor',
      title: 'Contractor / Construction Team',
      name: 'Sharma Constructions & Civil Works',
      city: 'Lucknow & Eastern UP',
      tagline: 'Leading team of 35 skilled mistris & centering crew',
      icon: Building2,
      color: '#8B5CF6',
      dashboardPath: '/dashboard/contractor',
      features: ['Manage active turnkey building sites', 'Post bulk labour hiring requirements', 'Review mistri applications', 'Direct commercial project tenders']
    },
    {
      role: 'supplier',
      title: 'Building Material Supplier',
      name: 'UltraBuild Cement & Aggregates',
      city: 'Lucknow & Regional Yards',
      tagline: 'Authorized UltraTech & Aggregate Stockist',
      icon: Truck,
      color: '#0284C7',
      dashboardPath: '/dashboard/supplier',
      features: ['Add and update product catalogue prices', 'Receive wholesale site purchase leads', 'Send delivery timelines and quotation rates', 'Manage delivery trucks & radius']
    },
    {
      role: 'admin',
      title: 'Platform Admin',
      name: 'Abhishek Mishra (Raka Mishra ji)',
      city: 'Central Operations Hub',
      tagline: 'Platform Director & Founder (+91 8739000333) • Supervise registrations, verification badges & matching',
      icon: ShieldAlert,
      color: '#DC2626',
      dashboardPath: '/dashboard/admin',
      features: ['Approve / Reject pending worker & supplier profiles', 'Assign customer requirements to verified contractors', 'Manage categories & site content', 'Platform performance analytics']
    }
  ];

  const handleSelectPersona = (p) => {
    setCurrentRole(p.role);
    showNotification(`Switched persona to: ${p.title} (${p.name})`, 'success');
    navigate(p.dashboardPath);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip
            icon={<Sparkles size={14} color="#EA580C" />}
            label="Instant Interactive Role Switcher"
            sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1.5 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            Select User Persona & Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            Experience KaamSetu from any user perspective. Switch between Homeowner, Raj Mistri, Civil Contractor, Material Supplier, and Platform Admin with 1 click.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {personas.map((p) => {
            const Icon = p.icon;
            const isCurrent = currentRole === p.role;

            return (
              <Grid key={p.role} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  className="interactive-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3.5,
                    border: isCurrent ? '2px solid #EA580C' : '1px solid #E2E8F0',
                    bgcolor: '#FFFFFF',
                    p: 2.5,
                    position: 'relative'
                  }}
                >
                  {isCurrent && (
                    <Chip
                      label="Active Persona"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: '#EA580C',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: '0.68rem'
                      }}
                    />
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: `${p.color}15`,
                        color: p.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={24} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {p.name} • {p.city}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#475569', mb: 2, fontStyle: 'italic', fontSize: '0.86rem' }}>
                    "{p.tagline}"
                  </Typography>

                  <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, mb: 3, flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1 }}>
                      Available Capabilities:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                      {p.features.map((feat, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.78rem', color: '#475569' }}>
                          <CheckCircle2 size={13} color="#16A34A" />
                          <span>{feat}</span>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant={isCurrent ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => handleSelectPersona(p)}
                    endIcon={<ArrowRight size={16} />}
                    sx={{
                      bgcolor: isCurrent ? '#EA580C' : 'transparent',
                      color: isCurrent ? '#FFF' : '#0F172A',
                      borderColor: '#CBD5E1',
                      fontWeight: 700,
                      py: 1.1,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: isCurrent ? '#C2410C' : '#F1F5F9',
                        borderColor: '#0F172A'
                      }
                    }}
                  >
                    {isCurrent ? 'Open Active Dashboard' : `Switch to ${p.title}`}
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>

      </Container>
    </Box>
  );
};
