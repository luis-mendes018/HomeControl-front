import { Header } from './components/shared/Header';
import { CategoriaPage } from './pages/categorias/CategoriaPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { UsuarioPage } from './pages/usuarios/UsuarioPage';

function App() {
  return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriaPage />} />
                <Route path="/usuarios" element={<UsuarioPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
