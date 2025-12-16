import { CategoriaResponseDto } from "../types/categoria";
import { PaginationResult } from "../types/pagination";

export const categoriaService = {
    /**
 * Obtém todas as categorias paginadas.
 *
 * @param pageNumber Número da página atual
 * @param pageSize Quantidade de itens por página
 * @returns Resultado paginado contendo categorias e informações de paginação
 * @throws Lança um erro se a requisição falhar
 */
    async getAllCategorias(pageNumber: number, pageSize: number): Promise<PaginationResult<CategoriaResponseDto>> {
        const response = await fetch(`/api/categorias?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Erro ao obter categorias");
        }

        const data = await response.json();

        const paginatedResult: PaginationResult<CategoriaResponseDto> = {
            items: data,
            pageNumber: Number(response.headers.get("x-pagenumber")),
            pageSize: Number(response.headers.get("x-pagesize")),
            totalPages: Number(response.headers.get("x-totalpages")),
            totalRecords: Number(response.headers.get("x-totalrecords")),
        };

        return paginatedResult;
    },

    /**
     * Obtém uma categoria pelo seu ID.
     *
     * @param id ID da categoria
     * @returns Categoria encontrada
     * @throws Lança um erro se a categoria não existir ou a requisição falhar
     */
    async getCategoriaById(id: string): Promise<CategoriaResponseDto> {
        const response = await fetch(`/api/categorias/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao obter categoria com id ${id}`);
        }

        const categoria: CategoriaResponseDto = await response.json();
        return categoria;
    },


    /**
 * Busca categorias pelo campo `descricao` com paginação.
 *
 * @param descricao Texto a ser buscado na descrição da categoria.
 * @param pageNumber Página atual (padrão: 1).
 * @param pageSize Quantidade de itens por página (padrão: 10).
 * @returns Objeto `PaginationResult<CategoriaResponseDto>` com categorias e informações de paginação.
 * @throws Erro se a requisição falhar.
 *
 * @example
 * const resultado = await categoriaService.buscarCategorias("bebidas", 1, 10);
 * console.log(resultado.items);
 */

    async buscarCategorias(
        descricao: string,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<PaginationResult<CategoriaResponseDto>> {
        const response = await fetch(
            `/api/categorias/buscar?descricao=${encodeURIComponent(descricao)}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();

        const paginatedResult: PaginationResult<CategoriaResponseDto> = {
            items: data,
            pageNumber: Number(response.headers.get("x-pagenumber")),
            pageSize: Number(response.headers.get("x-pagesize")),
            totalPages: Number(response.headers.get("x-totalpages")),
            totalRecords: Number(response.headers.get("x-totalrecords")),
        };

        return paginatedResult;
    },


     /**
     * Cria uma nova categoria.
     *
     * @param descricao Descrição da categoria a ser criada.
     * @returns A categoria criada (`CategoriaResponseDto`).
     * @throws Erro se a requisição falhar.
     *
     * @example
     * const novaCategoria = await categoriaService.criarCategoria("Bebidas");
     * console.log(novaCategoria.id);
     */
    async criarCategoria(descricao: string): Promise<CategoriaResponseDto> {
        const response = await fetch(`/api/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ descricao }),
        });

        if (!response.ok) {
            throw new Error("Erro ao criar categoria");
        }

        const categoriaCriada: CategoriaResponseDto = await response.json();
        return categoriaCriada;
    },


    /**
     * Atualiza uma categoria existente.
     *
     * @param id ID da categoria a ser atualizada
     * @param descricao Nova descrição da categoria
     * @returns A categoria atualizada
     * @throws Erro se a requisição falhar
     */
    async atualizarCategoria(id: string, descricao: string): Promise<CategoriaResponseDto> {
        const response = await fetch(`/api/categorias/atualizar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar categoria com id ${id}`);
        }

        return await response.json();
    },

    /**
     * Exclui uma categoria pelo ID.
     *
     * @param id ID da categoria a ser excluída
     * @throws Erro se a requisição falhar
     */
    async excluirCategoria(id: string): Promise<void> {
        const response = await fetch(`/api/categorias/excluir/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ao excluir categoria com id ${id}`);
        }
    }

}