import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface CrudTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  pageNumber?: number;
  totalPages?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  onCreate?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}


export function CrudTable<T extends { id: string }>({
  title,
  columns,
  data,
  pageNumber = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
  onCreate,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  return (
    <div className="px-6 py-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700 text-center flex-1">{title}</h2>
        {onCreate && (
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={onCreate}
          >
            {/* Chamada como função, passando props vazias */}
            {FaPlus({} as IconBaseProps)} Adicionar
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-100 text-green-800">
            {columns.map((col) => (
              <th key={col.header} className="p-2 text-left border-b">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="p-2 border-b">Opções</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center p-4 text-gray-500">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-green-50">
                {columns.map((col) => (
                  <td key={col.header} className="p-2 border-b">
                    {col.render ? col.render(item[col.accessor], item) : String(item[col.accessor])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="p-2 border-b flex gap-2">
                    {onEdit && (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onEdit(item)}
                      >
                        {FaEdit({} as IconBaseProps)}
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDelete(item)}
                      >
                        {FaTrash({} as IconBaseProps)}
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      { onPageChange && (
        <div className="mt-4 flex justify-between items-center text-gray-700 px-8">
          <span>
            Página {pageNumber} de {totalPages} — Total: {totalRecords} registros
          </span>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 bg-green-200 rounded disabled:opacity-50"
              disabled={pageNumber === 1}
              onClick={() => onPageChange(pageNumber - 1)}
              
            >
              {FaChevronLeft({} as IconBaseProps)}
            </button>
            <button
              className="px-2 py-1 bg-green-200 rounded disabled:opacity-50"
              disabled={pageNumber === totalPages}
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {FaChevronRight({} as IconBaseProps)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
