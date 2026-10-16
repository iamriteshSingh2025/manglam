import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Chip,
  Select,
  FormControl
} from '@mui/material';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  HardHat,
  Hammer,
  Truck,
  Building,
  PlusCircle,
  User,
  Shield,
  Layers,
  PhoneCall,
  MapPin,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_CITIES } from '../../data/mockData';
import { DemoBanner } from '../common/DemoBanner';

export const Header = ({ onOpenPostModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setCurrentRole, activeCity, setActiveCity } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleAnchorEl, setRoleAnchorEl] = useState(null);

  const navLinks = [
    { label: 'होम', path: '/' },
    { label: 'कारीगर खोजें', path: '/workers' },
    { label: 'निर्माण सेवाएँ', path: '/services' },
    { label: 'निर्माण सामग्री', path: '/materials' },
    { label: 'कारीगरों के लिए', path: '/register-worker' },
    { label: 'सप्लायर के लिए', path: '/register-supplier' },
    { label: 'कैसे काम करता है', path: '/how-it-works' },
    { label: 'संपर्क करें', path: '/contact' },
  ];

  const handleCityChange = (e) => {
    setActiveCity(e.target.value);
  };

  const handleRoleMenuOpen = (e) => {
    setRoleAnchorEl(e.currentTarget);
  };

  const handleRoleSelect = (role) => {
    setCurrentRole(role);
    setRoleAnchorEl(null);
    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'customer') navigate('/dashboard/customer');
    else if (role === 'worker') navigate('/dashboard/worker');
    else if (role === 'contractor') navigate('/dashboard/contractor');
    else if (role === 'supplier') navigate('/dashboard/supplier');
  };

  const getDashboardPath = () => {
    if (currentRole === 'admin') return '/dashboard/admin';
    if (currentRole === 'worker') return '/dashboard/worker';
    if (currentRole === 'contractor') return '/dashboard/contractor';
    if (currentRole === 'supplier') return '/dashboard/supplier';
    return '/dashboard/customer';
  };

  const roleNameHindi = {
    visitor: 'आगंतुक',
    customer: 'ग्राहक',
    worker: 'कारीगर',
    contractor: 'ठेकेदार',
    supplier: 'सप्लायर',
    admin: 'एडमिन',
  };

  return (
    <>
      <DemoBanner />
      <AppBar position="sticky" sx={{ bgcolor: '#0F172A', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 1100 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 74 }, display: 'flex', justifyContent: 'space-between' }}>
            
            {/* लोगो और टैगलाइन */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                textDecoration: 'none',
                mr: 2,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
                }}
              >
                <HardHat size={26} color="#FFFFFF" strokeWidth={2.2} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  काम<span style={{ color: '#EA580C' }}>सेतु</span>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#94A3B8',
                    fontSize: '0.68rem',
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  काम करने वालों को काम, हर घर को विश्वास
                </Typography>
              </Box>
            </Box>

            {/* शहर चुनें (Desktop) */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', mr: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.06)', borderRadius: 2, px: 1.25, py: 0.4, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <MapPin size={16} color="#EA580C" style={{ marginRight: 6 }} />
                <Select
                  value={activeCity}
                  onChange={handleCityChange}
                  variant="standard"
                  disableUnderline
                  sx={{
                    color: '#F8FAFC',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    '& .MuiSvgIcon-root': { color: '#94A3B8' },
                  }}
                >
                  <MenuItem value="All Cities">सभी शहर (अखिल भारत)</MenuItem>
                  {POPULAR_CITIES.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Desktop नेविगेशन लिंक */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Button
                    key={link.label}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: isActive ? '#EA580C' : '#E2E8F0',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.86rem',
                      px: 1.2,
                      py: 0.8,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      position: 'relative',
                      '&:hover': {
                        color: '#EA580C',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                      ...(isActive && {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 2,
                          left: '20%',
                          right: '20%',
                          height: 2.5,
                          borderRadius: 2,
                          bgcolor: '#EA580C',
                        }
                      })
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>

            {/* दायें तरफ के बटन */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              {/* संस्थापक हेल्पलाइन */}
              <Button
                component="a"
                href="tel:+918739000333"
                variant="outlined"
                size="small"
                startIcon={<PhoneCall size={14} color="#EA580C" />}
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  color: '#FFFFFF',
                  borderColor: 'rgba(234, 88, 12, 0.4)',
                  bgcolor: 'rgba(234, 88, 12, 0.08)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  py: 0.6,
                  px: 1.2,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#EA580C',
                    bgcolor: 'rgba(234, 88, 12, 0.2)',
                  }
                }}
              >
                मालिक / राका मिश्रा जी: 8739000333
              </Button>

              {/* भूमिका बदलें बटन */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleRoleMenuOpen}
                endIcon={<ChevronDown size={14} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: '#CBD5E1',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  py: 0.6,
                  px: 1.2,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#EA580C',
                    bgcolor: 'rgba(234, 88, 12, 0.08)',
                    color: '#FFF'
                  }
                }}
              >
                {currentRole === 'visitor' ? 'भूमिका: आगंतुक' : `भूमिका: ${roleNameHindi[currentRole] || currentRole.toUpperCase()}`}
              </Button>

              <Menu
                anchorEl={roleAnchorEl}
                open={Boolean(roleAnchorEl)}
                onClose={() => setRoleAnchorEl(null)}
                PaperProps={{
                  sx: {
                    bgcolor: '#0F172A',
                    color: '#FFF',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    minWidth: 200,
                    mt: 1
                  }
                }}
              >
                <MenuItem onClick={() => handleRoleSelect('visitor')} selected={currentRole === 'visitor'}>
                  आम आगंतुक (Visitor)
                </MenuItem>
                <MenuItem onClick={() => handleRoleSelect('customer')} selected={currentRole === 'customer'}>
                  ग्राहक / घर मालिक
                </MenuItem>
                <MenuItem onClick={() => handleRoleSelect('worker')} selected={currentRole === 'worker'}>
                  कुशल कारीगर (राज मिस्त्री)
                </MenuItem>
                <MenuItem onClick={() => handleRoleSelect('contractor')} selected={currentRole === 'contractor'}>
                  ठेकेदार / टीम
                </MenuItem>
                <MenuItem onClick={() => handleRoleSelect('supplier')} selected={currentRole === 'supplier'}>
                  निर्माण सामग्री सप्लायर
                </MenuItem>
                <MenuItem onClick={() => handleRoleSelect('admin')} selected={currentRole === 'admin'} sx={{ color: '#FB923C', fontWeight: 600 }}>
                  प्लेटफार्म एडमिन डैशबोर्ड
                </MenuItem>
              </Menu>

              {/* डैशबोर्ड लिंक */}
              {currentRole !== 'visitor' ? (
                <Button
                  component={Link}
                  to={getDashboardPath()}
                  startIcon={<LayoutDashboard size={16} />}
                  sx={{
                    bgcolor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 0.7,
                    px: 1.5,
                    display: { xs: 'none', md: 'inline-flex' },
                    '&:hover': {
                      bgcolor: 'rgba(56, 189, 248, 0.25)',
                    }
                  }}
                >
                  मेरा डैशबोर्ड
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#E2E8F0',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    display: { xs: 'none', sm: 'inline-flex' },
                    '&:hover': { color: '#EA580C' }
                  }}
                >
                  लॉगिन / जुड़ें
                </Button>
              )}

              {/* मुख्य CTA: जरूरत पोस्ट करें */}
              <Button
                variant="contained"
                onClick={onOpenPostModal || (() => navigate('/post-requirement'))}
                startIcon={<PlusCircle size={18} />}
                sx={{
                  bgcolor: '#EA580C',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: { xs: '0.78rem', sm: '0.85rem' },
                  textTransform: 'none',
                  borderRadius: 2.2,
                  px: { xs: 1.5, sm: 2.2 },
                  py: 0.9,
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: '#C2410C',
                    boxShadow: '0 6px 18px rgba(234, 88, 12, 0.6)',
                  }
                }}
              >
                जरूरत पोस्ट करें
              </Button>

              {/* मोबाइल मेनू बटन */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  p: 1
                }}
              >
                <MenuIcon size={22} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* मोबाइल नेविगेशन ड्रॉअर */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '85%',
            maxWidth: 340,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            p: 2,
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardHat size={20} color="#FFFFFF" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
              काम<span style={{ color: '#EA580C' }}>सेतु</span>
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#94A3B8' }}>
            <CloseIcon size={22} />
          </IconButton>
        </Box>

        {/* मालिक की जानकारी */}
        <Box sx={{ mb: 2, p: 1.5, bgcolor: 'rgba(234, 88, 12, 0.15)', borderRadius: 2, border: '1px solid rgba(234, 88, 12, 0.4)' }}>
          <Typography variant="caption" sx={{ color: '#FED7AA', fontWeight: 700, display: 'block' }}>
            मुख्य मालिक / संस्थापक:
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 800 }}>
            अभिषेक मिश्रा (राका मिश्रा जी)
          </Typography>
          <Button
            component="a"
            href="tel:+918739000333"
            size="small"
            variant="contained"
            fullWidth
            startIcon={<PhoneCall size={14} />}
            sx={{ mt: 1, bgcolor: '#EA580C', color: '#FFF', fontWeight: 700, py: 0.6, fontSize: '0.78rem' }}
          >
            कॉल करें: +91 8739000333
          </Button>
        </Box>

        {/* मोबाइल शहर चुनें */}
        <Box sx={{ mb: 2, p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5 }}>
            चुना हुआ शहर:
          </Typography>
          <Select
            value={activeCity}
            onChange={handleCityChange}
            fullWidth
            size="small"
            sx={{
              color: '#FFF',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 1.5,
              '& .MuiSvgIcon-root': { color: '#EA580C' }
            }}
          >
            <MenuItem value="All Cities">सभी शहर (अखिल भारत)</MenuItem>
            {POPULAR_CITIES.map(city => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* मोबाइल भूमिका बदलें */}
        <Box sx={{ mb: 3, p: 1.5, bgcolor: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: '#FB923C', fontWeight: 600, display: 'block', mb: 0.5 }}>
            भूमिका बदलें:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {['visitor', 'customer', 'worker', 'contractor', 'supplier', 'admin'].map(r => (
              <Chip
                key={r}
                label={roleNameHindi[r]?.toUpperCase() || r.toUpperCase()}
                onClick={() => {
                  handleRoleSelect(r);
                  setMobileOpen(false);
                }}
                size="small"
                sx={{
                  bgcolor: currentRole === r ? '#EA580C' : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFF',
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* लिंक */}
        <List sx={{ py: 0 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  bgcolor: location.pathname === link.path ? 'rgba(234, 88, 12, 0.15)' : 'transparent',
                  color: location.pathname === link.path ? '#EA580C' : '#E2E8F0',
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setMobileOpen(false);
              if (onOpenPostModal) onOpenPostModal();
              else navigate('/post-requirement');
            }}
            startIcon={<PlusCircle size={18} />}
            sx={{
              bgcolor: '#EA580C',
              color: '#FFF',
              fontWeight: 700,
              py: 1.2,
              borderRadius: 2,
              '&:hover': { bgcolor: '#C2410C' }
            }}
          >
            जरूरत पोस्ट करें
          </Button>

          <Button
            component={Link}
            to="/login"
            fullWidth
            onClick={() => setMobileOpen(false)}
            sx={{
              color: '#CBD5E1',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600
            }}
          >
            लॉगिन एवं डैशबोर्ड
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
