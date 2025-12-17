import { PaginationResult } from "../types/pagination";
import { TransacaoCreateDto, TransacaoResponseDto } from "../types/transacao";
import api from "./axiosConfig";

export const transacaoService = {
    /**
     * Obtém todas as transações paginadas.
     *
     * @param pageNumber Página atual (padrão: 1)
     * @param pageSize Quantidade de registros por página (padrão: 10)
     * @returns Objeto PaginationResult com transações e informações de paginação
     */
    async getAllTransacoes(
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<PaginationResult<TransacaoResponseDto>> {
        const response = await api.get(`/transacoes`, {
            params: { pageNumber, pageSize },
        });

        return {
            items: response.data,
            pageNumber: Number(response.headers['x-pagenumber']),
            pageSize: Number(response.headers['x-pagesize']),
            totalPages: Number(response.headers['x-totalpages']),
            totalRecords: Number(response.headers['x-totalrecords']),
        };
    },

    /**
     * Busca uma transação pelo ID.
     *
     * @param id ID da transação
     * @returns Transação encontrada
     */
    async getTransacaoById(id: string): Promise<TransacaoResponseDto> {
        const response = await api.get(`/transacoes/${id}`);
        return response.data;
    },

    /**
     * Busca transações pelo campo descrição ou código, com paginação.
     *
     * @param filtro Texto de busca
     * @param pageNumber Página atual (padrão: 1)
     * @param pageSize Quantidade de registros por página (padrão: 10)
     * @returns Objeto PaginationResult com transações filtradas
     */
    async buscarTransacoes(
        filtro: string,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<PaginationResult<TransacaoResponseDto>> {
        const response = await api.get(`/transacoes/buscar`, {
            params: { filtro, pageNumber, pageSize },
        });

        return {
            items: response.data,
            pageNumber: Number(response.headers['x-pagenumber']),
            pageSize: Number(response.headers['x-pagesize']),
            totalPages: Number(response.headers['x-totalpages']),
            totalRecords: Number(response.headers['x-totalrecords']),
        };
    },

    /**
     * Cria uma nova transação.
     *
     * @param dto Dados da transação
     * @returns A transação criada
     */
    async criarTransacao(dto: TransacaoCreateDto): Promise<TransacaoResponseDto> {
    const response = await api.post(`/transacoes/nova`, dto);
    return response.data;
  },
}