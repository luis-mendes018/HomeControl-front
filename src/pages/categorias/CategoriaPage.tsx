import { useEffect, useState } from "react";
import {
  CategoriaCreateDto,
  CategoriaResponseDto,
} from "../../types/categoria";
import { categoriaService } from "../../api/categoriaService";
import { Column, CrudTable } from "../../components/shared/CrudTable";
import { FinalidadeCategoriaLabel } from "../../utils/finalidadeCategoriaLabel";
import { FinalidadeCategoria } from "../../types/finalidade";
import FormModal, { Field } from "../../components/shared/FormModal";
import InfoModal from "../../components/shared/InfoModal";

export function CategoriaPage() {
  const [categorias, setCategorias] = useState<CategoriaResponseDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingCategoria, setEditingCategoria] =
    useState<CategoriaResponseDto | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [descricaoFiltro, setDescricaoFiltro] = useState("");

  // Campos do FormModal
  const categoriaFields: Field[] = [
    {
      name: "descricao",
      label: "Descrição",
      type: "text",
      required: true,
      maxLength: 200,
    },
    {
      name: "finalidade",
      label: "Finalidade",
      type: "select",
      options: [
        { value: 1, label: "Despesa" },
        { value: 2, label: "Receita" },
      ],
      required: true,
    },
  ];

  const categoriaEditFields: Field[] = [
    {
      name: "descricao",
      label: "Descrição",
      type: "text",
      required: true,
      maxLength: 200,
    },
  ];

  async function handleUpdateCategoria(data: Record<string, any>) {
    if (!editingCategoria) return;

    try {
      const dto: CategoriaCreateDto = {
        descricao: data.descricao,
        finalidade: editingCategoria.finalidade,
      };

      await categoriaService.atualizarCategoria(editingCategoria.id, dto);

      setModalOpen(false);
      setSuccessMessage("Categoria editada com sucesso!");
      setSuccessModalOpen(true);
      setEditingCategoria(null);

      loadCategorias();
    } catch (error: any) {
      console.error("Erro ao atualizar categoria", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Ocorreu um erro ao atualizar a categoria."
      );
      setErrorModalOpen(true);
    }
  }

  
  const loadCategorias = async (page: number = 1, descricao: string = "") => {
    try {
      let result;

      if (descricao && descricao.length >= 3) {
        
        result = await categoriaService.buscarCategorias(descricao, page, 5);
      } else {
        
        result = await categoriaService.getAllCategorias(page, 5);
      }

      setCategorias(result.items);
      setPageNumber(result.pageNumber);
      setTotalPages(result.totalPages);
      setTotalRecords(result.totalRecords);
    } catch (error: any) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (descricaoFiltro.length >= 3 || descricaoFiltro.length === 0) {
        loadCategorias(1, descricaoFiltro); // página 1
      }
    }, 300); // debounce

    return () => clearTimeout(timer); // limpa timeout se digitar rápido
  }, [descricaoFiltro]);

  useEffect(() => {
    loadCategorias(pageNumber);
  }, [pageNumber]);

  // Colunas do CrudTable
  const columns: Column<CategoriaResponseDto>[] = [
    { header: "Descrição", accessor: "descricao" },
    {
      header: "Finalidade",
      accessor: "finalidade",
      render: (value) => FinalidadeCategoriaLabel[value as FinalidadeCategoria],
    },
  ];

  // Criação de categoria
  async function handleCreateCategoria(data: Record<string, any>) {
    try {
      const dto: CategoriaCreateDto = {
        descricao: data.descricao,
        finalidade: Number(data.finalidade),
      };

      await categoriaService.criarCategoria(dto);

      setModalOpen(false);
      setSuccessMessage("Categoria criada com sucesso!");
      setSuccessModalOpen(true);

      loadCategorias();
    } catch (error: any) {
      console.error("Erro ao criar categoria", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Ocorreu um erro ao criar a categoria."
      );
      setErrorModalOpen(true);
    }
  }

  return (
    <>
      <div className="flex justify-start mt-6 mb-6 ml-6">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-1/3 border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={descricaoFiltro}
          onChange={(e) => setDescricaoFiltro(e.target.value)}
        />
      </div>

      <CrudTable
        title="Categorias"
        columns={columns}
        data={categorias}
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={(page) => setPageNumber(page)}
        onCreate={() => setModalOpen(true)}
        onEdit={(item) => {
          setEditingCategoria(item);
          setModalOpen(true);
        }}
      />

      <FormModal
        title={editingCategoria ? "Editar Categoria" : "Nova Categoria"}
        isOpen={modalOpen}
        fields={editingCategoria ? categoriaEditFields : categoriaFields}
        onClose={() => {
          setModalOpen(false);
          setEditingCategoria(null);
        }}
        onSubmit={
          editingCategoria ? handleUpdateCategoria : handleCreateCategoria
        }
        defaultValues={
          editingCategoria
            ? { descricao: editingCategoria.descricao }
            : undefined
        }
      />

      <InfoModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={successMessage}
      />

      <InfoModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Erro"
        message={errorMessage}
      />
    </>
  );
}
