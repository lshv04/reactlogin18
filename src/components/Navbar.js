import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider'; // Para acessar o estado de autenticação
import Dashboard from './Dashboard';

function Navbar() {
  const { currentUser } = useAuth(); // Obtendo o usuário autenticado

  return (
    <nav className="navbar d-flex justify-content-center">
      <ul className="nav-list d-flex justify-content-center align-items-center gap-3">
        {/* Mostrar Login e Register apenas se o usuário NÃO estiver logado */}
        {!currentUser && (
          <>
            <li className="nav-item">
              <NavLink 
                to="/login"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/register"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}

        {/* Sempre mostrar o link para Home */}
        <li className="nav-item">
          <NavLink 
            to="/home"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>
        </li>

        {/* Mostrar links Teste1 e Teste2 apenas se o usuário ESTIVER logado */}
        {currentUser && (
          <>
            <li className="nav-item">
              <NavLink 
                to="/teste1"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Teste 1
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/teste2"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Teste 2
              </NavLink>
            </li>

            {/* Botão de logout */}
            <li className="nav-item">
              <Dashboard/>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
