import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../firebase/AuthProvider'; // Para acessar o usuário atual


function Home() {
  const { currentUser } = useAuth(); // Obter o usuário autenticado


  return (
    <Container className="mt-5">
      <h2>Bem-vindo à Home</h2>
      {currentUser ? (
        <p>Você está logado como: {currentUser.email}</p>
      ) : (
        <p>Nenhum usuário logado.</p>
      )}
    </Container>
  );
}


export default Home;
