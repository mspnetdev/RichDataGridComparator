import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const benchmarkRows = [
  {
    feature: 'Setup speed',
    mui: 'High: sorting, filtering, toolbar and pagination are already packaged.',
    tanstack: 'Medium: feature logic exists, but UI wiring is your responsibility.',
    aggrid: 'High: column filters, multi-sort and pagination are ready with minimal config.',
    winner: 'MUI / AG Grid'
  },
  {
    feature: 'Bundle entry cost',
    mui: 'Higher due to richer component surface and built-in grid UI.',
    tanstack: 'Lower because the table engine is headless and renders only what you add.',
    aggrid: 'Medium: core engine is lean, extra features are tree-shaken in.',
    winner: 'TanStack Table'
  },
  {
    feature: 'Visual consistency',
    mui: 'Strong default UX with coherent interactions out of the box.',
    tanstack: 'Depends entirely on your design system and implementation discipline.',
    aggrid: 'Good defaults with theme variants; fully customisable via CSS variables.',
    winner: 'MUI DataGrid'
  },
  {
    feature: 'Customization depth',
    mui: 'Good, but within the boundaries of the provided component model.',
    tanstack: 'Excellent: layout, markup and interactions are all under your control.',
    aggrid: 'Very good: cell renderers, editors and themes give deep control.',
    winner: 'TanStack / AG Grid'
  },
  {
    feature: 'Feature scaling',
    mui: 'Fast for admin panels and internal tools where defaults are valuable.',
    tanstack: 'Best when the table becomes product UI and needs domain-specific behavior.',
    aggrid: 'Scales well from simple tables to complex data-heavy dashboards.',
    winner: 'Tie by context'
  },
  {
    feature: 'Maintenance profile',
    mui: 'Less custom code to own, more vendor conventions to follow.',
    tanstack: 'More code to own, but easier to keep aligned with custom product requirements.',
    aggrid: 'Moderate: rich API surface but well documented and stable.',
    winner: 'Tie by team'
  }
];

const benchmarkCards = [
  {
    label: 'Initial route strategy',
    value: 'Lazy loaded',
    detail: 'Both grid pages now load only when visited.'
  },
  {
    label: 'Best fit',
    value: 'Admin UI vs custom product UI',
    detail: 'The choice depends on whether speed or flexibility matters more.'
  },
  {
    label: 'Recommendation',
    value: 'Prototype both',
    detail: 'This workspace now gives you the same dataset on both implementations.'
  }
];

function BenchmarkPage() {
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Benchmark funzionale
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 860, lineHeight: 1.6 }}>
            Vista di confronto sintetica per decidere quale griglia adottare in base a time-to-market, costo iniziale del bundle e livello di personalizzazione richiesto.
          </Typography>
        </Box>
        <Chip label="Feature-by-feature" color="primary" />
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        {benchmarkCards.map((card) => (
          <Card key={card.label} sx={{ flex: 1, border: '1px solid rgba(15,118,110,0.12)', boxShadow: '0 18px 40px rgba(15,23,42,0.06)' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {card.value}
              </Typography>
              <Typography color="text.secondary">{card.detail}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card sx={{ boxShadow: '0 24px 70px rgba(15,23,42,0.08)' }}>
        <CardContent>
          <TableContainer className="tanstack-shell">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>MUI DataGrid</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>TanStack Table</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>AG Grid Community</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Best fit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {benchmarkRows.map((row) => (
                  <TableRow key={row.feature} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{row.feature}</TableCell>
                    <TableCell>{row.mui}</TableCell>
                    <TableCell>{row.tanstack}</TableCell>
                    <TableCell>{row.aggrid}</TableCell>
                    <TableCell>{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
            <Button component={RouterLink} to="/mui-grid" variant="contained">
              Rivedi MUI DataGrid
            </Button>
            <Button component={RouterLink} to="/tanstack-table" variant="outlined">
              Rivedi TanStack Table
            </Button>
            <Button component={RouterLink} to="/ag-grid" variant="outlined">
              Rivedi AG Grid
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default BenchmarkPage;