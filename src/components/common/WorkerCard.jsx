import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  MapPin,
  Briefcase,
  Star,
  ShieldCheck,
  Clock,
  Bookmark,
  BookmarkCheck,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const WorkerCard = ({ worker, onRequestQuote }) => {
  const navigate = useNavigate();
  const { savedWorkers, toggleSaveWorker } = useApp();
  const isSaved = savedWorkers.includes(worker.id);

  return (
    <Card
      className="interactive-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        borderRadius: 4,
        border: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* शीर्ष सजावटी बार */}
      <Box sx={{ height: 5, background: worker.isVerified ? 'linear-gradient(90deg, #EA580C, #F59E0B)' : '#CBD5E1' }} />

      <CardContent sx={{ p: { xs: 2.2, sm: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* हेडर पंक्ति: अवतार, नाम, सत्यापन, सेव बटन */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: '#0F172A',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem',
                border: '2.5px solid #EA580C',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
              }}
            >
              {worker.name.charAt(0)}
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.25, fontSize: '1rem' }}>
                  {worker.name}
                </Typography>
                {worker.isVerified ? (
                  <Tooltip title="सत्यापित कारीगर: पहचान पत्र, साइट कार्य व पूर्व अनुभव का भौतिक सत्यापन पूर्ण।" arrow>
                    <Chip
                      size="small"
                      icon={<ShieldCheck size={13} color="#15803D" />}
                      label="सत्यापित"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: '#DCFCE7',
                        color: '#15803D',
                        border: '1px solid #86EFAC'
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Chip
                    size="small"
                    label={worker.verificationStatus || 'समीक्षाधीन'}
                    sx={{
                      height: 22,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      bgcolor: '#FEF3C7',
                      color: '#B45309'
                    }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700, fontSize: '0.86rem', mt: 0.25 }}>
                {worker.primarySkill}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={() => toggleSaveWorker(worker.id)}
            sx={{ color: isSaved ? '#EA580C' : '#94A3B8' }}
            title={isSaved ? "सेव किया हुआ" : "सेव करें"}
          >
            {isSaved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
          </IconButton>
        </Box>

        {/* स्थान एवं अनुभव */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5, color: '#64748B', fontSize: '0.82rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MapPin size={14} color="#EA580C" />
            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
              {worker.city} ({worker.locality?.split(',')[0] || 'मुख्य क्षेत्र'})
            </Typography>
          </Box>
          {worker.experienceYears > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Briefcase size={14} color="#0F172A" />
              <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
                {worker.experienceYears} वर्ष अनुभव
              </Typography>
            </Box>
          )}
        </Box>

        {/* कार्य दर व मजदूरी */}
        <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2.5, mb: 2, border: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              अपेक्षित दैनिक मजदूरी / दर:
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#0F172A', fontWeight: 800 }}>
              {worker.expectedWage}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {worker.workTypes?.map((wt) => (
              <Chip
                key={wt}
                label={wt}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#334155'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* प्रमुख कौशल */}
        {worker.additionalSkills && worker.additionalSkills.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 700 }}>
              प्रमुख विशेषज्ञता:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {worker.additionalSkills.slice(0, 3).map(skill => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.72rem',
                    bgcolor: 'rgba(234, 88, 12, 0.08)',
                    color: '#C2410C',
                    fontWeight: 600,
                    border: '1px solid rgba(234, 88, 12, 0.15)'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* उपलब्धता एवं रेटिंग */}
        <Box sx={{ mt: 'auto', pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: worker.isAvailable ? '#16A34A' : '#F59E0B',
                boxShadow: worker.isAvailable ? '0 0 0 3px rgba(22, 163, 74, 0.2)' : 'none'
              }}
            />
            <Typography variant="caption" sx={{ color: worker.isAvailable ? '#15803D' : '#B45309', fontWeight: 700 }}>
              {worker.availability}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#FEF3C7', px: 1, py: 0.25, borderRadius: 1.5 }}>
            <Star size={13} fill="#D97706" color="#D97706" />
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#92400E' }}>
              {worker.rating || 4.8}
            </Typography>
            <Typography variant="caption" sx={{ color: '#B45309', fontSize: '0.7rem' }}>
              ({worker.reviewsCount || 24})
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* एक्शन बटन */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/workers/${worker.id}`)}
            sx={{
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.82rem',
              py: 0.85,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#0F172A',
                bgcolor: '#F8FAFC'
              }
            }}
          >
            प्रोफ़ाइल देखें
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onRequestQuote(worker)}
            startIcon={<PhoneCall size={14} />}
            sx={{
              bgcolor: '#EA580C',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.82rem',
              py: 0.85,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
              '&:hover': {
                bgcolor: '#C2410C'
              }
            }}
          >
            बात करें
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};
