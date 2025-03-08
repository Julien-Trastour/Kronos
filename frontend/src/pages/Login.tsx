import React from 'react';
import '../styles/login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mot de passe" required />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
