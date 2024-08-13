//todo table
"use client";

import React from "react";
import { useTable, useSortBy, useFilters } from "react-table";

interface TodoTableProps {
    data: {
        _id: string;
        title: string;
        isCompleted: boolean;
        updatedAt: Date;
        createdAt: Date;
    }[];
}

const columns = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Title",
        accessor: "title",
    },
    {
        Header: "Completed",
        accessor: "isCompleted",
        Cell: ({ value }: { value: boolean }) => (value ? "Yes" : "No"),
    },
    {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }: { value: Date }) => value.toLocaleString(),
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }: { value: Date }) => value.toLocaleString(),
    },
];

const TodoTable: React.FC<TodoTableProps> = ({ data }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table
            {...getTableProps()}
            className="table w-full border-collapse border border-slate-400"
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.id}
                        className="bg-slate-200"
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                key={column.id}
                                className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            key={row.original._id}
                            className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    key={cell.column.id} // This line is already correct
                                    className="px-4 py-2 text-sm leading-5 text-gray-500"
                                >
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TodoTable;
