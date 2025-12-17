import { TipoTransacao } from "../types/TipoTransacao";

export const TipoTransacaoLabel: Record<TipoTransacao, string> = {
    [TipoTransacao.Receita]: "Receita",
    [TipoTransacao.Despesa]: "Despesa",
};