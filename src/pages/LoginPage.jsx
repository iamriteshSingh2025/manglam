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
      title: 'ग्राहक / घर मालिक',
      name: 'विवेक सिंघानिया',
      city: 'लखनऊ',
      tagline: '1,500 वर्ग फीट प्लॉट पर ग्राउंड+1 डुप्लेक्स मकान का नया निर्माण',
      icon: User,
      color: '#3B82F6',
      dashboardPath: '/dashboard/customer',
      features: ['नई निर्माण आवश्यकता पोस्ट करें', 'कोटेशन प्रस्तावों को ट्रैक करें', 'पसंदीदा कारीगरों की सूची', 'सीधे सामग्री ऑर्डर करें']
    },
    {
      role: 'worker',
      title: 'कुशल कारीगर (राज मिस्त्री)',
      name: 'रामेश्वर "रमेश" यादव',
      city: 'लखनऊ',
      tagline: 'सीनियर राज मिस्त्री (14 वर्ष अनुभव) • चिनाई व आरसीसी विशेषज्ञ',
      icon: HardHat,
      color: '#EA580C',
      dashboardPath: '/dashboard/worker',
      features: ['क्षेत्र के नए प्रोजेक्ट कॉल्स प्राप्त करें', 'सीधे ग्राहक से बातचीत व दर तय करें', 'उपलब्धता स्थिति (तुरंत उपलब्ध / व्यस्त) बदलें', 'दैनिक मजदूरी दरें प्रबंधित करें']
    },
    {
      role: 'contractor',
      title: 'सिविल ठेकेदार / टीम',
      name: 'शर्मा कंस्ट्रक्शंस एंड सिविल वर्क्स',
      city: 'लखनऊ एवं पूर्वांचल',
      tagline: '35 कुशल कारीगरों और मिक्सर मशीनों का सुसज्जित दल',
      icon: Building2,
      color: '#8B5CF6',
      dashboardPath: '/dashboard/contractor',
      features: ['सक्रिय टर्नकी निर्माण साइट्स प्रबंधित करें', 'थोक लेबर भर्ती आवश्यकता पोस्ट करें', 'मिस्त्री आवेदनों की समीक्षा करें', 'कमर्शियल प्रोजेक्ट टेंडर्स']
    },
    {
      role: 'supplier',
      title: 'निर्माण सामग्री सप्लायर',
      name: 'अल्ट्राबिल्ड सीमेंट एंड एग्रीगेट्स',
      city: 'ट्रांसपोर्ट नगर, लखनऊ',
      tagline: 'अधिकृत अल्ट्राटेक सीमेंट एवं गिट्टी-मौरंग स्टॉकिस्ट',
      icon: Truck,
      color: '#0284C7',
      dashboardPath: '/dashboard/supplier',
      features: ['दैनिक मंडी दरें अपडेट करें', 'थोक साइट डिलीवरी ऑर्डर प्राप्त करें', 'डंपर / ट्रक डिलीवरी दायरा प्रबंधित करें', 'सीधा भुगतान व डिलीवरी समन्वय']
    },
    {
      role: 'admin',
      title: 'प्लेटफॉर्म एडमिन पोर्टल',
      name: 'अभिषेक मिश्रा (राका भैया)',
      city: 'केंद्रीय संचालन कार्यालय',
      tagline: 'प्लेटफॉर्म मुख्य संस्थापक (+91 8739000333) • संपूर्ण सत्यापन व निगरानी',
      icon: ShieldAlert,
      color: '#DC2626',
      dashboardPath: '/dashboard/admin',
      features: ['नए कारीगर व सप्लायर आवेदनों का भौतिक सत्यापन', 'सत्यापन बैज (Approved Badge) जारी करें', 'ग्राहकों की आवश्यकताओं का उचित मिलान', 'प्लेटफॉर्म संचालन एवं सुरक्षा नियंत्रण']
    }
  ];

  const handleSelectPersona = (p) => {
    setCurrentRole(p.role);
    showNotification(`भूमिका बदली गई: ${p.title} (${p.name})`, 'success');
    navigate(p.dashboardPath);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Chip
            icon={<Sparkles size={14} color="#EA580C" />}
            label="1-क्लिक टेस्ट भूमिका चयन (Interactive Role Switcher)"
            sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 800, mb: 1.5, fontSize: '0.8rem' }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, fontSize: { xs: '1.6rem', sm: '2.1rem', md: '2.6rem' } }}>
            उपयोगकर्ता भूमिका एवं डैशबोर्ड चुनें
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', fontSize: { xs: '0.92rem', sm: '1.02rem' } }}>
            मंगलम विश्वकर्मा (राका भैया) मंच को किसी भी उपयोगकर्ता के दृष्टिकोण से अनुभव करें। घर मालिक, राज मिस्त्री, ठेकेदार, सप्लायर और एडमिन में 1 क्लिक में स्विच करें।
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
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
                    borderRadius: 4,
                    border: isCurrent ? '2.5px solid #EA580C' : '1px solid #E2E8F0',
                    bgcolor: '#FFFFFF',
                    p: { xs: 2, sm: 2.5 },
                    position: 'relative',
                    boxShadow: isCurrent ? '0 8px 24px rgba(234, 88, 12, 0.15)' : '0 4px 16px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  {isCurrent && (
                    <Chip
                      label="सक्रिय दृश्य"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        bgcolor: '#EA580C',
                        color: '#FFF',
                        fontWeight: 800,
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
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        {p.name} • {p.city}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#475569', mb: 2, fontStyle: 'italic', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    "{p.tagline}"
                  </Typography>

                  <Box sx={{ bgcolor: '#F8FAFC', p: 1.75, borderRadius: 2.5, mb: 3, flex: 1, border: '1px solid #F1F5F9' }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block', mb: 1 }}>
                      उपलब्ध सुविधाएँ:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                      {p.features.map((feat, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, fontSize: '0.8rem', color: '#475569' }}>
                          <CheckCircle2 size={14} color="#16A34A" style={{ marginTop: 2, flexShrink: 0 }} />
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
                      fontWeight: 800,
                      py: 1.15,
                      borderRadius: 2,
                      fontSize: '0.88rem',
                      '&:hover': {
                        bgcolor: isCurrent ? '#C2410C' : '#F1F5F9',
                        borderColor: '#0F172A'
                      }
                    }}
                  >
                    {isCurrent ? 'वर्तमान डैशबोर्ड खोलें' : `${p.title} में स्विच करें`}
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
