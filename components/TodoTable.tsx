"use client";
export const dynamic = "force-dynamic";
import React from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    Column,
    CellProps,
    Row,
    UseSortByColumnProps,
} from "react-table";

interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
    updatedAt?: string | Date | null;
    createdAt?: string | Date | null;
}

const columns: Column<Todo>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Title",
        accessor: "title",
        Cell: ({ row, value }: CellProps<Todo>) => (
            <span
                className={
                    row.original.isCompleted
                        ? "line-through text-green-700"
                        : ""
                }
            >
                {value}
            </span>
        ),
    },
    {
        Header: "Completed",
        accessor: "isCompleted",
        Cell: ({ value }: CellProps<Todo>) => (
            <span
                className={
                    value
                        ? "text-green-700 font-bold"
                        : "text-red-500 font-bold"
                }
            >
                {value ? "Yes" : "No"}
            </span>
        ),
    },
    {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }: CellProps<Todo>) =>
            value ? new Date(value).toLocaleString() : "N/A",
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }: CellProps<Todo>) =>
            value ? new Date(value).toLocaleString() : "N/A",
    },
];

interface TodoTableProps {
    data: Todo[];
}

const TodoTable: React.FC<TodoTableProps> = ({ data }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable<Todo>(
        {
            columns,
            data,
        },
        useFilters,
        useSortBy
    );

    return (
        <div className="overflow-x-auto">
            <table
                {...getTableProps()}
                className="min-w-full border-collapse border border-gray-300 shadow-sm"
            >
                <thead className="bg-gray-100">
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={headerGroup.id}
                        >
                            {headerGroup.headers.map(
                                (
                                    column: Column<Todo> &
                                        UseSortByColumnProps<Todo>
                                ) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        key={column.id}
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer select-none"
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </th>
                                )
                            )}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {rows.map((row: Row<Todo>, i: number) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                key={row.original._id}
                                className={
                                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
                                        className="px-6 py-4 text-sm text-gray-800"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TodoTable;
