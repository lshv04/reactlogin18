import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider'; // Certifique-se de ajustar o caminho


// Componente que protege as rotas
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); // Verificar se o usuário está autenticado


  return currentUser ? children : <Navigate to="/" />; // Redirecionar para login se não estiver autenticado
}
