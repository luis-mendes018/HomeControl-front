import { PaginationResult } from "../types/pagination";
import { UsuarioCreateDto, UsuarioResponseDto, UsuarioUpdateDto } from "../types/usuario";

export const UsuarioService = {
    /**
     * Obtém todos os usuários paginados.
     */
    async getAllUsuarios(pageNumber: number, pageSize: number): Promise<PaginationResult<UsuarioResponseDto>> {
        const response = await fetch(`/api/usuarios?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Erro ao obter usuários");
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
     * Obtém um usuário pelo seu ID.
     */
    async getUsuarioById(id: string): Promise<UsuarioResponseDto> {
        const response = await fetch(`/api/usuarios/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao obter usuário com id ${id}`);
        }

        return await response.json();
    },

    /**
     * Busca usuários pelo nome ou email com paginação.
     */
    async buscarUsuarios(
        termo: string,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<PaginationResult<UsuarioResponseDto>> {
        const response = await fetch(
            `/api/usuarios/buscar?termo=${encodeURIComponent(termo)}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
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
     * Cria um novo usuário.
     */
    async criarUsuario(usuario: UsuarioCreateDto): Promise<UsuarioResponseDto> {
        const response = await fetch(`/api/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error("Erro ao criar usuário");
        }

        return await response.json();
    },

    /**
     * Atualiza um usuário existente.
     */
    async atualizarUsuario(id: string, usuario: UsuarioUpdateDto): Promise<UsuarioResponseDto> {
        const response = await fetch(`/api/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário com id ${id}`);
        }

        return await response.json();
    },

    /**
     * Exclui um usuário pelo ID.
     */
    async excluirUsuario(id: string): Promise<void> {
        const response = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ao excluir usuário com id ${id}`);
        }
    }
};