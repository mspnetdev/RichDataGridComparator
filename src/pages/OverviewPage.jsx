import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { summaryCards } from '../data/orders';

const comparisonItems = [
  {
    title: 'MUI DataGrid',
    strength: 'Ready-made UX',
    notes: 'Toolbar, pagination, sorting, filtering and density are available quickly with strong visual consistency.'
  },
  {
    title: 'TanStack Table',
    strength: 'Rendering freedom',
    notes: 'Headless primitives let you define markup, interactions and styling without framework constraints.'
  }
];

function OverviewPage() {
  return (
    <Stack spacing={4}>
      <Box sx={{ p: { xs: 3, md: 5 }, borderRadius: 8, background: 'linear-gradient(135deg, rgba(255,250,244,0.98), rgba(228,241,238,0.96))', boxShadow: '0 24px 80px rgba(15,23,42,0.08)' }}>
        <Stack spacing={3}>
          <Chip label="Interactive benchmark" color="primary" sx={{ alignSelf: 'flex-start' }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4.8rem' }, maxWidth: 900 }}>
            Comparatore data grid.
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 880, lineHeight: 1.45 }}>
            Questa demo mette a confronto una grid opinionated e pronta all'uso con un motore headless orientato alla composizione.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component={RouterLink} to="/mui-grid" variant="contained" size="large" endIcon={<EastRoundedIcon />}>
              Apri MUI DataGrid
            </Button>
            <Button component={RouterLink} to="/tanstack-table" variant="outlined" size="large">
              Apri TanStack Table
            </Button>
            <Button component={RouterLink} to="/benchmark" variant="text" size="large">
              Apri Benchmark
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {summaryCards.map((card) => (
          <Grid item xs={12} md={4} key={card.label}>
            <Card sx={{ height: '100%', border: '1px solid rgba(15,118,110,0.12)', boxShadow: '0 18px 40px rgba(15,23,42,0.06)' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {card.label}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography color="text.secondary">{card.detail}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {comparisonItems.map((item) => (
          <Grid item xs={12} md={6} key={item.title}>
            <Card sx={{ height: '100%', background: 'rgba(255,250,244,0.92)' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">{item.title}</Typography>
                  <Chip label={item.strength} color="secondary" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.notes}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default OverviewPage;