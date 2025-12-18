export interface TotalPorUsuarioDto {
  usuarioId?: string;   // ausente no "Total Geral"
  nome: string;
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}
