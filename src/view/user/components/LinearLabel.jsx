import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

function LinearProgressWithLabel({ value }) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default LinearProgressWithLabel;
