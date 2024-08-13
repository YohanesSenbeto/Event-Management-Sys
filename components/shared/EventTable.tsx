"use client";
import React from "react";
import { useTable } from "react-table";
interface Event {
    id: string;
    title: string;
    date: string;
}

interface EventTableProps {
    events: Event[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Date",
                accessor: "date",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data: events,
        });

    return (
        <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
        >
            <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                key={column.id}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
            >
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    key={cell.column.id}
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

export default EventTable;
