import { relatorioService } from "../api/relatorioService";
import { TotalPorCategoriaDto } from "../types/TotalPorCategoriaDto";
import { downloadPdf } from "../utils/downloadPdf";

export function TabelaTotaisPorCategoria({
  dados,
}: {
  dados: TotalPorCategoriaDto[];
}) {
  const handleExportarPdf = async () => {
    const blob = await relatorioService.exportarTotaisPorCategoriaPdf();
    downloadPdf(blob, "relatorio-totais-por-categoria.pdf");
  };
  return (
    <div className="mt-4 px-4">
      <h2 className="mb-2 text-sm font-semibold text-gray-700">
        Totais por Categoria
      </h2>

      <button
        onClick={handleExportarPdf}
        className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
      >
        Exportar PDF
      </button>

      <div className="overflow-x-auto rounded-md border border-gray-200 max-w-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600">
                Categoria
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">
                Receita
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">
                Despesa
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">
                Saldo
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {dados.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-3 text-center text-xs text-gray-500"
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            )}

            {dados.map((item, index) => {
              const isTotalGeral = item.nome === "Total Geral";

              return (
                <tr
                  key={item.categoriaId ?? `total-${index}`}
                  className={
                    isTotalGeral
                      ? "bg-gray-100 font-semibold"
                      : "hover:bg-gray-50"
                  }
                >
                  <td className="px-3 py-2 text-gray-700">{item.nome}</td>

                  <td className="px-3 py-2 text-right text-gray-700">
                    {item.totalReceita.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-3 py-2 text-right text-gray-700">
                    {item.totalDespesa.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td
                    className={`px-3 py-2 text-right font-medium ${
                      item.saldo > 0
                        ? "text-green-600"
                        : item.saldo < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {item.saldo.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
