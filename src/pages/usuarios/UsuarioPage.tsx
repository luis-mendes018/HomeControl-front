import { useEffect, useState } from "react";
import {
  UsuarioCreateDto,
  UsuarioResponseDto,
  UsuarioUpdateDto,
} from "../../types/usuario";
import FormModal, { Field } from "../../components/shared/FormModal";
import { usuarioService } from "../../api/usuarioService";
import { Column, CrudTable } from "../../components/shared/CrudTable";
import InfoModal from "../../components/shared/InfoModal";

export function UsuarioPage() {
  const [usuarios, setUsuarios] = useState<UsuarioResponseDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] =
    useState<UsuarioResponseDto | null>(null);

  const [editingUsuario, setEditingUsuario] =
    useState<UsuarioResponseDto | null>(null);
  const [nomeFiltro, setNomeFiltro] = useState("");

  // Campos do formulário
  const usuarioFields: Field[] = [
    {
      name: "nome",
      label: "Nome",
      type: "text",
      required: true,
      maxLength: 100,
    },
    { name: "idade", label: "Idade", type: "number", required: true },
  ];

  // Função para carregar usuários (com filtro e paginação)
  const loadUsuarios = async (page: number = 1, nome: string = "") => {
    try {
      let result;
      if (nome && nome.length >= 3) {
        result = await usuarioService.buscarUsuarios(nome, page, 5);
      } else {
        result = await usuarioService.getAllUsuarios(page, 5);
      }

      setUsuarios(result.items);
      setPageNumber(result.pageNumber);
      setTotalPages(result.totalPages);
      setTotalRecords(result.totalRecords);
    } catch (error: any) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nomeFiltro.length >= 3 || nomeFiltro.length === 0) {
        loadUsuarios(1, nomeFiltro);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [nomeFiltro]);

  useEffect(() => {
    loadUsuarios(pageNumber, nomeFiltro);
  }, [pageNumber, nomeFiltro]);

  // Criação ou atualização de usuário
  const handleSubmitUsuario = async (data: Record<string, any>) => {
    try {
      if (editingUsuario) {
        // Edição
        const dto: UsuarioUpdateDto = {
          nome: data.nome,
          idade: Number(data.idade),
        };
        await usuarioService.atualizarUsuario(editingUsuario.id, dto);
        setSuccessMessage("Usuário atualizado com sucesso!");
      } else {
        // Criação
        const dto: UsuarioCreateDto = {
          nome: data.nome,
          idade: Number(data.idade),
        };
        await usuarioService.criarUsuario(dto);
        setSuccessMessage("Usuário criado com sucesso!");
      }

      setModalOpen(false);
      setSuccessModalOpen(true);
      setEditingUsuario(null);
      loadUsuarios(pageNumber, nomeFiltro);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Erro ao salvar usuário."
      );
      setErrorModalOpen(true);
    }
  };

  const handleDeleteUsuario = async () => {
    if (!usuarioToDelete) return;

    try {
      await usuarioService.excluirUsuario(usuarioToDelete.id);
      setSuccessMessage("Usuário deletado com sucesso!");
      setSuccessModalOpen(true);
      setConfirmDeleteOpen(false);
      setUsuarioToDelete(null);
      loadUsuarios(pageNumber, nomeFiltro);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Erro ao deletar usuário."
      );
      setErrorModalOpen(true);
      setConfirmDeleteOpen(false);
      setUsuarioToDelete(null);
    }
  };

  // Colunas da tabela
  const columns: Column<UsuarioResponseDto>[] = [
    { header: "Nome", accessor: "nome" },
    { header: "Idade", accessor: "idade" },
  ];

  return (
    <>
      <div className="flex justify-start mt-6 mb-6 ml-6">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-1/3 border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
        />
      </div>

      <CrudTable
        title="Usuários"
        columns={columns}
        data={usuarios}
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={(page) => setPageNumber(page)}
        onCreate={() => setModalOpen(true)}
        onEdit={(item) => {
          setEditingUsuario(item);
          setModalOpen(true);
        }}
        onDelete={(item) => {
          setUsuarioToDelete(item);
          setConfirmDeleteOpen(true);
        }}
      />

      <FormModal
        fields={usuarioFields}
        title={editingUsuario ? "Editar Usuário" : "Criar Usuário"}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingUsuario(null);
        }}
        onSubmit={handleSubmitUsuario}
        defaultValues={
          editingUsuario
            ? { nome: editingUsuario.nome, idade: editingUsuario.idade }
            : undefined
        }
      />

      <InfoModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={successMessage}
      />

      <InfoModal
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        title="Confirmação"
        message={`Tem certeza que deseja deletar o usuário "${usuarioToDelete?.nome}"? Todas as transações dele também serão removidas.`}
      >
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setConfirmDeleteOpen(false)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteUsuario}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      </InfoModal>

      <InfoModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Erro"
        message={errorMessage}
      />
    </>
  );
}
