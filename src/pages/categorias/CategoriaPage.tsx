import { useEffect, useState } from "react";
import { CategoriaResponseDto } from "../../types/categoria";
import { categoriaService } from "../../api/categoriaService";
import { Column, CrudTable } from "../../components/shared/CrudTable";
import { FinalidadeCategoriaLabel } from "../../utils/finalidadeCategoriaLabel";
import { FinalidadeCategoria } from "../../types/finalidade";

export function CategoriaPage() {
  const [categorias, setCategorias] = useState<CategoriaResponseDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const loadCategorias = async (page: number = 1) => {
    const result = await categoriaService.getAllCategorias(page, 5);

    console.log(result);
    

    setCategorias(result.items);
    setPageNumber(result.pageNumber);
    setTotalPages(result.totalPages);
    setTotalRecords(result.totalRecords);
  };

  useEffect(() => {
    loadCategorias(pageNumber);
  }, [pageNumber]);

  const columns: Column<CategoriaResponseDto>[] = [
  { header: "Descrição", accessor: "descricao" },
  { header: "Finalidade", accessor: "finalidade", render: (value) =>
      FinalidadeCategoriaLabel[value as FinalidadeCategoria], },
];

  return (
    <CrudTable
      title="Categorias"
      columns={columns}
      data={categorias}
      pageNumber={pageNumber}
      totalPages={totalPages}
      totalRecords={totalRecords}
      onPageChange={(page) => setPageNumber(page)}
      onCreate={() => console.log("Criar categoria")}
      onEdit={(item) => console.log("Editar", item)}
    />
  );
}
