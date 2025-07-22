import { useMemo } from "react";
import { useTable, Column } from "react-table";
import { Event } from "@/types/eventType";

const EventTable = ({ events }: { events: Event[] }) => {
    const columns: Column<Event>[] = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Location",
                accessor: "location",
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
        ],
        []
    );

    const data = useMemo(() => events, [events]); // memoize data too

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<Event>({ columns, data });

    return (
        <table
            {...getTableProps()}
            className="min-w-full border border-gray-300"
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className="px-4 py-2 border text-left bg-gray-100"
                                key={column.id}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            key={row.id}
                            className="hover:bg-gray-50"
                        >
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    className="px-4 py-2 border"
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
