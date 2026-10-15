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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ShieldAlert,
  Users,
  HardHat,
  Building2,
  Truck,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard = () => {
  const {
    workers,
    updateWorkerStatus,
    requirements,
    updateRequirementStatus,
    contractors,
    updateContractorStatus,
    suppliers,
    updateSupplierStatus,
    showNotification
  } = useApp();

  const [adminTab, setAdminTab] = useState(0);

  // Status update modal for requirements
  const [editingReq, setEditingReq] = useState(null);
  const [reqStatus, setReqStatus] = useState('');
  const [assignedProvider, setAssignedProvider] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // Category addition modal
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [customCategories, setCustomCategories] = useState(['False Ceiling POP', 'Structural Glazing']);

  // Calculate high-level KPIs
  const totalCustomers = 480;
  const registeredWorkersCount = workers.length;
  const registeredContractorsCount = contractors.length;
  const registeredSuppliersCount = suppliers.length;

  const pendingWorkers = workers.filter(w => w.verificationStatus === 'Pending Review');
  const pendingSuppliers = suppliers.filter(s => s.verificationStatus === 'Pending Review');
  const pendingContractors = contractors.filter(c => c.verificationStatus === 'Pending Review');

  const totalPendingApprovals = pendingWorkers.length + pendingSuppliers.length + pendingContractors.length;
  const openRequirementsCount = requirements.filter(r => r.status !== 'Completed').length;

  const handleOpenReqModal = (req) => {
    setEditingReq(req);
    setReqStatus(req.status);
    setAssignedProvider(req.assignedProvider || '');
    setAdminNotes(req.notes || '');
  };

  const handleSaveReqStatus = () => {
    if (!editingReq) return;
    updateRequirementStatus(editingReq.id, reqStatus, assignedProvider, adminNotes);
    setEditingReq(null);
  };

  const handleApproveWorker = (workerId) => {
    updateWorkerStatus(workerId, 'Approved');
  };

  const handleRejectWorker = (workerId) => {
    updateWorkerStatus(workerId, 'Rejected');
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    setCustomCategories(prev => [...prev, newCategoryName]);
    showNotification(`New category "${newCategoryName}" added to directory!`, 'success');
    setNewCategoryName('');
    setCategoryModal(false);
  };

  return (
    <Box sx={{ py: 5, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<ShieldAlert size={14} color="#FFF" />}
                label="Central Platform Admin Console"
                size="small"
                sx={{ bgcolor: '#DC2626', color: '#FFF', fontWeight: 800 }}
              />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Live Marketplace Operations Desk
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
              KaamSetu Admin Operations
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, mt: 0.5 }}>
              Platform Director & Owner: <strong style={{ color: '#0F172A' }}>Abhishek Mishra (Raka Mishra ji)</strong> | Direct: <a href="tel:+918739000333" style={{ color: '#EA580C', fontWeight: 700 }}>+91 8739000333</a>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button
              component="a"
              href="tel:+918739000333"
              variant="contained"
              size="small"
              sx={{ bgcolor: '#0F172A', color: '#FFF', fontWeight: 700, borderRadius: 2 }}
            >
              Direct Call: 8739000333
            </Button>
            <Button
              variant="outlined"
              onClick={() => setCategoryModal(true)}
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600, borderRadius: 2 }}
            >
              + Add Trade Category
            </Button>
          </Box>
        </Box>

        {/* 10 Key KPI Stat Cards */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Registered Workers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#EA580C', my: 0.5 }}>
                {registeredWorkersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
                {workers.filter(w => w.isVerified).length} Verified Badged
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Pending Approvals
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: totalPendingApprovals > 0 ? '#DC2626' : '#16A34A', my: 0.5 }}>
                {totalPendingApprovals}
              </Typography>
              <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 600 }}>
                {pendingWorkers.length} Workers • {pendingSuppliers.length} Suppliers
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Active Requirements
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284C7', my: 0.5 }}>
                {requirements.length}
              </Typography>
              <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 600 }}>
                {openRequirementsCount} In Progress / Open
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Contracting Teams
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#8B5CF6', my: 0.5 }}>
                {registeredContractorsCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Across 85+ Districts
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Material Suppliers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                {registeredSuppliersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
                Stockists & Yards Active
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* Tab Navigation */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 3 }}>
          <Tabs
            value={adminTab}
            onChange={(e, v) => setAdminTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.92rem', minHeight: 56 },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C' }
            }}
          >
            <Tab label={`Pending Approvals Queue (${totalPendingApprovals})`} />
            <Tab label={`Customer Requirements Management (${requirements.length})`} />
            <Tab label={`All Registered Workers (${workers.length})`} />
            <Tab label={`Contractors & Suppliers (${contractors.length + suppliers.length})`} />
            <Tab label="Complaints & Resolution Desk (0)" />
          </Tabs>
        </Paper>

        {/* TAB 0: PENDING APPROVALS QUEUE */}
        {adminTab === 0 && (
          <Box>
            {totalPendingApprovals === 0 ? (
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF' }}>
                <CheckCircle2 size={40} color="#16A34A" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  All Profiles Reviewed & Up-to-Date!
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  No worker or supplier registrations are waiting for verification.
                </Typography>
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                {/* Pending Workers */}
                {pendingWorkers.length > 0 && (
                  <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                      Pending Worker Registrations ({pendingWorkers.length})
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Worker Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Primary Skill</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Expected Wage</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingWorkers.map(w => (
                            <TableRow key={w.id}>
                              <TableCell sx={{ fontWeight: 700 }}>{w.name}</TableCell>
                              <TableCell><Chip label={w.primarySkill} size="small" sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 600 }} /></TableCell>
                              <TableCell>{w.city} ({w.locality})</TableCell>
                              <TableCell>{w.experienceYears} Years</TableCell>
                              <TableCell>{w.expectedWage}</TableCell>
                              <TableCell><Chip label="Pending Review" size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700 }} /></TableCell>
                              <TableCell sx={{ textAlign: 'right' }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleApproveWorker(w.id)}
                                  startIcon={<CheckCircle2 size={14} />}
                                  sx={{ bgcolor: '#16A34A', fontWeight: 700, mr: 1, '&:hover': { bgcolor: '#15803D' } }}
                                >
                                  Approve & Verify
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleRejectWorker(w.id)}
                                  sx={{ color: '#DC2626', borderColor: '#DC2626', fontWeight: 600 }}
                                >
                                  Reject
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                )}

                {/* Pending Suppliers */}
                {pendingSuppliers.length > 0 && (
                  <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                      Pending Supplier Registrations ({pendingSuppliers.length})
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Business Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Contact Person</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Categories</TableCell>
                            <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingSuppliers.map(s => (
                            <TableRow key={s.id}>
                              <TableCell sx={{ fontWeight: 700 }}>{s.businessName}</TableCell>
                              <TableCell>{s.contactPerson} ({s.phone})</TableCell>
                              <TableCell>{s.location}</TableCell>
                              <TableCell>{s.materialCategories.join(', ')}</TableCell>
                              <TableCell sx={{ textAlign: 'right' }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => updateSupplierStatus(s.id, 'Approved')}
                                  sx={{ bgcolor: '#16A34A', fontWeight: 700, mr: 1 }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => updateSupplierStatus(s.id, 'Rejected')}
                                  sx={{ color: '#DC2626' }}
                                >
                                  Reject
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                )}

              </Box>
            )}
          </Box>
        )}

        {/* TAB 1: CUSTOMER REQUIREMENTS MANAGEMENT */}
        {adminTab === 1 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                All Customer Requirements ({requirements.length})
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Ref ID</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type & Category</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Budget</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Assigned Provider</TableCell>
                    <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell sx={{ fontWeight: 700 }}>{req.id}</TableCell>
                      <TableCell>{req.customerName} ({req.mobile})</TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                          {req.requirementType}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {req.serviceCategory}
                        </Typography>
                      </TableCell>
                      <TableCell>{req.city} ({req.locality})</TableCell>
                      <TableCell>{req.budget}</TableCell>
                      <TableCell>
                        <Chip
                          label={req.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: req.status === 'Completed' ? '#F1F5F9' : req.status === 'Assigned' ? '#F3E8FF' : '#FEF3C7',
                            color: req.status === 'Completed' ? '#475569' : req.status === 'Assigned' ? '#7E22CE' : '#B45309'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: '#EA580C', fontWeight: 600 }}>
                        {req.assignedProvider}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenReqModal(req)}
                          sx={{ borderColor: '#EA580C', color: '#EA580C', fontWeight: 700 }}
                        >
                          Update Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 2: ALL REGISTERED WORKERS */}
        {adminTab === 2 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Registered Worker Registry ({workers.length})
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Worker ID & Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Primary Skill</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Verification</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status Toggle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workers.map(w => (
                    <TableRow key={w.id}>
                      <TableCell sx={{ fontWeight: 700 }}>
                        {w.name}
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          ID: {w.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{w.primarySkill}</TableCell>
                      <TableCell>{w.city}</TableCell>
                      <TableCell>{w.experienceYears} Years</TableCell>
                      <TableCell>
                        {w.isVerified ? (
                          <Chip icon={<ShieldCheck size={14} color="#15803D" />} label="Verified" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                        ) : (
                          <Chip label={w.verificationStatus} size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309' }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => updateWorkerStatus(w.id, w.verificationStatus === 'Approved' ? 'Suspended' : 'Approved')}
                          sx={{ color: w.verificationStatus === 'Approved' ? '#DC2626' : '#16A34A', fontSize: '0.75rem' }}
                        >
                          {w.verificationStatus === 'Approved' ? 'Suspend' : 'Re-Approve'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 3: CONTRACTORS & SUPPLIERS */}
        {adminTab === 3 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Registered Contractors ({contractors.length})
                </Typography>
                <List dense>
                  {contractors.map(c => (
                    <ListItem key={c.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{c.businessName}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>Contact: {c.contactPerson} • {c.city}</Typography>
                      </Box>
                      <Chip label={c.verificationStatus} size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Registered Material Suppliers ({suppliers.length})
                </Typography>
                <List dense>
                  {suppliers.map(s => (
                    <ListItem key={s.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{s.businessName}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>Location: {s.location} • {s.phone}</Typography>
                      </Box>
                      <Chip label={s.verificationStatus} size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* TAB 4: COMPLAINTS & FEEDBACK */}
        {adminTab === 4 && (
          <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <CheckCircle2 size={40} color="#16A34A" style={{ marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Zero Open Dispute Complaints
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 480, mx: 'auto', mt: 1 }}>
              Customers and providers report disputes through the Contact / Trust desk. All previous simulated resolutions are in good standing.
            </Typography>
          </Paper>
        )}

        {/* Dialog: Edit Requirement Status */}
        <Dialog open={Boolean(editingReq)} onClose={() => setEditingReq(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Update Requirement Status ({editingReq?.id})
          </DialogTitle>
          <DialogContent dividers>
            {editingReq && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Customer: <strong>{editingReq.customerName}</strong> • {editingReq.city}
                </Typography>
                <TextField
                  select
                  label="Requirement Workflow Status"
                  fullWidth
                  size="small"
                  value={reqStatus}
                  onChange={(e) => setReqStatus(e.target.value)}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="Provider Contacted">Provider Contacted</MenuItem>
                  <MenuItem value="Quotation Received">Quotation Received</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  label="Assigned Provider (Worker or Contractor Name)"
                  fullWidth
                  size="small"
                  value={assignedProvider}
                  onChange={(e) => setAssignedProvider(e.target.value)}
                  placeholder="e.g. Rameshwar Yadav (Raj Mistri) or Sharma Civil Works"
                />
                <TextField
                  label="Internal Operations Notes"
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about site inspection or quotation progress."
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingReq(null)}>Cancel</Button>
            <Button onClick={handleSaveReqStatus} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
              Save Status Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Add Category */}
        <Dialog open={categoryModal} onClose={() => setCategoryModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>Add New Trade Category</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="New Trade / Skill Category Name"
              fullWidth
              size="small"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. False Ceiling & Gypsum Board"
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCategoryModal(false)}>Cancel</Button>
            <Button onClick={handleAddCategory} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700 }}>
              Add Category
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
