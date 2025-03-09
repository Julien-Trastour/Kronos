import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots, faSignOutAlt, faUsers, faUserShield, faBuilding, faUsersRectangle, faSliders, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../config/api/auth';
import { jwtDecode } from "jwt-decode";
import '../styles/dashboard.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { userId: string; role: string } = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await logout(token);
      localStorage.removeItem('token');
      navigate('/login');
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
                <FontAwesomeIcon icon={faChartLine} className="icon" /> Tableau de Bord
              </NavLink>
            </li>
            <li>
              <NavLink to="/employees" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faUsers} className="icon" /> Employés
              </NavLink>
            </li>
            <li>
              <NavLink to="/roles" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faUserShield} className="icon" /> Rôles
              </NavLink>
            </li>
            <li>
              <NavLink to="/agencies" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faBuilding} className="icon" /> Agences
              </NavLink>
            </li>
            <li>
              <NavLink to="/teams" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faUsersRectangle} className="icon" /> Équipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                <FontAwesomeIcon icon={faSliders} className="icon" /> Paramètres
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
            {/* 🔹 Avatar dynamique */}
            <img 
              src={userId ? `http://localhost:5000/avatars/${userId}.png` : "/avatars/default.png"} 
              alt="User Avatar" 
              className="avatar" 
              onError={(e) => (e.currentTarget.src = "/avatars/default.png")} 
            />
            <span className="user-name">{userName || "Utilisateur"}</span>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon logout-icon" onClick={handleLogout} />
          </div>
        </header>

        {/* Page Content */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
