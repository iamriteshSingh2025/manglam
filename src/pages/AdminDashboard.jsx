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
  List,
  ListItem
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
  Clock,
  ShieldCheck,
  PlusCircle,
  PhoneCall
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

  // स्टेटस अपडेट मोडल
  const [editingReq, setEditingReq] = useState(null);
  const [reqStatus, setReqStatus] = useState('');
  const [assignedProvider, setAssignedProvider] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // नई श्रेणी जोड़ने का मोडल
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [customCategories, setCustomCategories] = useState(['फॉल्स सीलिंग POP', 'स्ट्रक्चरल ग्लेज़िंग एवं ग्लास']);

  const registeredWorkersCount = workers.length;
  const registeredContractorsCount = contractors.length;
  const registeredSuppliersCount = suppliers.length;

  const pendingWorkers = workers.filter(w => w.verificationStatus === 'Pending Review' || w.verificationStatus === 'समीक्षाधीन');
  const pendingSuppliers = suppliers.filter(s => s.verificationStatus === 'Pending Review' || s.verificationStatus === 'समीक्षाधीन');
  const pendingContractors = contractors.filter(c => c.verificationStatus === 'Pending Review' || c.verificationStatus === 'समीक्षाधीन');

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
    showNotification(`आवश्यकता ${editingReq.id} का स्टेटस सफलतापूर्वक अपडेट किया गया!`, 'success');
    setEditingReq(null);
  };

  const handleApproveWorker = (workerId) => {
    updateWorkerStatus(workerId, 'Approved');
    showNotification('कारीगर प्रोफाइल को सत्यापित कर दिया गया!', 'success');
  };

  const handleRejectWorker = (workerId) => {
    updateWorkerStatus(workerId, 'Rejected');
    showNotification('कारीगर प्रोफाइल अस्वीकार कर दी गई।', 'info');
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    setCustomCategories(prev => [...prev, newCategoryName]);
    showNotification(`नई श्रेणी "${newCategoryName}" डायरेक्टरी में जोड़ी गई!`, 'success');
    setNewCategoryName('');
    setCategoryModal(false);
  };

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* हेडर */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<ShieldAlert size={14} color="#FFF" />}
                label="केंद्रीय प्लेटफॉर्म एडमिन कंसोल"
                size="small"
                sx={{ bgcolor: '#DC2626', color: '#FFF', fontWeight: 800 }}
              />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                लाइव संचालन एवं नियंत्रण डेस्क
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
              मंगलम विश्वकर्मा — एडमिन संचालन
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, mt: 0.5 }}>
              प्लेटफॉर्म संचालक एवं मुख्य मालिक: <strong style={{ color: '#0F172A' }}>अभिषेक मिश्रा (राका मिश्रा जी / राका भैया)</strong> | सीधी हेल्पलाइन:{' '}
              <a href="tel:+918739000333" style={{ color: '#EA580C', fontWeight: 700, textDecoration: 'none' }}>
                +91 8739000333
              </a>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              component="a"
              href="tel:+918739000333"
              variant="contained"
              size="small"
              startIcon={<PhoneCall size={14} />}
              sx={{ bgcolor: '#0F172A', color: '#FFF', fontWeight: 700, borderRadius: 2, py: 1 }}
            >
              सीधी कॉल: 8739000333
            </Button>
            <Button
              variant="outlined"
              onClick={() => setCategoryModal(true)}
              startIcon={<PlusCircle size={15} />}
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600, borderRadius: 2, py: 0.9 }}
            >
              + नई कार्य श्रेणी जोड़ें
            </Button>
          </Box>
        </Box>

        {/* 5 मुख्य प्रदर्शन संकेतक (KPIs) */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                पंजीकृत कारीगर
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#EA580C', my: 0.5 }}>
                {registeredWorkersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
                {workers.filter(w => w.isVerified).length} सत्यापित मिस्त्री
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                समीक्षाधीन सत्यापन
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: totalPendingApprovals > 0 ? '#DC2626' : '#16A34A', my: 0.5 }}>
                {totalPendingApprovals}
              </Typography>
              <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 600 }}>
                {pendingWorkers.length} कारीगर • {pendingSuppliers.length} सप्लायर
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                सक्रिय आवश्यकताएं
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284C7', my: 0.5 }}>
                {requirements.length}
              </Typography>
              <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 600 }}>
                {openRequirementsCount} प्रगति पर / खुली
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                ठेकेदार टीमें
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#8B5CF6', my: 0.5 }}>
                {registeredContractorsCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                85+ जिलों में नेटवर्क
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                सामग्री सप्लायर
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                {registeredSuppliersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
                सक्रिय डिपो एवं यार्ड
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* टैब नेविगेशन */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 3, overflow: 'hidden' }}>
          <Tabs
            value={adminTab}
            onChange={(e, v) => setAdminTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: { xs: '0.84rem', sm: '0.92rem' }, minHeight: 56 },
              '& .Mui-selected': { color: '#EA580C !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#EA580C', height: 3 }
            }}
          >
            <Tab label={`लंबित सत्यापन कतार (${totalPendingApprovals})`} />
            <Tab label={`ग्राहक आवश्यकता प्रबंधन (${requirements.length})`} />
            <Tab label={`सभी पंजीकृत कारीगर (${workers.length})`} />
            <Tab label={`ठेकेदार एवं सप्लायर (${contractors.length + suppliers.length})`} />
            <Tab label="शिकायत एवं विवाद निवारण डेस्क (0)" />
          </Tabs>
        </Paper>

        {/* टैब 0: लंबित सत्यापन कतार */}
        {adminTab === 0 && (
          <Box>
            {totalPendingApprovals === 0 ? (
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF' }}>
                <CheckCircle2 size={44} color="#16A34A" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  सभी प्रोफाइल जांची जा चुकी हैं!
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  वर्तमान में कोई भी कारीगर या सप्लायर प्रोफाइल अनुमोदन हेतु लंबित नहीं है।
                </Typography>
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                {/* लंबित कारीगर */}
                {pendingWorkers.length > 0 && (
                  <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                      समीक्षाधीन कारीगर पंजीकरण ({pendingWorkers.length})
                    </Typography>
                    <TableContainer sx={{ overflowX: 'auto' }}>
                      <Table size="small">
                        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>कारीगर का नाम</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>मुख्य हुनर</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>स्थान</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>अनुभव</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>अपेक्षित मजदूरी</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>स्थिति</TableCell>
                            <TableCell sx={{ fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap' }}>कार्रवाई</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingWorkers.map(w => (
                            <TableRow key={w.id}>
                              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{w.name}</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}><Chip label={w.primarySkill} size="small" sx={{ bgcolor: '#EA580C', color: '#FFF', fontWeight: 600 }} /></TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.city} ({w.locality})</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.experienceYears} वर्ष</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.expectedWage}</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}><Chip label="समीक्षाधीन" size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700 }} /></TableCell>
                              <TableCell sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleApproveWorker(w.id)}
                                  startIcon={<CheckCircle2 size={14} />}
                                  sx={{ bgcolor: '#16A34A', fontWeight: 700, mr: 1, '&:hover': { bgcolor: '#15803D' } }}
                                >
                                  सत्यापित करें
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleRejectWorker(w.id)}
                                  sx={{ color: '#DC2626', borderColor: '#DC2626', fontWeight: 600 }}
                                >
                                  खारिज
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                )}

                {/* लंबित सप्लायर */}
                {pendingSuppliers.length > 0 && (
                  <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                      समीक्षाधीन सप्लायर पंजीकरण ({pendingSuppliers.length})
                    </Typography>
                    <TableContainer sx={{ overflowX: 'auto' }}>
                      <Table size="small">
                        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>व्यापार का नाम</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>संपर्क व्यक्ति</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>शहर</TableCell>
                            <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>श्रेणियाँ</TableCell>
                            <TableCell sx={{ fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap' }}>कार्रवाई</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingSuppliers.map(s => (
                            <TableRow key={s.id}>
                              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{s.businessName}</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{s.contactPerson} ({s.phone})</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{s.location}</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{s.materialCategories.join(', ')}</TableCell>
                              <TableCell sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => updateSupplierStatus(s.id, 'Approved')}
                                  sx={{ bgcolor: '#16A34A', fontWeight: 700, mr: 1 }}
                                >
                                  अनुमोदन दें
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => updateSupplierStatus(s.id, 'Rejected')}
                                  sx={{ color: '#DC2626' }}
                                >
                                  खारिज
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

        {/* टैब 1: ग्राहक आवश्यकता प्रबंधन */}
        {adminTab === 1 && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                सभी ग्राहक आवश्यकताएं ({requirements.length})
              </Typography>
            </Box>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>आईडी</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>ग्राहक</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>प्रकार एवं श्रेणी</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>स्थान</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>बजट</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>स्थिति</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>आवंटित मिस्त्री/ठेकेदार</TableCell>
                    <TableCell sx={{ fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap' }}>प्रबंधन</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{req.id}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{req.customerName} ({req.mobile})</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                          {req.requirementType}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {req.serviceCategory}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{req.city} ({req.locality})</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{req.budget}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
                      <TableCell sx={{ fontSize: '0.8rem', color: '#EA580C', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {req.assignedProvider || 'प्रक्रियाधीन'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenReqModal(req)}
                          sx={{ borderColor: '#EA580C', color: '#EA580C', fontWeight: 700 }}
                        >
                          स्थिति बदलें
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* टैब 2: सभी पंजीकृत कारीगर */}
        {adminTab === 2 && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                पंजीकृत कारीगर डायरेक्टरी ({workers.length})
              </Typography>
            </Box>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>कारीगर आईडी व नाम</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>मुख्य हुनर</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>शहर</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>अनुभव</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>सत्यापन स्थिति</TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>अधिकार नियंत्रण</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workers.map(w => (
                    <TableRow key={w.id}>
                      <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {w.name}
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          आईडी: {w.id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.primarySkill}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.city}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{w.experienceYears} वर्ष</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {w.isVerified ? (
                          <Chip icon={<ShieldCheck size={14} color="#15803D" />} label="सत्यापित" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                        ) : (
                          <Chip label={w.verificationStatus} size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309' }} />
                        )}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Button
                          size="small"
                          onClick={() => updateWorkerStatus(w.id, w.verificationStatus === 'Approved' ? 'Suspended' : 'Approved')}
                          sx={{ color: w.verificationStatus === 'Approved' ? '#DC2626' : '#16A34A', fontSize: '0.78rem', fontWeight: 700 }}
                        >
                          {w.verificationStatus === 'Approved' ? 'निलंबित करें' : 'पुनः सक्रिय'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* टैब 3: ठेकेदार एवं सप्लायर */}
        {adminTab === 3 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
                  पंजीकृत सिविल ठेकेदार ({contractors.length})
                </Typography>
                <List dense disablePadding>
                  {contractors.map(c => (
                    <ListItem key={c.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{c.businessName}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>संपर्क: {c.contactPerson} • {c.city}</Typography>
                      </Box>
                      <Chip label="सत्यापित ठेकेदार" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
                  पंजीकृत सामग्री सप्लायर ({suppliers.length})
                </Typography>
                <List dense disablePadding>
                  {suppliers.map(s => (
                    <ListItem key={s.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{s.businessName}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>स्थान: {s.location} • फोन: {s.phone}</Typography>
                      </Box>
                      <Chip label="सत्यापित डीलर" size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* टैब 4: शिकायत एवं समाधान */}
        {adminTab === 4 && (
          <Paper sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center', borderRadius: 3, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
            <CheckCircle2 size={44} color="#16A34A" style={{ marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
              शून्य खुली विवाद शिकायतें
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 480, mx: 'auto', mt: 1 }}>
              ग्राहक और सेवा प्रदाता संपर्क डेस्क के माध्यम से संवाद करते हैं। वर्तमान में कोई भी लंबित शिकायत दर्ज नहीं है।
            </Typography>
          </Paper>
        )}

        {/* डायलॉग: आवश्यकता स्थिति अपडेट करें */}
        <Dialog open={Boolean(editingReq)} onClose={() => setEditingReq(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
            आवश्यकता स्थिति अपडेट करें (आईडी: {editingReq?.id})
          </DialogTitle>
          <DialogContent dividers>
            {editingReq && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  ग्राहक: <strong>{editingReq.customerName}</strong> • {editingReq.city}
                </Typography>
                <TextField
                  select
                  label="कार्य प्रवाह स्थिति"
                  fullWidth
                  size="small"
                  value={reqStatus}
                  onChange={(e) => setReqStatus(e.target.value)}
                >
                  <MenuItem value="New">नई आवश्यकता</MenuItem>
                  <MenuItem value="Under Review">समीक्षाधीन</MenuItem>
                  <MenuItem value="Assigned">मिस्त्री आवंटित</MenuItem>
                  <MenuItem value="Provider Contacted">प्रदाता से संपर्क हुआ</MenuItem>
                  <MenuItem value="Quotation Received">कोटेशन प्राप्त हुआ</MenuItem>
                  <MenuItem value="Confirmed">पुष्टि हो चुकी</MenuItem>
                  <MenuItem value="In Progress">कार्य प्रगति पर</MenuItem>
                  <MenuItem value="Completed">सफलतापूर्वक पूर्ण</MenuItem>
                </TextField>
                <TextField
                  label="आवंटित कारीगर या ठेकेदार का नाम"
                  fullWidth
                  size="small"
                  value={assignedProvider}
                  onChange={(e) => setAssignedProvider(e.target.value)}
                  placeholder="उदा. रामेश्वर यादव (राज मिस्त्री) अथवा शर्मा सिविल वर्क्स"
                />
                <TextField
                  label="आंतरिक एडमिन नोट्स"
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="साइट निरीक्षण या कोटेशन बातचीत से संबंधित विवरण।"
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setEditingReq(null)} sx={{ color: '#64748B' }}>रद्द करें</Button>
            <Button onClick={handleSaveReqStatus} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700, '&:hover': { bgcolor: '#C2410C' } }}>
              अपडेट सुरक्षित करें
            </Button>
          </DialogActions>
        </Dialog>

        {/* डायलॉग: नई श्रेणी जोड़ें */}
        <Dialog open={categoryModal} onClose={() => setCategoryModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>नई कार्य / व्यापार श्रेणी जोड़ें</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="नई व्यापार / हुनर श्रेणी का नाम"
              fullWidth
              size="small"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="उदा. फॉल्स सीलिंग एवं जिप्सम बोर्ड"
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCategoryModal(false)} sx={{ color: '#64748B' }}>रद्द करें</Button>
            <Button onClick={handleAddCategory} variant="contained" sx={{ bgcolor: '#EA580C', fontWeight: 700 }}>
              श्रेणी जोड़ें
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};
