import React from 'react';
import { Box, Container, Typography, Paper, Divider, Alert } from '@mui/material';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: '#FFF', border: '1px solid #E2E8F0' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <FileText size={28} color="#EA580C" />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
              नियम एवं शर्तें
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
            अंतिम अपडेट: अक्टूबर 2026 • कामसेतु मार्केटप्लेस उपयोग की शर्तें
          </Typography>

          <Alert severity="warning" sx={{ mb: 4, borderRadius: 2.5 }}>
            <strong>महत्वपूर्ण संचालन सूचना:</strong> कामसेतु एक प्रौद्योगिकी संचार पुल है जो कुशल कारीगरों, ठेकेदारों, सामग्री सप्लायरों और ग्राहकों को जोड़ता है। कामसेतु नियोक्ता, जनरल ठेकेदार या निर्माण सामग्री गोदाम नहीं है।
          </Alert>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            1. मार्केटप्लेस की प्रकृति
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            कामसेतु संपत्ति मालिकों (ग्राहकों) और स्वतंत्र व्यापार सेवा प्रदाताओं (राज मिस्त्री, बढ़ई, इलेक्ट्रिशियन, प्लंबर, ठेकेदार और निर्माण सामग्री सप्लायर) के बीच परिचय, कोटेशन आदान-प्रदान और पोर्टफोलियो प्रदर्शन की सुविधा प्रदान करता है। सभी अंतिम अनुबंध, कार्य आदेश, भुगतान अनुसूचियाँ और प्रदर्शन मानक पूरी तरह संबंधित पक्षों के बीच तय किए जाते हैं।
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            2. कारीगर एवं प्रदाता की स्थिति
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            प्लेटफार्म पर सूचीबद्ध कुशल कारीगर और ठेकेदार स्वतंत्र पेशेवर या व्यावसायिक संस्थाएँ हैं और कामसेतु के कर्मचारी, एजेंट या संयुक्त उद्यम भागीदार नहीं हैं। हालांकि कामसेतु सत्यापन बैज जारी करने से पहले पहचान और संदर्भों का सत्यापन करता है, ग्राहकों को भौतिक प्रमाण-पत्रों और पिछले साइट कार्यों का निरीक्षण करने की सलाह दी जाती है।
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            3. मूल्य निर्धारण, मंडी दरें एवं सामग्री डिलीवरी
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
            निर्माण सामग्री (जैसे सीमेंट, TMT सरिया, रेत और गिट्टी) के लिए सूचीबद्ध कीमतें सांकेतिक हैं या लाइव मंडी कोटेशन के अधीन हैं। अंतिम डिलीवरी मूल्य, अनलोडिंग शुल्क और वाहन पहुँच शर्तें सीधे अधिकृत सप्लायर डीलरशिप द्वारा निर्धारित की जाती हैं।
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            4. दायित्व की सीमा
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
            कामसेतु व्यक्तिगत निर्माण स्थलों पर होने वाले किसी भी संरचनात्मक दोष, कार्य विलंब, साइट दुर्घटना या अनुबंध विवाद के लिए उत्तरदायी नहीं होगा। उपयोगकर्ता विवादों को सौहार्दपूर्ण ढंग से या प्रासंगिक सिविल उपायों के माध्यम से हल करने के लिए सहमत हैं।
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};
