import { Header } from './components/shared/Header';
import { CategoriaPage } from './pages/categorias/CategoriaPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { UsuarioPage } from './pages/usuarios/UsuarioPage';
import { TransacoesPage } from './pages/transacoes/TransacoesPage';
import { RelatorioPage } from './pages/relatorios/RelatorioPage';

function App() {
  return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriaPage />} />
                <Route path="/usuarios" element={<UsuarioPage />} />
                <Route path="/transacoes" element={<TransacoesPage />} />  
                <Route path="/relatorios" element={<RelatorioPage />} />  
            </Routes>
        </Router>
    );
}

export default App;
