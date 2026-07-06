import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Shell from './components/Shell';
import OverviewPage from './pages/OverviewPage';

const MuiGridPage = lazy(() => import('./pages/MuiGridPage'));
const TanStackTablePage = lazy(() => import('./pages/TanStackTablePage'));
const AgGridPage = lazy(() => import('./pages/AgGridPage'));
const BenchmarkPage = lazy(() => import('./pages/BenchmarkPage'));

function PageFallback() {
  return (
    <Box sx={{ minHeight: 320, display: 'grid', placeItems: 'center' }}>
      <CircularProgress color="primary" />
    </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<OverviewPage />} />
        <Route
          path="mui-grid"
          element={
            <Suspense fallback={<PageFallback />}>
              <MuiGridPage />
            </Suspense>
          }
        />
        <Route
          path="tanstack-table"
          element={
            <Suspense fallback={<PageFallback />}>
              <TanStackTablePage />
            </Suspense>
          }
        />
        <Route
          path="ag-grid"
          element={
            <Suspense fallback={<PageFallback />}>
              <AgGridPage />
            </Suspense>
          }
        />
        <Route
          path="benchmark"
          element={
            <Suspense fallback={<PageFallback />}>
              <BenchmarkPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;