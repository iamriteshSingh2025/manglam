import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert
} from '@mui/material';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Users,
  MapPin,
  Building2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Bookmark
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CustomerDashboard = ({ onOpenPostModal }) => {
  const navigate = useNavigate();
  const { requirements, workers, savedWorkers, updateRequirementStatus } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
      case 'Under Review': return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Assigned': return { bg: '#F3E8FF', color: '#7E22CE', border: '#E9D5FF' };
      case 'Provider Contacted': return { bg: '#E0F2FE', color: '#0369A1', border: '#BAE6FD' };
      case 'Quotation Received': return { bg: '#FFEDD5', color: '#C2410C', border: '#FED7AA' };
      case 'Confirmed': return { bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' };
      case 'In Progress': return { bg: '#CCFBF1', color: '#0F766E', border: '#99F6E4' };
      case 'Completed': return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      default: return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
    }
  };

  const bookmarkedWorkers = workers.filter(w => savedWorkers.includes(w.id));

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label="Homeowner / Customer Portal" size="small" sx={{ bgcolor: '#3B82F6', color: '#FFF', fontWeight: 700 }} />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Account: Vivek Singhania (Lucknow)
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
              My Construction Dashboard
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
            startIcon={<PlusCircle size={18} />}
            sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
          >
            Post New Requirement
          </Button>
        </Box>

        {/* Dashboard Tabs */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.92rem', minHeight: 56 },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C' }
            }}
          >
            <Tab label={`My Posted Requirements (${requirements.length})`} />
            <Tab label={`Saved Workers & Mistris (${bookmarkedWorkers.length})`} />
            <Tab label="Quotation Inquiries" />
          </Tabs>
        </Paper>

        {/* Tab 0: Requirements */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {requirements.map((req) => {
              const statusStyle = getStatusColor(req.status);
              return (
                <Grid key={req.id} size={{ xs: 12, md: 6 }}>
                  <Card sx={{ borderRadius: 3.5, border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Top Row: Ref ID & Status */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          {req.id}
                        </Typography>
                        <Chip
                          label={req.status}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                            fontWeight: 700,
                            fontSize: '0.72rem'
                          }}
                        />
                      </Box>

                      {/* Requirement Type & Category */}
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, lineHeight: 1.3 }}>
                        {req.requirementType} — {req.serviceCategory}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#64748B', fontSize: '0.82rem', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MapPin size={14} color="#EA580C" />
                          <span>{req.city} ({req.locality})</span>
                        </Box>
                        <span>•</span>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Clock size={14} />
                          <span>Posted {req.createdAt}</span>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: '#475569', mb: 2.5, lineHeight: 1.6, flex: 1 }}>
                        {req.description}
                      </Typography>

                      {/* Metadata Box */}
                      <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, border: '1px solid #F1F5F9', mb: 2 }}>
                        <Grid container spacing={1}>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Scope Mode:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                              {req.scopeType}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Budget Estimate:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                              {req.budget}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                              Assigned Provider / Contacted:
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#EA580C' }}>
                              {req.assignedProvider}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Notes / updates */}
                      {req.notes && (
                        <Typography variant="caption" sx={{ color: '#64748B', fontStyle: 'italic', display: 'block', mb: 2 }}>
                          Latest Note: {req.notes}
                        </Typography>
                      )}

                      <Divider sx={{ mb: 2, mt: 'auto' }} />

                      {/* Action buttons */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                          size="small"
                          onClick={() => {
                            const newStatus = req.status === 'Completed' ? 'In Progress' : 'Completed';
                            updateRequirementStatus(req.id, newStatus);
                          }}
                          sx={{ color: '#64748B', fontSize: '0.78rem', textTransform: 'none' }}
                        >
                          Mark as {req.status === 'Completed' ? 'Reopen' : 'Completed'}
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate('/workers')}
                          sx={{ borderColor: '#EA580C', color: '#EA580C', fontWeight: 700, borderRadius: 1.5 }}
                        >
                          Find More Providers
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Tab 1: Saved Workers */}
        {activeTab === 1 && (
          <Box>
            {bookmarkedWorkers.length === 0 ? (
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF' }}>
                <Bookmark size={40} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>No saved workers yet.</Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                  Click the bookmark icon on any worker card to save them to your shortlist.
                </Typography>
                <Button component={Link} to="/workers" variant="contained" sx={{ bgcolor: '#EA580C' }}>
                  Browse Workers
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {bookmarkedWorkers.map(w => (
                  <Grid key={w.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                            {w.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                            {w.primarySkill}
                          </Typography>
                        </Box>
                        <Chip size="small" label={w.city} sx={{ bgcolor: '#F1F5F9' }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                        {w.experienceYears} Years Exp • {w.expectedWage}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/workers/${w.id}`}
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{ bgcolor: '#0F172A', fontWeight: 600 }}
                      >
                        View Profile & Contact
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Tab 2: Quotations received */}
        {activeTab === 2 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Active Quotation Discussions
            </Typography>
            <List>
              {[
                { provider: 'Dinesh Verma (Painter)', service: '3 BHK Repainting', rate: '₹42,000 Total Labour', status: 'Ready for Acceptance' },
                { provider: 'Sharma Constructions & Civil Works', service: 'Ground + 1 Turnkey Construction', rate: '₹1,550 / sq.ft built-up', status: 'Site Visit Completed' },
                { provider: 'UltraBuild Materials', service: '400 Bags PPC Cement + 15 Tonne Steel', rate: '₹380/bag + ₹68,500/tonne', status: 'Wholesale Delivery Quote' },
              ].map((item, idx) => (
                <ListItem key={idx} sx={{ p: 2, mb: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.provider}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Project: {item.service} • Quoted: <strong style={{ color: '#16A34A' }}>{item.rate}</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size="small" label={item.status} sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 600 }} />
                    <Button size="small" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 600 }}>
                      Accept & Confirm
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
