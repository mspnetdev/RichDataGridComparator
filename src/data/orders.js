export const regions = ['North', 'South', 'West', 'Central', 'Export'];
export const statuses = ['Draft', 'Processing', 'Shipped', 'Delivered', 'Returned'];
export const salesPeople = ['Alina', 'Marco', 'Sofia', 'Noah', 'Luca', 'Mina', 'Emma', 'Ari'];
export const priorities = ['Low', 'Normal', 'High'];

export const orders = Array.from({ length: 48 }, (_, index) => {
  const quantity = 8 + (index % 9) * 4;
  const unitPrice = 18 + (index % 7) * 9;
  const gross = quantity * unitPrice;
  const discount = (index % 5) * 0.03;
  const net = Number((gross * (1 - discount)).toFixed(2));
  const margin = Number((net * (0.24 + (index % 4) * 0.05)).toFixed(2));
  const createdAt = new Date(2026, index % 12, 3 + (index % 25));

  return {
    id: index + 1,
    orderCode: `SO-${String(index + 1001)}`,
    customer: ['Nexa Foods', 'Blue Atlas', 'Orion Labs', 'Linea Casa', 'Delta Retail', 'Bright Ware'][index % 6],
    region: regions[index % regions.length],
    salesOwner: salesPeople[index % salesPeople.length],
    status: statuses[index % statuses.length],
    quantity,
    unitPrice,
    gross,
    discount: Number((discount * 100).toFixed(0)),
    net,
    margin,
    priority: priorities[index % priorities.length],
    createdAt: createdAt.toISOString().slice(0, 10),
    fulfillmentDays: 2 + (index % 6)
  };
});

export const summaryCards = [
  {
    label: 'Rows in sample',
    value: orders.length,
    detail: 'Same dataset on both pages'
  },
  {
    label: 'Best for speed',
    value: 'MUI DataGrid',
    detail: 'Rich defaults and polished UX'
  },
  {
    label: 'Best for control',
    value: 'TanStack Table',
    detail: 'Headless rendering and composition'
  }
];