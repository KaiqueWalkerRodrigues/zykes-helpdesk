import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  FaChevronUp,
  FaChevronDown,
  FaSort,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SortingIcon = ({ isSorted }) => {
  const iconClasses = "w-4 h-4 ml-1";

  if (isSorted === "asc") {
    return <FaChevronUp className={`${iconClasses} text-blue-500`} />;
  }
  if (isSorted === "desc") {
    return <FaChevronDown className={`${iconClasses} text-blue-500`} />;
  }

  return (
    <FaSort
      className={`${iconClasses} text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity`}
    />
  );
};

export default function Table({ data, columns }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar na tabela..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="group px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer select-none border-r border-gray-200 last:border-r-0 hover:bg-gray-100 transition duration-150"
                  >
                    <div className="flex items-center whitespace-nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <SortingIcon isSorted={header.column.getIsSorted()} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-100 last:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <div className="text-gray-600">
          Página{" "}
          <span className="font-semibold text-gray-800">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-gray-800">
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 border border-gray-300 rounded-full text-gray-600 disabled:opacity-40 hover:bg-gray-100 transition duration-150"
            title="Página Anterior"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 border border-gray-300 rounded-full text-gray-600 disabled:opacity-40 hover:bg-gray-100 transition duration-150"
            title="Próxima Página"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
