import { PaginationResult } from "../types/pagination";
import { UsuarioCreateDto, UsuarioResponseDto, UsuarioUpdateDto } from "../types/usuario";
import api from "./axiosConfig";

export const usuarioService = {
  /**
   * Obtém todos os usuários paginados.
   */
  async getAllUsuarios(pageNumber: number, pageSize: number): Promise<PaginationResult<UsuarioResponseDto>> {
    const response = await api.get<UsuarioResponseDto[]>("/usuarios", {
      params: { pageNumber, pageSize },
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
   * Obtém um usuário pelo seu ID.
   */
  async getUsuarioById(id: string): Promise<UsuarioResponseDto> {
    const response = await api.get<UsuarioResponseDto>(`/usuarios/${id}`);
    return response.data;
  },

  /**
   * Busca usuários pelo nome com paginação.
   */
  async buscarUsuarios(nome: string, pageNumber: number = 1, pageSize: number = 10): Promise<PaginationResult<UsuarioResponseDto>> {
    const response = await api.get<UsuarioResponseDto[]>("/usuarios/buscar", {
      params: { nome, pageNumber, pageSize },
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
   * Cria um novo usuário.
   */
  async criarUsuario(usuario: UsuarioCreateDto): Promise<UsuarioResponseDto> {
    const response = await api.post<UsuarioResponseDto>("/usuarios/cadastrar", usuario);
    return response.data;
  },

  /**
   * Atualiza um usuário existente.
   */
  async atualizarUsuario(id: string, usuario: UsuarioUpdateDto): Promise<UsuarioResponseDto> {
    const response = await api.put<UsuarioResponseDto>(`/usuarios/atualizar/${id}`, usuario);
    return response.data;
  },

  /**
   * Exclui um usuário pelo ID.
   */
  async excluirUsuario(id: string): Promise<void> {
  await api.delete(`/usuarios/excluir/${id}`);
  },
};