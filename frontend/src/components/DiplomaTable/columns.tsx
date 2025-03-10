import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Diploma } from '@/types';
import { EditDiplomaDrawer } from './edit-diploma-drawer';
import { TableMetaType } from './data-table';

export const columns: ColumnDef<Diploma>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => row.original.student?.name,
    header: 'Name',
  },
  {
    accessorKey: 'SSN',
    cell: ({ row }) => row.original.student?.ssn,
    header: 'SSN',
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => row.original.student?.email,
    header: 'Email',
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return row.original.created_at.split('T')[0];
    },
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      switch (row.original.status) {
        case 'pending':
          return <span>Pending</span>;
        case 'processing':
          return <span className="text-blue-500">Processing</span>;
        case 'success':
          return <span className="text-green-500">Success</span>;
        case 'failed':
          return <span className="text-red-500">Failed</span>;
        default:
          return <span>Unknown</span>;
      }
    },
    header: 'Status',
  },
  {
    accessorKey: 'phone',
    cell: ({ row }) => {
      const phone = row.original.student?.phone;
      if (!phone) return '';

      const formattedPhone =
        '(' +
        phone.slice(0, 3) +
        ')' +
        phone.slice(3, 6) +
        '-' +
        phone.slice(6);
      return formattedPhone;
    },
    header: 'Phone',
  },
  {
    accessorKey: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMetaType<Diploma>;
      return (
        <EditDiplomaDrawer data={row.original} refreshData={meta.refreshData} />
      );
    },
    header: 'Actions',
  },
];
