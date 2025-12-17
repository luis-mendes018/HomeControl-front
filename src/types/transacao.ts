import { CategoriaResponseDto } from "./categoria";
import { TipoTransacao } from "./TipoTransacao";
import { UsuarioResponseDto } from "./usuario";

export interface TransacaoCreateDto {
    valor: number;
    descricao: string;
    categoriaId: string; 
    tipo: TipoTransacao;
    usuarioId: string;   
}

export interface TransacaoResponseDto extends TransacaoCreateDto {
    id: string;
    codigoTransacao: number;
    categoria: CategoriaResponseDto;
    usuario: UsuarioResponseDto;
    dataCriacaoDto: string;
}