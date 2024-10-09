import React from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider'; // Para acessar o estado de autenticação
import Dashboard from './Dashboard';


function Navbar() {
  const { currentUser} = useAuth(); // Obtendo o usuário autenticado e a função logout




  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Mostrar Login e Register apenas se o usuário NÃO estiver logado */}
        {!currentUser && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}


        {/* Sempre mostrar o link para Home */}
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>


        {/* Mostrar links Teste1 e Teste2 apenas se o usuário ESTIVER logado */}
        {currentUser && (
          <>
            <li className="nav-item">
              <Link to="/teste1" className="nav-link">Teste 1</Link>
            </li>
            <li className="nav-item">
              <Link to="/teste2" className="nav-link">Teste 2</Link>
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


