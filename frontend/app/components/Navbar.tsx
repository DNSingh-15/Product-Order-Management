'use client';
import Link from 'next/link';
import { AppBar, Toolbar, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Button color="inherit" component={Link} href="/">
          Signup
        </Button>
        <Button color="inherit" component={Link} href="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} href="/orders">
          Orders
        </Button>
      </Toolbar>
    </AppBar>
  );
}
