import React from 'react';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <ShieldCheck size={28} color="#EA580C" />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              गोपनीयता एवं डेटा नीति
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
            अंतिम अपडेट: अक्टूबर 2026 • कामसेतु गोपनीयता शासन
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            1. सूचना संग्रह एवं उपयोग
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            हम केवल निर्माण और व्यापार मैचिंग की सुविधा के लिए आवश्यक जानकारी एकत्र करते हैं — जैसे आपका संपर्क नाम, टेलीफोन नंबर, शहर, इलाका और प्रोजेक्ट स्कोप विवरण। हम आपके व्यक्तिगत संपर्क नंबरों को असत्यापित तृतीय-पक्ष टेलीमार्केटर्स को नहीं बेचते।
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            2. कारीगर डेटा सुरक्षा
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            वैकल्पिक सत्यापन जाँच के दौरान एकत्र किए गए कारीगरों के संवेदनशील व्यक्तिगत दस्तावेज़ प्रतिबंधित एडमिन एक्सेस वातावरण में एन्क्रिप्टेड रखे जाते हैं। सार्वजनिक कारीगर प्रोफाइल केवल व्यावहारिक अनुभव, कौशल बैज और संपर्क रूटिंग नंबर प्रदर्शित करते हैं।
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            3. संचार एवं सहमति
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
            निर्माण की आवश्यकता सबमिट करके या प्रदाता के रूप में पंजीकरण करके, आप अपनी सक्रिय प्रोजेक्ट पूछताछ के संबंध में सीधे टेलीफोन कॉल, SMS अलर्ट और कोटेशन अपडेट प्राप्त करने की सहमति देते हैं।
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};
