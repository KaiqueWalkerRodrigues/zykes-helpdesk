import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IoIosAddCircle } from "react-icons/io";
import Button from "../../components/ui/button/Button";

interface Order {
  usuario: {
    id_usuario: number;
    nome: string;
    usuario: string;
    ativo: number;
    created_at: Date;
    updated_at: Date;
  };
}

const tableData: Order[] = [
  {
    usuario: {
      id_usuario: 1,
      nome: "Pocoyo Silva",
      usuario: "Pocoyo.Silva",
      ativo: 1,
      created_at: new Date("2025-11-06T16:42:31"),
      updated_at: new Date("2025-11-06T16:42:31"),
    },
  },
];

export default function TableUsuarios() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra os dados com base na pesquisa
  const filteredData = useMemo(() => {
    return tableData.filter(
      (item) =>
        item.usuario.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.usuario.usuario.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Barra de pesquisa */}
      <div className="justify-between">
        <Button
          size="sm"
          variant="primary"
          startIcon={<IoIosAddCircle className="size-5" />}
        >
          Cadastrar
        </Button>
      </div>
      <div className="flex items-center justify-end px-5 py-3 border-b border-gray-100 dark:border-white/[0.05]">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full max-w-xs px-3 py-2 text-sm border rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white/90 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Cabeçalho */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-gray-500 text-theme-xs dark:text-gray-400 font-medium"
              >
                Nome
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-gray-500 text-theme-xs dark:text-gray-400 font-medium"
              >
                Usuário
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-gray-500 text-theme-xs dark:text-gray-400 font-medium"
              >
                Ativo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-gray-500 text-theme-xs dark:text-gray-400 font-medium"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Corpo */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData.map((order) => (
              <TableRow key={order.usuario.id_usuario}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.usuario.nome}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.usuario.usuario}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">{order.usuario.ativo}</div>
                </TableCell>

                {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/[0.05] text-sm text-gray-600 dark:text-gray-400">
        <span>
          Página {currentPage} de {totalPages || 1}
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Anterior
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
