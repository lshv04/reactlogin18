import React from 'react';
import { useAuth } from '../firebase/AuthProvider'; // Certifique-se de ajustar o caminho
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout(); // Chamando a função logout
      navigate('/'); // Redirecionar para a página de login após o logout
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };


  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.email}</p>
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </Container>
  );
}


export default Dashboard;


