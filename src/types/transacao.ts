import { TipoTransacao } from "./TipoTransacao";

export interface TransacaoCreateDto {
    valor: number;
    descricao: string;
    categoriaId: string; 
    tipo: TipoTransacao;
    usuarioId: string;   
}

export interface TransacaoResponseDto extends TransacaoCreateDto {
    id: string;
    dataCriacao: string;
}