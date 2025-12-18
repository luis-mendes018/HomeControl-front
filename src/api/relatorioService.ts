import { TotalPorCategoriaDto } from "../types/TotalPorCategoriaDto";
import { TotalPorUsuarioDto } from "../types/TotalPorUsuarioDto";
import api from "./axiosConfig";



export const relatorioService = {
  obterTotaisPorUsuario: async (): Promise<TotalPorUsuarioDto[]> => {
    const response = await api.get<TotalPorUsuarioDto[]>(
      "/totais/totais-por-usuario"
    );
    return response.data;
  },

  obterTotaisPorCategoria: async (): Promise<TotalPorCategoriaDto[]> => {
    const response = await api.get<TotalPorCategoriaDto[]>(
      "/totais/totais-por-categoria"
    );
    return response.data;
  },

  exportarTotaisPorUsuarioPdf: async () => {
    const response = await api.get(
      "/relatorios/totais-por-usuario",
      { responseType: "blob" }
    );
    return response.data;
  },

  exportarTotaisPorCategoriaPdf: async () => {
    const response = await api.get(
      "/relatorios/totais-por-categoria",
      { responseType: "blob" }
    );
    return response.data;
  }

};