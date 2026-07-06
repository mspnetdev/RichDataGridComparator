import React, { useState } from 'react';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbar
} from '@mui/x-data-grid';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { orders, priorities, regions, salesPeople, statuses } from '../data/orders';

const gridMinWidth = 1490;

function MuiGridPage() {
  const [rows, setRows] = useState(orders);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((currentModel) => ({
      ...currentModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel((currentModel) => ({
      ...currentModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel((currentModel) => ({
      ...currentModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
  };

  const processRowUpdate = (updatedRow) => {
    const normalizedRow = {
      ...updatedRow,
      quantity: Number(updatedRow.quantity),
      unitPrice: Number(updatedRow.unitPrice),
      net: Number(updatedRow.net),
      margin: Number(updatedRow.margin),
      discount: Number(updatedRow.discount),
      fulfillmentDays: Number(updatedRow.fulfillmentDays)
    };

    setRows((currentRows) => currentRows.map((row) => (row.id === normalizedRow.id ? normalizedRow : row)));
    return normalizedRow;
  };

  const columns = [
    { field: 'orderCode', headerName: 'Order', minWidth: 110, flex: 0.9, editable: true },
    { field: 'customer', headerName: 'Customer', minWidth: 150, flex: 1.2, editable: true },
    { field: 'region', headerName: 'Region', minWidth: 100, flex: 0.75, editable: true, type: 'singleSelect', valueOptions: regions },
    { field: 'salesOwner', headerName: 'Owner', minWidth: 110, flex: 0.8, editable: true, type: 'singleSelect', valueOptions: salesPeople },
    { field: 'status', headerName: 'Status', minWidth: 120, flex: 0.9, editable: true, type: 'singleSelect', valueOptions: statuses },
    { field: 'priority', headerName: 'Priority', minWidth: 100, flex: 0.8, editable: true, type: 'singleSelect', valueOptions: priorities },
    { field: 'quantity', headerName: 'Qty', type: 'number', minWidth: 80, flex: 0.6, editable: true },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      type: 'number',
      minWidth: 100,
      flex: 0.8,
      editable: true,
      valueFormatter: ({ value }) => `$${value}`
    },
    {
      field: 'net',
      headerName: 'Net',
      type: 'number',
      minWidth: 100,
      flex: 0.8,
      editable: true,
      valueFormatter: ({ value }) => `$${value}`
    },
    {
      field: 'margin',
      headerName: 'Margin',
      type: 'number',
      minWidth: 100,
      flex: 0.8,
      editable: true,
      valueFormatter: ({ value }) => `$${value}`
    },
    { field: 'discount', headerName: 'Discount %', type: 'number', minWidth: 100, flex: 0.8, editable: true },
    { field: 'fulfillmentDays', headerName: 'Lead Days', type: 'number', minWidth: 100, flex: 0.8, editable: true },
    { field: 'createdAt', headerName: 'Created', minWidth: 110, flex: 0.9, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 110,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem key="save" icon={<SaveRoundedIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem key="cancel" icon={<CancelRoundedIcon />} label="Cancel" onClick={handleCancelClick(id)} color="inherit" />
          ];
        }

        return [
          <GridActionsCellItem key="edit" icon={<EditRoundedIcon />} label="Edit" onClick={handleEditClick(id)} color="inherit" />
        ];
      }
    }
  ];

  return (
    <Stack spacing={3} sx={{ minWidth: 0 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            MUI DataGrid
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 800 }}>
            Pagina pronta per sorting multi-colonna, filtri, quick search, densita, selezione righe, paginazione, export e modifica inline a livello di riga.
          </Typography>
        </Box>
        <Chip label="Opinionated + productive" color="primary" />
      </Stack>

      <Card sx={{ minWidth: 0, overflow: 'visible', boxShadow: '0 24px 70px rgba(15,23,42,0.08)' }}>
        <CardContent sx={{ p: 0, minWidth: 0 }}>
          <Box
            sx={{
              height: 720,
              width: '100%',
              minWidth: 0,
              overflowX: 'auto',
              overflowY: 'hidden',
              '& .MuiDataGrid-root': { border: 0, minWidth: gridMinWidth },
              '& .MuiDataGrid-main': { minWidth: 0 },
              '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(15,118,110,0.08)' }
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              editMode="row"
              pagination
              pageSizeOptions={[5, 10, 20]}
              rowModesModel={rowModesModel}
              onRowModesModelChange={setRowModesModel}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
                sorting: { sortModel: [{ field: 'net', sort: 'desc' }] },
                filter: {
                  filterModel: {
                    items: [{ field: 'status', operator: 'is', value: 'Delivered' }]
                  }
                },
                columns: {
                  columnVisibilityModel: {
                    gross: false
                  }
                }
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 300 },
                  csvOptions: { fileName: 'mui-grid-orders' }
                }
              }}
              sx={{ minWidth: gridMinWidth }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default MuiGridPage;