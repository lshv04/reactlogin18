import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider'; // Importando o contexto de autenticação
import "./Register.css";



// Função para traduzir erros para mensagens amigáveis
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'O formato do e-mail é inválido.';
    case 'auth/email-already-in-use':
      return 'Esse e-mail já está sendo utilizado por outra conta.';
    case 'auth/weak-password':
      return 'A senha deve ter no mínimo 6 caracteres.';
    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
};


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtendo o usuário autenticado


  useEffect(() => {
    // Se o usuário já estiver logado, redirecionar para o Home
    if (currentUser) {
      navigate('/Home');
    }
  }, [currentUser, navigate]);


  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);


    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    }


    setLoading(false);
  };


  return (
    <Container className="mt-3">
      <div className='row d-flex justify-content-center p-3'>
      <div className="col-12 col-md-6 col-lg-4  p-5 logincont">
      <h2 className='text-center'>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="registerFormName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
              className="no-outline"
          />
        </Form.Group>


        <Form.Group controlId="registerFormEmail" className="mt-3">
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


        <Form.Group controlId="registerFormPassword" className="mt-3">
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


        <Button variant="primary" type="submit" className="mt-4 but" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
        </Button>
      </Form>
      </div>
      </div>
    </Container>

  );
}


export default Register;
