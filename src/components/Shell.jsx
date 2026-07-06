import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Chip, Container, Stack, Toolbar, Typography } from '@mui/material';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/mui-grid', label: 'MUI DataGrid' },
  { to: '/tanstack-table', label: 'TanStack Table' },
  { to: '/ag-grid', label: 'AG Grid' },
  { to: '/benchmark', label: 'Benchmark' }
];

function Shell() {
  const { pathname } = useLocation();
  const isDataHeavyRoute = ['/mui-grid', '/tanstack-table', '/ag-grid', '/benchmark'].includes(pathname);

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top left, rgba(15,118,110,0.16), transparent 34%), radial-gradient(circle at top right, rgba(217,119,6,0.18), transparent 28%)' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(31,41,55,0.08)' }}>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            Grid Comparison Lab
          </Typography>
          <Chip label="React + Vite" color="secondary" variant="outlined" />
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                color="inherit"
                sx={{
                  px: 2,
                  '&.active': {
                    backgroundColor: 'rgba(15,118,110,0.12)',
                    color: 'primary.main'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={isDataHeavyRoute ? false : 'xl'}
        sx={{
          py: { xs: 4, md: 6 },
          px: isDataHeavyRoute ? { xs: 1.5, md: 3 } : undefined
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default Shell;