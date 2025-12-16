import { FinalidadeCategoria } from "./finalidade";

export interface CategoriaCreateDto {
  descricao: string;
  finalidade: FinalidadeCategoria; 
}

export interface CategoriaUpdateDto {
  descricao: string;
  finalidade: FinalidadeCategoria;
}

export interface CategoriaResponseDto {
  id: string;
  descricao: string;
  finalidade: FinalidadeCategoria;
}
