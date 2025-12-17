import { Header } from './components/shared/Header';
import { CategoriaPage } from './pages/categorias/CategoriaPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriaPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
