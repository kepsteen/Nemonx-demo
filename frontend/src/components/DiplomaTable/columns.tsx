import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { z } from 'zod';

export const diplomaSchema = z.object({
  id: z.string(),
  name: z.string(),
  SSN: z.string().min(4).max(4),
  email: z.string().email(),
  degree: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
});

export type Diploma = z.infer<typeof diplomaSchema>;

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
    header: 'Name',
  },
  {
    accessorKey: 'SSN',
    header: 'SSN',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
