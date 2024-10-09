import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider'; // Importando o contexto de autenticação
import "./Navbar.css";

// Função para traduzir erros para mensagens amigáveis

const getFriendlyErrorMessage = (errorCode) => {
  console.log(errorCode)
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Email ou senha inválido.';

    default:
      return 'Ocorreu um erro. Tente novamente.';
  }

};


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Estado para o checkbox "Manter-me conectado"
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtendo o usuário autenticado


  useEffect(() => {
    // Se o usuário já estiver logado, redirecionar para o Dashboard
    if (currentUser) {
      navigate('/Home');
    }
  }, [currentUser, navigate]);






 
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);


    try {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    }


    setLoading(false);
  };


  return (
    <Container className="mt-3 ">
      
     
      <div className='row d-flex justify-content-center '>
      
        <div className="col-12 col-md-6 col-lg-4 p-5 logincont">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2 className='text-center mb-3'>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="loginFormEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="no-outline"
          />
        </Form.Group>


        <Form.Group controlId="loginFormPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="no-outline"
          />
        </Form.Group>


        <Form.Group controlId="rememberMeCheckbox" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Manter-me conectado"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="checkbox"
          />
        </Form.Group>


        <Button variant="primary" type="submit" className="mt-4 but" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
          
        </Button>
      </Form>
      </div>
      </div>
    </Container>
  );
}


export default Login;
