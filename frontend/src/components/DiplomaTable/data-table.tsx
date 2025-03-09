import { Diploma } from './columns';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const diplomaData: Diploma[] = [
  {
    id: '1',
    name: 'John Smith',
    SSN: '1234',
    email: 'john.smith@email.com',
    degree: 'Bachelor of Science',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'success',
  },
  {
    id: '2',
    name: 'Emma Johnson',
    SSN: '5678',
    email: 'emma.j@email.com',
    degree: 'Master of Arts',
    createdAt: '2024-01-14T09:30:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Michael Brown',
    SSN: '9012',
    email: 'm.brown@email.com',
    degree: 'Bachelor of Arts',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z',
    status: 'processing',
  },
  {
    id: '4',
    name: 'Sarah Davis',
    SSN: '3456',
    email: 'sarah.d@email.com',
    degree: 'Master of Science',
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-12T16:30:00Z',
    status: 'failed',
  },
  {
    id: '5',
    name: 'James Wilson',
    SSN: '7890',
    email: 'j.wilson@email.com',
    degree: 'PhD in Physics',
    createdAt: '2024-01-11T08:45:00Z',
    updatedAt: '2024-01-11T08:45:00Z',
    status: 'success',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    SSN: '4321',
    email: 'l.anderson@email.com',
    degree: 'Bachelor of Engineering',
    createdAt: '2024-01-10T13:25:00Z',
    updatedAt: '2024-01-10T13:25:00Z',
    status: 'pending',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    SSN: '8765',
    email: 'r.taylor@email.com',
    degree: 'Master of Business',
    createdAt: '2024-01-09T16:50:00Z',
    updatedAt: '2024-01-09T16:50:00Z',
    status: 'processing',
  },
  {
    id: '8',
    name: 'Emily White',
    SSN: '2109',
    email: 'e.white@email.com',
    degree: 'Bachelor of Medicine',
    createdAt: '2024-01-08T10:35:00Z',
    updatedAt: '2024-01-08T10:35:00Z',
    status: 'success',
  },
  {
    id: '9',
    name: 'David Miller',
    SSN: '6543',
    email: 'd.miller@email.com',
    degree: 'Master of Law',
    createdAt: '2024-01-07T12:40:00Z',
    updatedAt: '2024-01-07T12:40:00Z',
    status: 'failed',
  },
  {
    id: '10',
    name: 'Jennifer Lee',
    SSN: '0987',
    email: 'j.lee@email.com',
    degree: 'PhD in Chemistry',
    createdAt: '2024-01-06T09:15:00Z',
    updatedAt: '2024-01-06T09:15:00Z',
    status: 'success',
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DiplomaTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
