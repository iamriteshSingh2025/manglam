import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Divider, Alert } from '@mui/material';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileCheck,
  Scale,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrustSafetyPage = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        
        {/* हेडर */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<ShieldCheck size={16} color="#15803D" />}
            label="ईमानदारी एवं सुरक्षा"
            sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700, mb: 1.5 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            विश्वास, सत्यापन एवं सुरक्षा नीति
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
            भारतीय निर्माण और कुशल व्यापार क्षेत्र में पारदर्शिता और विश्वास का निर्माण।
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  "सत्यापित बैज" नीति
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 2 }}>
                कामसेतु में <strong>सत्यापित बैज</strong> कभी भी स्वचालित रूप से नहीं दिया जाता। जब कोई कारीगर, ठेकेदार या सप्लायर पंजीकरण फॉर्म सबमिट करता है, तो उनकी स्थिति डिफ़ॉल्ट रूप से <strong>"समीक्षाधीन"</strong> होती है।
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                हमारी संचालन टीम सत्यापित चिह्न प्रदान करने से पहले व्यावहारिक अनुभव, पिछले कार्य फ़ोटो और टेलीफोन प्रमाण-पत्रों का सत्यापन करती है। हम नकली समीक्षा निर्माण और स्वचालित बैज जारी करने की सख्ती से मनाही करते हैं।
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFF', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={22} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  पारदर्शी मूल्य निर्धारण एवं मजदूरी नैतिकता
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 2 }}>
                हम मिस्त्रियों और मजदूरों के लिए उचित दैनिक मजदूरी में विश्वास करते हैं। कामसेतु घर मालिकों द्वारा कारीगरों को दी जाने वाली दैनिक मजदूरी से <strong>शून्य कटौती</strong> लेता है।
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                निर्माण या रिनोवेशन शुरू करने से पहले, मध्य-प्रोजेक्ट गलतफहमियों को रोकने के लिए हमेशा लिखित माप स्कोप, कच्चे माल की जिम्मेदारियों और भुगतान माइलस्टोन पर सहमत हों।
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* सुरक्षा दिशानिर्देश चेकलिस्ट */}
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, border: '1px solid #E2E8F0', bgcolor: '#FFF', mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 3 }}>
            ग्राहकों एवं ठेकेदारों के लिए सुरक्षा सर्वोत्तम प्रथाएँ
          </Typography>

          <Grid container spacing={2}>
            {[
              { title: 'माइलस्टोन भुगतान से पहले साइट निरीक्षण', desc: 'अंतिम मजदूरी भुगतान जारी करने से पहले संरचनात्मक ईंटों का काम, प्लंबिंग जोड़ और कॉलम संरेखण का निरीक्षण करें।' },
              { title: 'डिलीवरी पर निर्माण सामग्री की जाँच', desc: 'TMT सरिया पर ISI चिह्न सत्यापित करें, सीमेंट बैग पैकेजिंग तिथियाँ (निर्माण से 90 दिन से कम) जाँचें और गिट्टी की सफाई का निरीक्षण करें।' },
              { title: 'व्यक्तिगत सुरक्षा उपकरण (PPE)', desc: 'सुनिश्चित करें कि शटरिंग बढ़ई, सरिया बाँधने वाले और मिस्त्री सक्रिय ऊँची मंजिल की छतों पर सुरक्षा हेलमेट, दस्ताने और जूते पहनें।' },
              { title: 'विवाद रिपोर्टिंग तंत्र', desc: 'यदि कोई प्रदाता काम पर नहीं आता या असंतोषजनक काम करता है, तो तुरंत कामसेतु संचालन डेस्क से संपर्क करें।' }
            ].map((item, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #F1F5F9' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <CheckCircle2 size={16} color="#16A34A" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

      </Container>
    </Box>
  );
};
