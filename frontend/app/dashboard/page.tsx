'use client';

import { Box, Button, Typography, Paper } from '@mui/material';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        mt: -12
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Dashboard
        </Typography>

        <Typography variant="body1" mb={3}>
          Choose a section to manage:
        </Typography>

        <Box display="flex" gap={2} justifyContent="center">
          <Link href="/products">
            <Button variant="contained" color="primary">
              Manage Products
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="contained" color="secondary">
              Manage Orders
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
