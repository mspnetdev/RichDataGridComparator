import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { orders } from '../data/orders';

const numericFields = new Set(['quantity', 'unitPrice', 'net', 'margin', 'discount', 'fulfillmentDays', 'gross']);

function TanStackTablePage() {
  const [tableData, setTableData] = useState(orders);
  const [sorting, setSorting] = useState([{ id: 'net', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({ gross: false });
  const [editingRowId, setEditingRowId] = useState(null);
  const [draftRow, setDraftRow] = useState(null);

  const updateDraftField = (field, value) => {
    setDraftRow((currentDraft) => ({
      ...currentDraft,
      [field]: value
    }));
  };

  const startEditing = (row) => {
    setEditingRowId(row.id);
    setDraftRow({ ...row });
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setDraftRow(null);
  };

  const saveEditing = () => {
    if (!draftRow) {
      return;
    }

    const normalizedRow = Object.entries(draftRow).reduce((nextRow, [field, value]) => {
      nextRow[field] = numericFields.has(field) ? Number(value) : value;
      return nextRow;
    }, {});

    setTableData((currentRows) => currentRows.map((row) => (row.id === normalizedRow.id ? normalizedRow : row)));
    setEditingRowId(null);
    setDraftRow(null);
  };

  const renderEditableCell = (row, field, type = 'text', formatter = null) => {
    const isEditing = editingRowId === row.original.id;

    if (isEditing && draftRow) {
      return (
        <TextField
          type={type}
          value={draftRow[field] ?? ''}
          onChange={(event) => updateDraftField(field, event.target.value)}
          variant="standard"
          size="small"
          fullWidth
          InputLabelProps={type === 'date' ? { shrink: true } : undefined}
        />
      );
    }

    const value = row.getValue(field);
    return formatter ? formatter(value) : value;
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        size: 52
      },
      {
        accessorKey: 'orderCode',
        header: 'Order',
        cell: ({ row }) => renderEditableCell(row, 'orderCode')
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => renderEditableCell(row, 'customer')
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ row }) => renderEditableCell(row, 'region')
      },
      {
        accessorKey: 'salesOwner',
        header: 'Owner',
        cell: ({ row }) => renderEditableCell(row, 'salesOwner')
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => renderEditableCell(row, 'status')
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => renderEditableCell(row, 'priority')
      },
      {
        accessorKey: 'quantity',
        header: 'Qty',
        cell: ({ row }) => renderEditableCell(row, 'quantity', 'number')
      },
      {
        accessorKey: 'unitPrice',
        header: 'Unit Price',
        cell: ({ row }) => renderEditableCell(row, 'unitPrice', 'number', (value) => `$${value}`)
      },
      {
        accessorKey: 'net',
        header: 'Net',
        cell: ({ row }) => renderEditableCell(row, 'net', 'number', (value) => `$${value}`)
      },
      {
        accessorKey: 'margin',
        header: 'Margin',
        cell: ({ row }) => renderEditableCell(row, 'margin', 'number', (value) => `$${value}`)
      },
      {
        accessorKey: 'discount',
        header: 'Discount %',
        cell: ({ row }) => renderEditableCell(row, 'discount', 'number')
      },
      {
        accessorKey: 'fulfillmentDays',
        header: 'Lead Days',
        cell: ({ row }) => renderEditableCell(row, 'fulfillmentDays', 'number')
      },
      {
        accessorKey: 'gross',
        header: 'Gross',
        cell: ({ row }) => renderEditableCell(row, 'gross', 'number', (value) => `$${value}`)
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => renderEditableCell(row, 'createdAt', 'date')
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const isEditing = editingRowId === row.original.id;

          return isEditing ? (
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="primary" onClick={saveEditing}>
                <SaveRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="inherit" onClick={cancelEditing}>
                <CancelRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <IconButton size="small" color="primary" onClick={() => startEditing(row.original)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          );
        }
      }
    ],
    [draftRow, editingRowId]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10
      }
    }
  });

  const visibleColumns = table
    .getAllLeafColumns()
    .filter((column) => column.id !== 'select');

  return (
    <Stack spacing={3} sx={{ minWidth: 0 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            TanStack Table
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 840 }}>
            Stessa base dati ma con rendering custom: ordinamento, ricerca globale, paginazione, selezione righe, visibilita colonne e modifica esplicita della riga sono composti a mano.
          </Typography>
        </Box>
        <Chip label="Headless + flexible" color="secondary" />
      </Stack>

      <Card sx={{ minWidth: 0, boxShadow: '0 24px 70px rgba(15,23,42,0.08)' }}>
        <CardContent sx={{ minWidth: 0 }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="space-between" sx={{ mb: 3 }}>
            <TextField
              label="Global search"
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              sx={{ minWidth: { xs: '100%', lg: 340 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              select
              label="Rows per page"
              value={table.getState().pagination.pageSize}
              onChange={(event) => table.setPageSize(Number(event.target.value))}
              sx={{ minWidth: 180 }}
            >
              {[5, 10, 20].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            {visibleColumns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={<Checkbox checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />}
                label={column.id}
              />
            ))}
          </Stack>

          <TableContainer className="tanstack-shell">
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} sx={{ fontWeight: 700 }}>
                        {header.isPlaceholder ? null : (
                          <Button
                            color="inherit"
                            onClick={header.column.getToggleSortingHandler()}
                            endIcon={<UnfoldMoreRoundedIcon fontSize="small" />}
                            sx={{ p: 0, minWidth: 0, justifyContent: 'flex-start', textTransform: 'none', fontWeight: 700 }}
                            disabled={!header.column.getCanSort()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </Button>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} hover selected={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.header, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mt: 3 }}>
            <Typography color="text.secondary">
              {Object.keys(rowSelection).length} righe selezionate su {table.getFilteredRowModel().rows.length} visibili
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ArrowBackRoundedIcon />
              </IconButton>
              <Typography>
                Pagina {table.getState().pagination.pageIndex + 1} di {table.getPageCount()}
              </Typography>
              <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ArrowForwardRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default TanStackTablePage;