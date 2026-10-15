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
  ChevronRight,
  HardHat,
  PhoneCall
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
        borderRadius: 3.5,
        border: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Banner accent stripe */}
      <Box sx={{ height: 6, bgcolor: worker.isVerified ? '#EA580C' : '#94A3B8' }} />

      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header row: Avatar, Name, Verification, Bookmark */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#0F172A',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: '2px solid #EA580C'
              }}
            >
              {worker.name.charAt(0)}
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                  {worker.name}
                </Typography>
                {worker.isVerified ? (
                  <Tooltip title="Admin Verified: Credentials, photo ID and past site work vetted by KaamSetu" arrow>
                    <Chip
                      size="small"
                      icon={<ShieldCheck size={13} color="#15803D" />}
                      label="Verified"
                      sx={{
                        height: 20,
                        fontSize: '0.68rem',
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
                    label={worker.verificationStatus || 'Under Review'}
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      bgcolor: '#FEF3C7',
                      color: '#B45309'
                    }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: '#EA580C', fontWeight: 700, fontSize: '0.85rem' }}>
                {worker.primarySkill}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={() => toggleSaveWorker(worker.id)}
            sx={{ color: isSaved ? '#EA580C' : '#94A3B8' }}
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </IconButton>
        </Box>

        {/* Location & Experience Meta */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5, color: '#64748B', fontSize: '0.82rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MapPin size={14} color="#EA580C" />
            <span>{worker.city} ({worker.locality?.split(',')[0] || 'Central'})</span>
          </Box>
          {worker.experienceYears > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Briefcase size={14} color="#0F172A" />
              <span>{worker.experienceYears} Years Experience</span>
            </Box>
          )}
        </Box>

        {/* Work types & Expected Wage */}
        <Box sx={{ bgcolor: '#F8FAFC', p: 1.25, borderRadius: 2, mb: 2, border: '1px solid #F1F5F9' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Wage / Contract Pref:
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
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
                  height: 19,
                  fontSize: '0.66rem',
                  fontWeight: 500,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#475569'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Additional Skills pills */}
        {worker.additionalSkills && worker.additionalSkills.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5, fontWeight: 600 }}>
              Key Specializations:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {worker.additionalSkills.slice(0, 3).map(skill => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    bgcolor: 'rgba(234, 88, 12, 0.08)',
                    color: '#C2410C',
                    fontWeight: 600
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Availability Status */}
        <Box sx={{ mt: 'auto', pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: worker.isAvailable ? '#16A34A' : '#F59E0B',
                boxShadow: worker.isAvailable ? '0 0 0 3px rgba(22, 163, 74, 0.2)' : 'none'
              }}
            />
            <Typography variant="caption" sx={{ color: worker.isAvailable ? '#16A34A' : '#B45309', fontWeight: 600 }}>
              {worker.availability}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
              {worker.rating || 4.8}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              ({worker.reviewsCount || 20})
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.75 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/workers/${worker.id}`)}
            sx={{
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontWeight: 600,
              fontSize: '0.8rem',
              py: 0.8,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#0F172A',
                bgcolor: '#F8FAFC'
              }
            }}
          >
            Profile Details
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onRequestQuote(worker)}
            sx={{
              bgcolor: '#EA580C',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.8rem',
              py: 0.8,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#C2410C'
              }
            }}
          >
            Request Quote
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};
