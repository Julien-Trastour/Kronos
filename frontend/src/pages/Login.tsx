import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../config/api/auth';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Stocke le rôle de l'utilisateur

        if (response.role === 'PDG' || response.role === 'Administrateur') {
          navigate('/dashboard'); // Redirige vers le Dashboard si le rôle est autorisé
        } else {
          setError("Accès refusé. Vous n'avez pas la permission.");
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      }
    } catch (err) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
