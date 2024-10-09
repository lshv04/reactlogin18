import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Atualiza o usuário atual
      setLoading(false);    // Finaliza o carregamento
    });


    return unsubscribe;
  }, []);


  // Função para logout
  const logout = () => {
    return signOut(auth);
  };


  const value = {
    currentUser,
    logout, // Expondo a função de logout
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


