import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem
} from '@mui/material';
import {
  HardHat,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  CheckCircle2,
  DollarSign,
  Send,
  Building2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WorkerDashboard = () => {
  const { workers, toggleWorkerAvailability, requirements, showNotification } = useApp();

  // Rameshwar Yadav is the demo worker
  const myProfile = workers.find(w => w.id === 'w-101') || workers[0];

  // Matched job enquiries from requirements (Lucknow + Raj Mistri)
  const matchedEnquiries = requirements.filter(req =>
    req.city.toLowerCase().includes(myProfile.city.toLowerCase()) ||
    req.serviceCategory.toLowerCase().includes(myProfile.primarySkill.toLowerCase())
  );

  // Quote modal
  const [selectedReq, setSelectedReq] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteDays, setQuoteDays] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  const handleSendQuote = () => {
    if (!quoteAmount) {
      alert('Please enter your quoted rate.');
      return;
    }
    showNotification(`Quotation of ${quoteAmount} sent to customer for requirement ${selectedReq.id}!`, 'success');
    setSelectedReq(null);
    setQuoteAmount('');
    setQuoteDays('');
    setQuoteNotes('');
  };

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Worker Header Card */}
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
                borderRadius: '50%',
                bgcolor: '#EA580C',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.5rem',
                border: '2px solid #FFF'
              }}
            >
              {myProfile.name.charAt(0)}
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
                  {myProfile.name}
                </Typography>
                {myProfile.isVerified ? (
                  <Chip
                    size="small"
                    icon={<ShieldCheck size={14} color="#15803D" />}
                    label="Admin Verified"
                    sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }}
                  />
                ) : (
                  <Chip size="small" label={myProfile.verificationStatus} sx={{ bgcolor: '#FEF3C7', color: '#B45309' }} />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                {myProfile.primarySkill} • {myProfile.city} ({myProfile.locality})
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                {myProfile.experienceYears} Years Experience • Base Wage: {myProfile.expectedWage}
              </Typography>
            </Box>
          </Box>

          {/* Availability Toggle */}
          <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', p: 1.5, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
                Current Status:
              </Typography>
              <Typography variant="subtitle2" sx={{ color: myProfile.isAvailable ? '#4ADE80' : '#FBBF24', fontWeight: 700 }}>
                {myProfile.availability}
              </Typography>
            </Box>
            <Switch
              checked={myProfile.isAvailable}
              onChange={() => toggleWorkerAvailability(myProfile.id)}
              color="success"
            />
          </Box>
        </Paper>

        <Grid container spacing={4}>
          
          {/* Left Column: Matched Job Enquiries */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  New Job Enquiries Matching Your Trade
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Direct customer construction requirements posted in {myProfile.city}.
                </Typography>
              </Box>
              <Chip label={`${matchedEnquiries.length} New Leads`} sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {matchedEnquiries.map((req) => (
                <Card key={req.id} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          {req.customerName} • {req.city} ({req.locality})
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700 }}>
                          {req.requirementType} — {req.serviceCategory}
                        </Typography>
                      </Box>
                      <Chip label={`Ref: ${req.id}`} size="small" sx={{ bgcolor: '#F1F5F9', fontWeight: 600 }} />
                    </Box>

                    <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.5 }}>
                      {req.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, bgcolor: '#F8FAFC', p: 1.25, borderRadius: 2, mb: 2, fontSize: '0.8rem', color: '#334155' }}>
                      <span><strong>Budget:</strong> {req.budget}</span>
                      <span><strong>Start:</strong> {req.preferredStartDate}</span>
                      <span><strong>Scope:</strong> {req.scopeType}</span>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Posted: {req.createdAt}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setSelectedReq(req)}
                        startIcon={<Send size={15} />}
                        sx={{ bgcolor: '#EA580C', fontWeight: 700, borderRadius: 1.5, '&:hover': { bgcolor: '#C2410C' } }}
                      >
                        Respond with Quotation
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Column: Profile Summary & Wage Ledger */}
          <Grid size={{ xs: 12, md: 4 }}>
            
            {/* Profile Skills Box */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Your Skills & Specializations
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                <Chip label={myProfile.primarySkill} sx={{ bgcolor: '#0F172A', color: '#FFF', fontWeight: 700 }} />
                {myProfile.additionalSkills?.map(s => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 600 }} />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5 }}>
                Working Radius:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                Within {myProfile.workingRadiusKm} Km of {myProfile.locality}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5 }}>
                Engagement Preferences:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {myProfile.workTypes?.map(wt => (
                  <Chip key={wt} label={wt} size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600 }} />
                ))}
              </Box>
            </Paper>

            {/* Performance Ledger Demo */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                Work History & Completed Sites
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Past construction jobs logged through KaamSetu
              </Typography>
              <List dense disablePadding>
                {[
                  { site: 'G+1 Villa Brick Masonry (Gomti Nagar)', days: '28 Days Completed', earnings: '₹26,600' },
                  { site: 'Boundary Wall & Column Centering (Indiranagar)', days: '9 Days Completed', earnings: '₹8,550' },
                  { site: 'Second Floor Extension Brickwork (Aliganj)', days: '14 Days Completed', earnings: '₹13,300' }
                ].map((job, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                        {job.site}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {job.days}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#16A34A' }}>
                      {job.earnings}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

          </Grid>

        </Grid>

        {/* Modal: Respond to enquiry with quote */}
        <Dialog open={Boolean(selectedReq)} onClose={() => setSelectedReq(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            Submit Quotation to Customer
          </DialogTitle>
          <DialogContent dividers>
            {selectedReq && (
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Submitting quote for requirement <strong>{selectedReq.id}</strong> ({selectedReq.serviceCategory}) from <strong>{selectedReq.customerName}</strong>.
                </Alert>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                  <TextField
                    label="Your Proposed Daily Wage / Total Contract Rate *"
                    fullWidth
                    size="small"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="e.g. ₹950/day or ₹35,000 Total Labour Contract"
                  />
                  <TextField
                    label="Estimated Days to Complete"
                    fullWidth
                    size="small"
                    value={quoteDays}
                    onChange={(e) => setQuoteDays(e.target.value)}
                    placeholder="e.g. 10 Working Days"
                  />
                  <TextField
                    label="Message / Proposal Details to Customer"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="e.g. I will bring 1 helper along with me. Can start site work this Wednesday."
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedReq(null)}>Cancel</Button>
            <Button onClick={handleSendQuote} variant="contained" sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, fontWeight: 700 }}>
              Send Quote to Customer
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
