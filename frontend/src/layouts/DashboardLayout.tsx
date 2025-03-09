import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots, faSignOutAlt, faUsers, faUsersCog, faBuilding, faCogs } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../config/api/auth';
import { jwtDecode } from "jwt-decode";
import '../styles/dashboard.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  // 🔹 Récupérer l'utilisateur à partir du token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { userId: string; role: string } = jwtDecode(token);
        setUserName(decoded.role); // ⚡ Modifier si besoin (role ou autre champ)
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  // 🔹 Déconnexion
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await logout(token); // ⚡ Appel API pour la déconnexion
      localStorage.removeItem('token'); // ⚡ Suppression du token
      navigate('/login'); // ⚡ Redirection vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">KRONOS</div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                Tableau de Bord
              </NavLink>
            </li>
            <li>
              <NavLink to="/employees" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faUsers} className="icon" /> Employés
              </NavLink>
            </li>
            <li>
              <NavLink to="/roles" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faUsersCog} className="icon" /> Rôles
              </NavLink>
            </li>
            <li>
              <NavLink to="/agencies" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faBuilding} className="icon" /> Agences
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faCogs} className="icon" /> Paramètres
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <FontAwesomeIcon icon={faCommentDots} className="icon" />
          </div>
          <div className="topbar-right">
            <img src="/avatar.png" alt="User Avatar" className="avatar" />
            <span className="user-name">{userName || "Utilisateur"}</span> {/* ⚡ Dynamisé */}
            <FontAwesomeIcon icon={faSignOutAlt} className="icon logout-icon" onClick={handleLogout} /> {/* ⚡ Déconnexion */}
          </div>
        </header>

        {/* Page Content */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
