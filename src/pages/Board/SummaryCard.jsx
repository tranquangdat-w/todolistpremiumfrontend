import React from 'react';
import { Paper, Typography, Stack, Avatar, AvatarGroup, Chip, LinearProgress, Box } from '@mui/material';

const SummaryCard = () => {
  return (
    <Paper
        elevation={3}
        sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            height: '100%', // <— this makes it match the Gantt
        }}
    >
      {/* Header */}
      <Typography variant="h6" fontWeight="bold">
        Project Overview
      </Typography>

      {/* Duration & Status */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">Duration</Typography>
            <Typography variant="body2">12/03/2022 – 12/03/2023</Typography>
          </Stack>
        </Stack>
        <Chip label="On going" color="success" size="small" sx={{ fontWeight: 'bold' }} />
      </Stack>

      {/* Members */}
      <Typography variant="body2" sx={{ mt: 2, mb: 0.5 }}>
        MEMBER
      </Typography>
      <AvatarGroup max={4}>
        <Avatar alt="User 1" src="/user1.jpg" />
        <Avatar alt="User 2" src="/user2.jpg" />
        <Avatar alt="User 3" src="/user3.jpg" />
        <Avatar alt="User 4" src="/user4.jpg" />
      </AvatarGroup>

      {/* Work Process */}
      <Typography variant="body2" sx={{ mt: 2, mb: 0.5 }}>
        WORK PROCESS
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">32</Typography>
          <Typography variant="caption" color="textSecondary">TASK</Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">25.66%</Typography>
          <Typography variant="caption" color="textSecondary">COMPLETED</Typography>
        </Box>
      </Stack>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={25.66}
        sx={{
          mt: 1,
          height: 8,
          borderRadius: 5,
          backgroundColor: '#f0f0f0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
          },
        }}
      />
    </Paper>
  );
};

export default SummaryCard;
