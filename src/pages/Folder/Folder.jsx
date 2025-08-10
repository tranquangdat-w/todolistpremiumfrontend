import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import TaskDetail from './TaskDetail';

const Folder = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Click me
      </Button>

      <TaskDetail
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default Folder;
