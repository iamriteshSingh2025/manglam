import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Snackbar, Alert } from '@mui/material';
import { theme } from './theme/theme';
import { AppProvider, useApp } from './context/AppContext';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

// Modals
import { RequirementModal } from './components/common/RequirementModal';
import { QuotationModal } from './components/common/QuotationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { FindWorkersPage } from './pages/FindWorkersPage';
import { WorkerDetailsPage } from './pages/WorkerDetailsPage';
import { ConstructionServicesPage } from './pages/ConstructionServicesPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { BuildingMaterialsPage } from './pages/BuildingMaterialsPage';
import { MaterialDetailsPage } from './pages/MaterialDetailsPage';
import { PostRequirementPage } from './pages/PostRequirementPage';
import { WorkerRegistrationPage } from './pages/WorkerRegistrationPage';
import { ContractorRegistrationPage } from './pages/ContractorRegistrationPage';
import { SupplierRegistrationPage } from './pages/SupplierRegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { ContractorDashboard } from './pages/ContractorDashboard';
import { SupplierDashboard } from './pages/SupplierDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TrustSafetyPage } from './pages/TrustSafetyPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Scroll to top component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const { toast, closeToast } = useApp();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [quoteModalState, setQuoteModalState] = useState({
    open: false,
    item: null,
    type: 'worker'
  });

  const handleOpenQuoteModal = ({ item, type }) => {
    setQuoteModalState({
      open: true,
      item,
      type: type || 'worker'
    });
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalState(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <ScrollToTop />
      
      {/* Top Header */}
      <Header onOpenPostModal={() => setPostModalOpen(true)} />

      {/* Main Page Content */}
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenPostModal={() => setPostModalOpen(true)}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            }
          />
          <Route
            path="/workers"
            element={<FindWorkersPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route
            path="/workers/:id"
            element={<WorkerDetailsPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route
            path="/services"
            element={<ConstructionServicesPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route
            path="/services/:id"
            element={<ServiceDetailsPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route
            path="/materials"
            element={<BuildingMaterialsPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route
            path="/materials/:id"
            element={<MaterialDetailsPage onOpenQuoteModal={handleOpenQuoteModal} />}
          />
          <Route path="/post-requirement" element={<PostRequirementPage />} />
          <Route path="/register-worker" element={<WorkerRegistrationPage />} />
          <Route path="/register-contractor" element={<ContractorRegistrationPage />} />
          <Route path="/register-supplier" element={<SupplierRegistrationPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          
          {/* Dashboards */}
          <Route
            path="/dashboard/customer"
            element={<CustomerDashboard onOpenPostModal={() => setPostModalOpen(true)} />}
          />
          <Route path="/dashboard/worker" element={<WorkerDashboard />} />
          <Route path="/dashboard/contractor" element={<ContractorDashboard />} />
          <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Info & Legal */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/trust-safety" element={<TrustSafetyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav onOpenPostModal={() => setPostModalOpen(true)} />

      {/* Global Requirement Posting Modal */}
      <RequirementModal
        open={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />

      {/* Global Quotation Request Modal */}
      <QuotationModal
        open={quoteModalState.open}
        targetItem={quoteModalState.item}
        type={quoteModalState.type}
        onClose={handleCloseQuoteModal}
      />

      {/* Global Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4500}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <MainLayout />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}
