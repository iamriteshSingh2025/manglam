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
  List,
  ListItem,
  Alert
} from '@mui/material';
import {
  Building2,
  Users,
  HardHat,
  PlusCircle,
  Clock,
  CheckCircle2,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContractorDashboard = () => {
  const { contractors, workers, showNotification } = useApp();
  const myContractor = contractors[0] || {
    businessName: 'Sharma Constructions & Civil Works',
    contactPerson: 'Er. Ashutosh Sharma',
    city: 'Lucknow',
    teamSize: '35 Workers & Mistris'
  };

  // State for posting labour hiring requirement
  const [labourModalOpen, setLabourModalOpen] = useState(false);
  const [labourReq, setLabourReq] = useState({
    skillNeeded: 'Raj Mistri & Masonry Helpers',
    headcount: '6 Mistri + 10 Helpers',
    siteLocation: 'Gomti Nagar Extension, Lucknow',
    durationDays: '20 Days',
    dailyRateOffered: '₹950 / Mistri & ₹500 / Helper'
  });

  const [activeHiringPosts, setActiveHiringPosts] = useState([
    {
      id: 'LBR-101',
      skillNeeded: 'Bar Bending / Sariya Mistris',
      headcount: '4 Mistris',
      siteLocation: 'Shaheed Path Site, Lucknow',
      durationDays: '12 Days',
      dailyRateOffered: '₹900 / day',
      applicantsCount: 6,
      status: 'Actively Hiring'
    },
    {
      id: 'LBR-102',
      skillNeeded: 'Shuttering Carpenters',
      headcount: '8 Workers',
      siteLocation: 'Indiranagar Commercial Plaza',
      durationDays: '15 Days',
      dailyRateOffered: '₹900 / day',
      applicantsCount: 11,
      status: 'Actively Hiring'
    }
  ]);

  const handlePostLabourReq = (e) => {
    e.preventDefault();
    const newPost = {
      id: `LBR-${Math.floor(100 + Math.random() * 900)}`,
      ...labourReq,
      applicantsCount: 0,
      status: 'Actively Hiring'
    };
    setActiveHiringPosts(prev => [newPost, ...prev]);
    showNotification('Labour requirement posted! Nearby mistris will receive job alerts.', 'success');
    setLabourModalOpen(false);
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
                bgcolor: '#8B5CF6',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.5rem'
              }}
            >
              <Building2 size={32} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                {myContractor.businessName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#C4B5FD', fontWeight: 600 }}>
                Contractor: {myContractor.contactPerson} • Base: {myContractor.city}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Core Team: {myContractor.teamSize} • Verified Civil Contracting License
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => setLabourModalOpen(true)}
            startIcon={<PlusCircle size={18} />}
            sx={{ bgcolor: '#EA580C', fontWeight: 700, px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#C2410C' } }}
          >
            Hire Labour / Mistri Team
          </Button>
        </Paper>

        <Grid container spacing={4}>
          
          {/* Active Construction Sites */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
              Active Construction Sites
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
              {[
                { title: 'G+2 Luxury Residential Duplex', location: 'Gomti Nagar, Sector 4', progress: 'Slab Shuttering & Steel Mesh', crew: '14 Workers active', budget: '₹42,00,000' },
                { title: 'Commercial Retail Showroom Framing', location: 'Varanasi Ring Road', progress: 'Brick Masonry (1st Floor)', crew: '18 Workers active', budget: '₹75,00,000' }
              ].map((site, i) => (
                <Card key={i} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {site.title}
                      </Typography>
                      <Chip label="In Execution" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B', fontSize: '0.85rem', mb: 1.5 }}>
                      <MapPin size={15} color="#EA580C" />
                      <span>{site.location}</span>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                      Current Milestone: <strong>{site.progress}</strong> • Assigned: {site.crew}
                    </Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Contract Value: <strong style={{ color: '#0F172A' }}>{site.budget}</strong>
                      </Typography>
                      <Button size="small" sx={{ color: '#EA580C', fontWeight: 700 }}>
                        Site Log & Daily Attendance →
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Labour Requirements Posted by Contractor */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
              Your Labour Hiring Posts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activeHiringPosts.map((post) => (
                <Card key={post.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {post.skillNeeded} ({post.headcount})
                      </Typography>
                      <Chip label={post.status} size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                      📍 {post.siteLocation} • Duration: {post.durationDays} • Rate: {post.dailyRateOffered}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, pt: 1, borderTop: '1px solid #F1F5F9' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#16A34A' }}>
                        {post.applicantsCount} Workers Applied
                      </Typography>
                      <Button size="small" variant="outlined" sx={{ borderColor: '#CBD5E1', color: '#0F172A' }}>
                        Review Worker Applications
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

          </Grid>

          {/* Right Column: Team Roster & Fast Hire */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                Contracting Team Resources
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Available workforce under Sharma Civil Works
              </Typography>
              <List dense disablePadding>
                {[
                  { trade: 'Head Raj Mistris', count: '6 Permanent' },
                  { trade: 'Bar Bending / Centering Masters', count: '4 Permanent' },
                  { trade: 'Skilled Shuttering Carpenters', count: '8 On-call' },
                  { trade: 'Masonry Labour & Helpers', count: '17 On-call' },
                  { trade: 'Concrete Mixer & Centering Plates', count: '2 Machines + 5,000 sq.ft plates' }
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>
                      {item.trade}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.count}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                Direct Sourcing Shortcuts
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Source materials and sub-contractors on KaamSetu
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button component={Link} to="/materials" variant="outlined" fullWidth sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                  Order Bulk Cement & Sariya
                </Button>
                <Button component={Link} to="/workers" variant="outlined" fullWidth sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                  Search Specialized Electricians
                </Button>
              </Box>
            </Paper>

          </Grid>

        </Grid>

        {/* Modal: Post Labour Requirement */}
        <Dialog open={labourModalOpen} onClose={() => setLabourModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Post Labour Requirement for Project Site
          </DialogTitle>
          <form onSubmit={handlePostLabourReq}>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Specific Trade or Skill Needed *"
                  fullWidth
                  required
                  value={labourReq.skillNeeded}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, skillNeeded: e.target.value }))}
                  placeholder="e.g. Shuttering Carpenter & Sariya Helpers"
                />
                <TextField
                  label="Required Headcount *"
                  fullWidth
                  required
                  value={labourReq.headcount}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, headcount: e.target.value }))}
                  placeholder="e.g. 8 Mistri + 12 Helpers"
                />
                <TextField
                  label="Construction Site Location *"
                  fullWidth
                  required
                  value={labourReq.siteLocation}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, siteLocation: e.target.value }))}
                  placeholder="e.g. Shaheed Path, Sector 7, Lucknow"
                />
                <TextField
                  label="Work Duration (Days/Weeks) *"
                  fullWidth
                  required
                  value={labourReq.durationDays}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, durationDays: e.target.value }))}
                  placeholder="e.g. 15 Working Days"
                />
                <TextField
                  label="Daily Wage or Rate Offered *"
                  fullWidth
                  required
                  value={labourReq.dailyRateOffered}
                  onChange={(e) => setLabourReq(prev => ({ ...prev, dailyRateOffered: e.target.value }))}
                  placeholder="e.g. ₹950/day (Mistri), ₹500/day (Helper)"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLabourModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
                Broadcast to Workers
              </Button>
            </DialogActions>
          </form>
        </Dialog>

      </Container>
    </Box>
  );
};
