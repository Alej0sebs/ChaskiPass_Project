import React, { useState } from 'react';

interface PaginationDataTableProps {
  titles: string[];
  rowsPerPage: number;
  children: Array<{ [key: string]: any }>;
}

const PaginationDataTable: React.FC<PaginationDataTableProps> = ({ titles, rowsPerPage, children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalRows = children.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Datos de la página actual
  const currentData = children.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Tabla con Paginación GOD :3</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              {titles.map((title, index) => (
                <th
                  key={index}
                  className="p-2.5 text-sm font-medium text-center uppercase text-gray-700 dark:text-white"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-stroke dark:border-strokedark"
              >
                {titles.map((title, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2.5 text-center text-black dark:text-white"
                  >
                    {row[title] !== undefined ? row[title] : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 dark:text-white">
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginationDataTable;
