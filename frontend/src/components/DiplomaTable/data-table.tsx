import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  TableMeta,
  RowSelectionState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDiplomas } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Diploma } from '@/types';

export interface TableMetaType<TData> extends TableMeta<TData> {
  refreshData: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DiplomaTable<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    meta: {
      refreshData: () => {
        getDiplomas().then((data) => {
          setData(data);
        });
      },
    } as TableMetaType<TData>,
    debugTable: false,
  });

  const handleSendDiplomas = () => {
    // Get selected rows
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    if (selectedRows.length === 0) {
      alert('No diplomas selected');
      return;
    }

    // Extract student names from selected rows
    const studentNames = selectedRows.map((row) => {
      const diploma = row.original as unknown as Diploma;
      return diploma.student?.name || 'Unknown Student';
    });

    // Create alert message
    const message = `Diplomas sent to: ${studentNames.join(', ')}`;
    alert(message);

    // Reset selection after sending
    setRowSelection({});
  };

  return (
    <div className="flex flex-col h-[500px]">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-gray-50 hover:bg-gray-50 sticky top-0"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-3 first:pl-4 last:pr-4"
                  >
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
                  <TableCell key={cell.id} className="first:pl-4 last:pr-4">
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
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleSendDiplomas}
          disabled={Object.keys(rowSelection).length === 0}
          className="bg-green-500 hover:bg-green-600"
        >
          Send Selected Diplomas
        </Button>
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div className="text-sm text-muted-foreground text-right mt-1">
          {Object.keys(rowSelection).length}{' '}
          {Object.keys(rowSelection).length === 1 ? 'diploma' : 'diplomas'}{' '}
          selected
        </div>
      )}
    </div>
  );
}
