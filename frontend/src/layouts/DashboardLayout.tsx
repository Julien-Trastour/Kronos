import React, { ReactNode } from 'react';
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
