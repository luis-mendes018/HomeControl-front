export interface UsuarioResponseDto {
    id: string;
    nome: string;
    idade: number;
}



export interface UsuarioCreateDto {
    nome: string;
    idade: number;
}


export interface UsuarioUpdateDto {
    nome?: string;
    idade?: number;
}