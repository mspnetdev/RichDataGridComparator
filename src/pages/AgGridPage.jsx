import React, { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { orders, priorities, regions, salesPeople, statuses } from '../data/orders';

// Removed gridMinWidth to allow responsive layout

// Cell renderer for Edit / Save / Cancel buttons.
// Reads editingRowId from a ref via a context getter so refreshCells() keeps buttons in sync
// without routing through React state in the parent component.
function ActionsRenderer({ api, node, context }) {
  const isEditing = context.editingRowId === node.data?.id;

  const handleEdit = () => {
    context.setEditingRowId(node.data?.id);
    api.startEditingCell({ rowIndex: node.rowIndex, colKey: 'orderCode' });
  };

  const handleSave = () => {
    api.stopEditing(false);
    context.setEditingRowId(null);
  };

  const handleCancel = () => {
    api.stopEditing(true);
    context.setEditingRowId(null);
  };

  if (isEditing) {
    return (
      <Stack direction="row" spacing={0} alignItems="center" sx={{ height: '100%' }}>
        <IconButton size="small" color="primary" onClick={handleSave} title="Salva">
          <SaveRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleCancel} title="Annulla">
          <CancelRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" sx={{ height: '100%' }}>
      <IconButton size="small" onClick={handleEdit} title="Modifica">
        <EditRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

function AgGridPage() {
  const gridRef = useRef(null);
  const editingRowIdRef = useRef(null);

  const setEditingRowId = useCallback((id) => {
    editingRowIdRef.current = id;
    gridRef.current?.api?.refreshCells({ force: true, columns: ['actions'] });
  }, []);

  const gridContext = useMemo(
    () => ({
      get editingRowId() {
        return editingRowIdRef.current;
      },
      setEditingRowId
    }),
    [setEditingRowId]
  );

  const handleQuickFilter = (event) => {
    gridRef.current?.api?.setGridOption('quickFilterText', event.target.value);
  };

  const handleExportClick = useCallback(() => {
    gridRef.current?.api?.exportDataAsCsv({ fileName: 'ag-grid-orders.csv' });
  }, []);

  const onRowEditingStopped = useCallback(() => {
    editingRowIdRef.current = null;
    gridRef.current?.api?.refreshCells({ force: true, columns: ['actions'] });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 90
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        width: 48,
        minWidth: 48,
        maxWidth: 48,
        resizable: false,
        sortable: false,
        filter: false,
        editable: false,
        pinned: 'left'
      },
      { field: 'orderCode', headerName: 'Order', minWidth: 110, flex: 0.9, pinned: 'left' },
      { field: 'customer', headerName: 'Customer', minWidth: 150, flex: 1.2, pinned: 'left' },
      {
        field: 'region',
        headerName: 'Region',
        minWidth: 100,
        flex: 0.75,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: regions },
        filter: 'agTextColumnFilter'
      },
      {
        field: 'salesOwner',
        headerName: 'Owner',
        minWidth: 110,
        flex: 0.8,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: salesPeople },
        filter: 'agTextColumnFilter'
      },
      {
        field: 'status',
        headerName: 'Status',
        minWidth: 120,
        flex: 0.9,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: statuses },
        filter: 'agTextColumnFilter'
      },
      {
        field: 'priority',
        headerName: 'Priority',
        minWidth: 100,
        flex: 0.8,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: priorities },
        filter: 'agTextColumnFilter'
      },
      { field: 'quantity', headerName: 'Qty', type: 'numericColumn', minWidth: 80, flex: 0.6, filter: 'agNumberColumnFilter' },
      {
        field: 'unitPrice',
        headerName: 'Unit Price',
        type: 'numericColumn',
        minWidth: 100,
        flex: 0.8,
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value }) => (value != null ? `$${value}` : '')
      },
      {
        field: 'net',
        headerName: 'Net',
        type: 'numericColumn',
        minWidth: 100,
        flex: 0.8,
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value }) => (value != null ? `$${value}` : '')
      },
      {
        field: 'margin',
        headerName: 'Margin',
        type: 'numericColumn',
        minWidth: 100,
        flex: 0.8,
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value }) => (value != null ? `$${value}` : ''),
        hide: true
      },
      { field: 'discount', headerName: 'Discount %', type: 'numericColumn', minWidth: 100, flex: 0.8, filter: 'agNumberColumnFilter', hide: true },
      { field: 'fulfillmentDays', headerName: 'Lead Days', type: 'numericColumn', minWidth: 100, flex: 0.8, filter: 'agNumberColumnFilter', hide: true },
      { field: 'createdAt', headerName: 'Created', minWidth: 110, flex: 0.9, hide: true },
      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 110,
        width: 110,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: ActionsRenderer,
        pinned: 'right'
      }
    ],
    []
  );

  return (
    <Stack spacing={3} sx={{ minWidth: 0 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            AG Grid Community
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 800 }}>
            Sorting multi-colonna (Ctrl+click), filtri per colonna (testo, numero), quick search, modifica inline a livello di riga tramite pulsante, selezione checkbox, paginazione e ridimensionamento colonne.
          </Typography>
        </Box>
        <Chip label="Performance + flessibilità" color="primary" />
      </Stack>

      <Card sx={{ minWidth: 0, overflow: 'visible', boxShadow: '0 24px 70px rgba(15,23,42,0.08)' }}>
        <CardContent sx={{ p: 0, pb: '0 !important', minWidth: 0 }}>
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(15,118,110,0.1)', display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              onChange={handleQuickFilter}
              placeholder="Cerca in tutta la tabella…"
              size="small"
              sx={{ width: 320 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Button size="small" onClick={handleExportClick} sx={{ textTransform: 'none' }}>
              Scarica CSV
            </Button>
          </Box>
          <Box
            sx={{
              height: 680,
              width: '100%',
              minWidth: 0,
              overflowX: 'auto',
              overflowY: 'hidden'
            }}
          >
            <Box sx={{ height: '100%', minWidth: 0 }} className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef}
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                selection={{ mode: 'multiRow', enableClickSelection: false, checkboxes: true, headerCheckbox: true }}
                editType="fullRow"
                pagination
                paginationPageSize={10}
                paginationPageSizeSelector={[5, 10, 20]}
                multiSortKey="ctrl"
                context={gridContext}
                onRowEditingStopped={onRowEditingStopped}
                animateRows
                initialState={{
                  sort: {
                    sortModel: [{ colId: 'net', sort: 'desc' }]
                  },
                  filter: {
                    filterModel: {
                      status: { filterType: 'text', type: 'equals', filter: 'Delivered' }
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default AgGridPage;
