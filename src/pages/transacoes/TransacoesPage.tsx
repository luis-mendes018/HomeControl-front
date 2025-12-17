import { useEffect, useState } from "react";
import FormModal, { Field } from "../../components/shared/FormModal";
import { transacaoService } from "../../api/transacaoService";
import {
  TransacaoCreateDto,
  TransacaoResponseDto,
} from "../../types/transacao";
import { Column, CrudTable } from "../../components/shared/CrudTable";
import InfoModal from "../../components/shared/InfoModal";
import { TipoTransacaoLabel } from "../../utils/TipoTransacaoLabel";
import { TipoTransacao } from "../../types/TipoTransacao";
import { CategoriaResponseDto } from "../../types/categoria";
import { categoriaService } from "../../api/categoriaService";
import { usuarioService } from "../../api/usuarioService";
import { UsuarioResponseDto } from "../../types/usuario";

export function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<TransacaoResponseDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [nomeFiltro, setNomeFiltro] = useState("");

  const [categorias, setCategorias] = useState<CategoriaResponseDto[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioResponseDto[]>([]);

  // Campos do formulário para criar transação
  const transacaoFields: Field[] = [
    { name: "valor", label: "Valor", type: "number", required: true },
    { name: "descricao", label: "Descrição", type: "text", required: true },
    {
      name: "categoriaId",
      label: "Categoria",
      type: "select",
      required: true,
      options: categorias.map((c) => ({ value: c.id, label: c.descricao })),
    },
    {
      name: "tipo",
      label: "Tipo",
      type: "select",
      required: true,
      options: [
        { value: 1, label: "Despesa" },
        { value: 2, label: "Receita" },
      ],
    },
    {
      name: "usuarioId",
      label: "Usuário",
      type: "select",
      required: true,
      options: usuarios.map((u) => ({ value: u.id, label: u.nome })),
    },
  ];

  const loadTransacoes = async (page: number = 1, filtro: string = "") => {
    try {
      let result;
      if (filtro && filtro.length >= 3) {
        result = await transacaoService.buscarTransacoes(filtro, page, 5);
      } else {
        result = await transacaoService.getAllTransacoes(page, 5);
      }

      setTransacoes(result.items);
      setPageNumber(result.pageNumber);
      setTotalPages(result.totalPages);
      setTotalRecords(result.totalRecords);
    } catch (error: any) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nomeFiltro.length >= 3 || nomeFiltro.length === 0) {
        loadTransacoes(1, nomeFiltro);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [nomeFiltro]);

  useEffect(() => {
    loadTransacoes(pageNumber, nomeFiltro);
  }, [pageNumber, nomeFiltro]);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const result = await categoriaService.getAllCategorias(1, 1000);
        setCategorias(result.items);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    loadCategorias();
  }, []);

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const result = await usuarioService.getAllUsuarios(1, 1000);
        setUsuarios(result.items);
      } catch (error) {
        console.error("Erro ao carregar usuarios:", error);
      }
    };

    loadUsuarios();
  }, []);

  const handleSubmitTransacao = async (data: Record<string, any>) => {
    try {
      const dto: TransacaoCreateDto = {
        valor: Number(data.valor),
        descricao: data.descricao,
        categoriaId: data.categoriaId,
        tipo: Number(data.tipo) as TipoTransacao,
        usuarioId: data.usuarioId,
      };

      const transacaoCriada = await transacaoService.criarTransacao(dto);
      setSuccessMessage(
        `Transação com n° ${transacaoCriada.codigoTransacao} criada com sucesso!`
      );
      setSuccessModalOpen(true);
      setModalOpen(false);
      loadTransacoes(pageNumber, nomeFiltro);
    } catch (error: any) {
      setErrorMessage(error.customMessage);
      setErrorModalOpen(true);
    }
  };

  // Colunas da tabela de transações
  const columns: Column<TransacaoResponseDto>[] = [
    { header: "ID", accessor: "codigoTransacao" },
    { header: "Descrição", accessor: "descricao" },
    {
      header: "Valor",
      accessor: "valor",
      render: (value) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value as number),
    },
    {
      header: "Data",
      accessor: "dataCriacaoDto",
    },
    {
      header: "Tipo",
      accessor: "tipo",
      render: (value) => TipoTransacaoLabel[value as TipoTransacao],
    },
    {
      header: "Categoria",
      accessor: "categoria",
      render: (_, item) => item.categoria.descricao,
    },
    {
      header: "Usuário",
      accessor: "usuario",
      render: (_, item) => item.usuario.nome,
    },
  ];

  return (
    <>
      <div className="flex justify-start mt-6 mb-6 ml-6">
        <input
          type="text"
          placeholder="Pesquisar por descrição ou código"
          className="w-1/3 border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
        />
      </div>

      <CrudTable
        title="$ Transações $"
        columns={columns}
        data={transacoes}
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={(page) => setPageNumber(page)}
        onCreate={() => setModalOpen(true)}
      />

      <FormModal
        fields={transacaoFields}
        title="Nova Transação"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitTransacao}
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
