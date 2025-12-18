import { useEffect, useState } from "react";
import { TotalPorUsuarioDto } from "../../types/TotalPorUsuarioDto";
import { relatorioService } from "../../api/relatorioService";
import { TotalPorCategoriaDto } from "../../types/TotalPorCategoriaDto";
import { TabelaTotaisPorUsuario } from "../../components/TabelaTotaisPorUsuario";
import { TabelaTotaisPorCategoria } from "../../components/TabelaTotaisPorCategoria";

export function RelatorioPage() {
  const [porUsuario, setPorUsuario] = useState<TotalPorUsuarioDto[]>([]);
  const [porCategoria, setPorCategoria] = useState<TotalPorCategoriaDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      relatorioService.obterTotaisPorUsuario(),
      relatorioService.obterTotaisPorCategoria(),
    ])
      .then(([usuarios, categorias]) => {
        setPorUsuario(usuarios);
        setPorCategoria(categorias);
      })
      .catch(err => console.error(err.customMessage))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Carregando relatórios...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 font-semibold text-green-800 text-center text-2xl">
       $ Relatório do Total de Receitas e Despesas $
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TabelaTotaisPorCategoria dados={porCategoria} />
        <TabelaTotaisPorUsuario dados={porUsuario} />
      </div>
    </div>
  );
}
