import React from 'react';
import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthProvider'; // Ajuste o caminho
import Navbar from './components/Navbar'; // Importando a Navbar
import LoginPage from './pages/Login'; // Importando a página Login
import RegisterPage from './pages/Register'; // Importando a página Register
import HomePage from './pages/Home'; // Importando a página Home
import Teste1Page from './pages/Teste1'; // Importando a página Teste1
import Teste2Page from './pages/Teste2'; // Importando a página Teste2
import PrivateRoute from './components/PrivateRoute'; // Importando a rota privada


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar para navegação entre as páginas */}
        <Routes>
          {/* Rota principal para Login */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Rota para o login */}
          <Route path="/register" element={<RegisterPage />} />


          {/* Rota privada para Home */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />


          {/* Rotas privadas para Teste1 e Teste2 */}
          <Route
            path="/teste1"
            element={
              <PrivateRoute>
                <Teste1Page />
              </PrivateRoute>
            }
          />
          <Route
            path="/teste2"
            element={
              <PrivateRoute>
                <Teste2Page />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
