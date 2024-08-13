import React from "react";
import { useTable } from "@tanstack/react-table";

interface Event {
    id: string;
    title: string;
    date: string;
}

interface TodoTableProps {
    events: Event[];
}

const TodoTable: React.FC<TodoTableProps> = ({ events }) => {
    // Define columns
    const columns = React.useMemo(
        () => [
            {
                accessorKey: "id", // Use accessorKey for direct property access
                header: "ID",
            },
            {
                accessorKey: "title",
                header: "Title",
            },
            {
                accessorKey: "date",
                header: "Date",
                cell: (info) =>
                    new Date(info.getValue<string>()).toLocaleDateString(), // Custom cell rendering
            },
        ],
        []
    );

    // Initialize table instance
    const table = useTable({
        data: events,
        columns,
    });

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.getHeaders().map((column) => (
                            <th
                                key={column.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.renderHeader()}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {cell.renderCell()}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TodoTable;
