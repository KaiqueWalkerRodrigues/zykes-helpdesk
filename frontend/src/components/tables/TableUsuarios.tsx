import { useState, useMemo, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IoIosAddCircle } from "react-icons/io";
import { FaChevronLeft, FaChevronRight, FaTrash, FaPen } from "react-icons/fa";
import Button from "../../components/ui/button/Button";
import { UsuarioCadastrarModal } from "../ui/modal/UsuarioCadastrarModal";
import { UsuarioEditarModal } from "../ui/modal/UsuarioEditarModal";
import { UsuarioDeletarModal } from "../ui/modal/UsuarioDeletarModal";
import API_BASE from "../../config/api";
import { toast } from "react-toastify";
import { ThemedToastContainer } from "../toast/Toast";

interface Usuario {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: number;
  created_at: string;
  updated_at: string;
}

const POLL_MS = 2500;

export default function TableUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const etagRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pollingRef = useRef<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<null | {
    id_usuario: number;
    nome: string;
  }>(null);
  const [deleting, setDeleting] = useState(false);

  const [editTarget, setEditTarget] = useState<null | {
    id_usuario: number;
    nome: string;
    usuario: string;
    ativo: number;
  }>(null);
  const [updating, setUpdating] = useState(false);

  const itemsPerPage = 10;

  const fetchUsuarios = async (opts?: { initial?: boolean }) => {
    try {
      if (opts?.initial) setLoading(true);
      setError(null);
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const headers: HeadersInit = {};
      if (etagRef.current) headers["If-None-Match"] = etagRef.current;

      const res = await fetch(`${API_BASE}/usuarios`, {
        method: "GET",
        headers,
        signal: controller.signal,
        cache: "no-cache",
      });

      if (res.status === 304) return;
      if (!res.ok)
        throw new Error(
          `Erro ${res.status}: não foi possível obter os usuários`
        );

      const newETag = res.headers.get("ETag");
      if (newETag) etagRef.current = newETag;

      const data = (await res.json()) as Usuario[];
      setUsuarios((prev) => {
        if (prev.length === data.length) {
          try {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
          } catch {
            console.log();
          }
        }
        return data;
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "Erro ao carregar usuários"
      );
    } finally {
      if (opts?.initial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios({ initial: true });

    const start = () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      pollingRef.current = window.setInterval(() => {
        if (document.visibilityState === "visible") fetchUsuarios();
      }, POLL_MS);
    };

    const stop = () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };

    start();
    const onVis = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handleCreateUsuario = async (novoUsuario: {
    nome: string;
    usuario: string;
    senha: string;
    ativo: number;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });
      if (!res.ok)
        throw new Error(
          `Erro ${res.status}: não foi possível cadastrar o usuário`
        );
      etagRef.current = null;
      await fetchUsuarios();
      toast.success("Usuário cadastrado com sucesso!");
    } catch (err: unknown) {
      toast.error("Erro ao cadastrar usuário.");
      setError(
        err instanceof Error ? err.message : "Erro ao cadastrar usuário"
      );
    }
  };

  const handleUpdateUsuario = async (payload: {
    id_usuario: number;
    nome: string;
    usuario: string;
    ativo: number;
    senha?: string;
  }) => {
    try {
      setUpdating(true);
      const res = await fetch(`${API_BASE}/usuarios`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const msg = `Erro ${res.status}: não foi possível atualizar o usuário`;
        setError(msg);
        throw new Error(msg);
      }
      etagRef.current = null;
      await fetchUsuarios();
      setEditTarget(null);
      toast.success("Usuário atualizado com sucesso!");
    } catch (err: unknown) {
      toast.error("Erro ao atualizar usuário.");
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar usuário"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUsuario = async (id_usuario: number) => {
    try {
      setDeleting(true);

      const res = await fetch(`${API_BASE}/usuarios?id_usuario=${id_usuario}`, {
        method: "DELETE",
        cache: "no-cache",
      });

      if (!res.ok) {
        const msg = `Erro ${res.status}: não foi possível excluir o usuário`;
        setError(msg);
        throw new Error(msg);
      }

      etagRef.current = null;

      setUsuarios((prev) => prev.filter((u) => u.id_usuario !== id_usuario));

      await fetchUsuarios();
      toast.success("Usuário excluído com sucesso!");
    } catch (err: unknown) {
      toast.error("Erro ao excluir usuário.");
      setError(err instanceof Error ? err.message : "Erro ao excluir usuário");
    } finally {
      setDeleting(false);
    }
  };

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return usuarios.filter(
      (u) =>
        u.nome.toLowerCase().includes(q) || u.usuario.toLowerCase().includes(q)
    );
  }, [search, usuarios]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      <div className="h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 dark:border-white/[0.05]">
          <Button
            size="sm"
            variant="success"
            startIcon={<IoIosAddCircle className="size-5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar
          </Button>
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

        <div className="flex-1 max-w-full overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Carregando usuários...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-error-500">{error}</div>
          ) : filteredData.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <Table className="w-full">
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

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.map((usuario) => (
                  <TableRow key={usuario.id_usuario}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {usuario.nome}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {usuario.usuario}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {usuario.ativo ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="primary"
                          startIcon={<FaPen className="size-3.5" />}
                          onClick={() =>
                            setEditTarget({
                              id_usuario: usuario.id_usuario,
                              nome: usuario.nome,
                              usuario: usuario.usuario,
                              ativo: usuario.ativo,
                            })
                          }
                          disabled={updating}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          startIcon={<FaTrash className="size-3.5" />}
                          onClick={() =>
                            setDeleteTarget({
                              id_usuario: usuario.id_usuario,
                              nome: usuario.nome,
                            })
                          }
                          disabled={deleting}
                        >
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {!loading && filteredData.length > 0 && (
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-medium">{startIndex + 1}</span>{" "}
              até{" "}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, filteredData.length)}
              </span>{" "}
              de <span className="font-medium">{filteredData.length}</span>{" "}
              resultados
            </p>

            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:hover:bg-white/10 disabled:opacity-40"
              >
                <span className="sr-only">Anterior</span>
                <FaChevronLeft aria-hidden="true" className="size-5" />
              </button>

              {getPageNumbers().map((page, idx) =>
                typeof page === "number" ? (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                      page === currentPage
                        ? "z-10 bg-indigo-500 text-white"
                        : "text-gray-600 ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={idx}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-gray-300 dark:ring-gray-700"
                  >
                    ...
                  </span>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:hover:bg-white/10 disabled:opacity-40"
              >
                <span className="sr-only">Próxima</span>
                <FaChevronRight aria-hidden="true" className="size-5" />
              </button>
            </nav>
          </div>
        )}
      </div>

      <UsuarioCadastrarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateUsuario}
      />
      <UsuarioEditarModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        usuario={editTarget ?? undefined}
        onSubmit={handleUpdateUsuario}
      />
      <UsuarioDeletarModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        usuario={deleteTarget ?? undefined}
        onConfirm={handleDeleteUsuario}
      />
      <ThemedToastContainer />
    </>
  );
}
