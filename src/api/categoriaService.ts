import api from './axiosConfig';
import { CategoriaCreateDto, CategoriaUpdateDto, CategoriaResponseDto } from '../types/categoria';
import { PaginationResult } from '../types/pagination';

export const categoriaService = {
  /**
   * Obtém todas as categorias paginadas.
   *
   * @param pageNumber Número da página atual
   * @param pageSize Quantidade de itens por página
   * @returns Resultado paginado contendo categorias e informações de paginação
   * @throws Lança um erro se a requisição falhar
   */
  async getAllCategorias(pageNumber: number, pageSize: number) {
    const response = await api.get("/categorias", {
      params: {
        pageNumber,
        pageSize,
      },
    });

    return {
      items: response.data,
      pageNumber: Number(response.headers["x-pagenumber"]),
      pageSize: Number(response.headers["x-pagesize"]),
      totalPages: Number(response.headers["x-totalpages"]),
      totalRecords: Number(response.headers["x-totalrecords"]),
    };
  },

  /**
   * Obtém uma categoria pelo seu ID.
   *
   * @param id ID da categoria
   * @returns Categoria encontrada
   * @throws Lança um erro se a categoria não existir ou a requisição falhar
   */
  async getCategoriaById(id: string): Promise<CategoriaResponseDto> {
    const response = await api.get<CategoriaResponseDto>(`/categorias/${id}`);
    return response.data;
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
    const response = await api.get<CategoriaResponseDto[]>('/categorias/buscar', {
      params: { descricao, pageNumber, pageSize },
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
   * Cria uma nova categoria.
   *
   * @param dto Objeto `CategoriaCreateDto` com dados da nova categoria
   * @returns A categoria criada (`CategoriaResponseDto`).
   * @throws Erro se a requisição falhar.
   *
   * @example
   * const novaCategoria = await categoriaService.criarCategoria({ descricao: "Bebidas", finalidade: 1 });
   * console.log(novaCategoria.id);
   */
  async criarCategoria(dto: CategoriaCreateDto): Promise<CategoriaResponseDto> {
    const response = await api.post<CategoriaResponseDto>('/categorias/criar', dto);
    return response.data;
  },

  /**
   * Atualiza uma categoria existente.
   *
   * @param id ID da categoria a ser atualizada
   * @param dto Objeto `CategoriaUpdateDto` com os novos dados
   * @returns A categoria atualizada
   * @throws Erro se a requisição falhar
   */
  async atualizarCategoria(id: string, dto: CategoriaUpdateDto): Promise<CategoriaResponseDto> {
    const response = await api.put<CategoriaResponseDto>(`/categorias/atualizar/${id}`, dto);
    return response.data;
  },

};
