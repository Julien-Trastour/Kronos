import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/dashboard.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
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
                Employés
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                Paramètres
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
            <span className="user-name">Julien Trastour</span>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon logout-icon" />
          </div>
        </header>

        {/* Page Content */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
