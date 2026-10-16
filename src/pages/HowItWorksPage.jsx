import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Button, Divider, Alert } from '@mui/material';
import {
  Search,
  FileText,
  MessageSquare,
  ShieldCheck,
  HardHat,
  Truck,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* शीर्षक */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="मार्केटप्लेस गाइड" sx={{ bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', fontWeight: 700, mb: 1.5 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            कामसेतु भारत में निर्माण को कैसे जोड़ता है
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            एक पारदर्शी, बिचौलिया-मुक्त प्लेटफार्म, विशेष रूप से घर मालिकों, कुशल मिस्त्रियों, निर्माण ठेकेदारों और सामग्री डीलरों के लिए बनाया गया।
          </Typography>
        </Box>

        {/* अनुभाग 1: घर मालिकों और ग्राहकों के लिए */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                घर मालिकों, बिल्डरों एवं संपत्ति मालिकों के लिए
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                भरोसेमंद मिस्त्री, ठेकेदार और निर्माण सामग्री कैसे खोजें
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. व्यापार चुनें या जरूरत पोस्ट करें', desc: 'राज मिस्त्री, इलेक्ट्रिशियन, पेंटर, प्लंबर की वर्गीकृत डायरेक्टरी ब्राउज़ करें या टर्नकी घर निर्माण की जरूरत सबमिट करें।' },
              { num: '2', title: '2. प्रोफाइल और सत्यापन की समीक्षा करें', desc: 'अनुभव वर्ष, ग्राहक समीक्षा ट्रैक रिकॉर्ड, कार्य त्रिज्या और एडमिन सत्यापन बैज का निरीक्षण करें।' },
              { num: '3', title: '3. कोटेशन प्राप्त करें और तुलना करें', desc: 'सत्यापित प्रदाता प्रतिस्पर्धी दैनिक मजदूरी या अनुबंध अनुमान और साइट विज़िट शेड्यूल के साथ जवाब देते हैं।' },
              { num: '4', title: '4. शर्तों पर सीधे समझौता', desc: 'माप, सामग्री और भुगतान माइलस्टोन सीधे प्रदाता के साथ तय करें, बिना किसी तृतीय-पक्ष कमीशन कटौती के।' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* अनुभाग 2: कारीगरों के लिए */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardHat size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                कुशल कारीगरों एवं मिस्त्रियों के लिए
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                नियमित काम के अवसर पाएँ और ग्राहकों से जुड़ें
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. अपनी प्रोफाइल रजिस्टर करें', desc: 'अपना व्यापार कौशल, अनुभव के वर्ष, दैनिक मजदूरी या अनुबंध प्राथमिकताएँ और पसंदीदा कार्य त्रिज्या सबमिट करें।' },
              { num: '2', title: '2. एडमिन प्रोफाइल समीक्षा', desc: 'हमारी संचालन टीम आपके प्रमाण-पत्रों की समीक्षा करती है। सत्यापित कारीगरों को आधिकारिक कामसेतु सत्यापित बैज प्राप्त होता है।' },
              { num: '3', title: '3. स्थानीय जॉब अलर्ट प्राप्त करें', desc: 'जब आपके शहर के ग्राहक या ठेकेदार मिलती-जुलती आवश्यकताएँ पोस्ट करते हैं, तो SMS और पोर्टल के माध्यम से सूचित किया जाएगा।' },
              { num: '4', title: '4. सीधा भुगतान एवं पूर्ण मजदूरी', desc: 'अपनी सहमत मजदूरी का 100% सीधे ग्राहक से प्राप्त करें। शून्य बिचौलिया कटौती या कमीशन।' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* अनुभाग 3: सामग्री सप्लायरों के लिए */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 5, border: '1px solid #E2E8F0', bgcolor: '#FFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#EFF6FF', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                निर्माण सामग्री डीलरशिप एवं सप्लायरों के लिए
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                सीमेंट, स्टील, ईंट, रेत और टाइल्स सीधे सक्रिय साइटों पर सप्लाई करें
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {[
              { num: '1', title: '1. अपनी डीलरशिप ऑनबोर्ड करें', desc: 'अपना व्यवसाय नाम, गोदाम स्थान, डिलीवरी त्रिज्या और सामग्री श्रेणियाँ पंजीकृत करें।' },
              { num: '2', title: '2. कैटलॉग और MOQ प्रकाशित करें', desc: 'सीमेंट ब्रांड, TMT सरिया साइज़, रेत, ईंट और न्यूनतम डिलीवरी मात्रा प्रकाशित करें।' },
              { num: '3', title: '3. साइट पूछताछ प्राप्त करें', desc: 'बिल्डर, ठेकेदार और व्यक्ति तत्काल डिस्पैच के लिए खरीद पूछताछ सबमिट करते हैं।' },
              { num: '4', title: '4. डिलीवर करें और टर्नओवर बढ़ाएँ', desc: 'दैनिक मंडी दरों का कोटेशन दें, ट्रकलोड डिस्पैच करें और दीर्घकालिक रिपीट क्लाइंट संबंध बनाएँ।' }
            ].map(step => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #F1F5F9', height: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#EA580C', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* अस्वीकरण */}
        <Alert severity="warning" icon={<AlertCircle size={20} />} sx={{ borderRadius: 3 }}>
          <strong>प्लेटफार्म भूमिका अस्वीकरण:</strong> कामसेतु केवल एक खोज और मैचिंग इकोसिस्टम के रूप में कार्य करता है। अंतिम मजदूरी शर्तें, कार्य सीमाएँ, सामग्री डिलीवरी लॉजिस्टिक्स और सुरक्षा प्रोटोकॉल पक्षों के बीच आपसी सहमति से तय होने चाहिए।
        </Alert>

      </Container>
    </Box>
  );
};
