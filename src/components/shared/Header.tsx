import { Link } from "react-router-dom";
import { FaHome, FaDollarSign } from "react-icons/fa";
import type { IconBaseProps } from "react-icons";

export function Header() {
  return (
    <header className="bg-green-700 text-white px-8 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo / Ícone */}
        <div className="flex items-center gap-2 text-xl font-bold">
          {FaHome({} as IconBaseProps)}
          <span>Home Control</span>
          {FaDollarSign({} as IconBaseProps)}
        </div>

        {/* Nav links */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-200">
            Início
          </Link>
          <Link to="/categorias" className="hover:text-green-200">
            Categorias
          </Link>
          <Link to="/transacoes" className="hover:text-green-200">
            Transações
          </Link>
          <Link to="/relatorios" className="hover:text-green-200">
            Relatórios
          </Link>
        </nav>
      </div>
    </header>
  );
}
