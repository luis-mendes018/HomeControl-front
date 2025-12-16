import { PaginationResult } from "../types/pagination";
import { TransacaoCreateDto, TransacaoResponseDto } from "../types/transacao";

export const transacaoService = {
    /**
     * Obtém todas as transações paginadas.
     *
     * @param pageNumber Página atual (padrão: 1)
     * @param pageSize Quantidade de registros por página (padrão: 10)
     * @returns Objeto PaginationResult com transações e informações de paginação
     */
    async getAllTransacoes(pageNumber: number = 1, pageSize: number = 10): Promise<PaginationResult<TransacaoResponseDto>> {
        const response = await fetch(`/api/transacoes?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Erro ao obter transações");
        }

        const data = await response.json();

        return {
            items: data,
            pageNumber: Number(response.headers.get("x-pagenumber")),
            pageSize: Number(response.headers.get("x-pagesize")),
            totalPages: Number(response.headers.get("x-totalpages")),
            totalRecords: Number(response.headers.get("x-totalrecords")),
        };
    },

    /**
     * Busca uma transação pelo ID.
     *
     * @param id ID da transação
     * @returns Transação encontrada
     */
    async getTransacaoById(id: string): Promise<TransacaoResponseDto> {
        const response = await fetch(`/api/transacoes/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao obter transação com id ${id}`);
        }

        return await response.json();
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
        const response = await fetch(
            `/api/transacoes/buscar?filtro=${encodeURIComponent(filtro)}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar transações");
        }

        const data = await response.json();

        return {
            items: data,
            pageNumber: Number(response.headers.get("x-pagenumber")),
            pageSize: Number(response.headers.get("x-pagesize")),
            totalPages: Number(response.headers.get("x-totalpages")),
            totalRecords: Number(response.headers.get("x-totalrecords")),
        };
    },

    /**
     * Cria uma nova transação.
     *
     * @param dto Dados da transação
     * @returns A transação criada
     */
    async criarTransacao(dto: TransacaoCreateDto): Promise<TransacaoResponseDto> {
        const response = await fetch(`/api/transacoes/nova`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Erro ao criar transação");
        }

        return await response.json();
    }
}