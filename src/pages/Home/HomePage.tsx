import { IconBaseProps } from "react-icons";
import { FaHome, FaDollarSign } from "react-icons/fa";

export default function HomePage() {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-screen-md mx-auto px-6 text-center">
        
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Ícone casa */}
          <span className="text-green-600 text-4xl">
            {FaHome({} as IconBaseProps)}
          </span>

          {/* Título */}
          <h1 className="text-4xl font-bold text-green-700">
            Home Control
          </h1>

          {/* Ícone dólar */}
          <span className="text-green-600 text-3xl">
            {FaDollarSign({} as IconBaseProps)}
          </span>
        </div>

        <p className="text-lg text-gray-700">
          Gerencie seus gastos residenciais com mais facilidade!
        </p>
      </div>
    </section>
  );
}
