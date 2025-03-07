import { useState } from "react";
import { Link } from "react-router-dom";

function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
                <div className="sidebar-header">
                    {isSidebarOpen && <h1 className="logo">KRONOS</h1>}
                    <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <nav className="menu">
                    <Link to="/home">
                        <i className="fas fa-home"></i> <span>{isSidebarOpen && "Accueil"}</span>
                    </Link>

                    {/* Section Employés */}
                    <div className="menu-item" onClick={() => setIsEmployeeMenuOpen(!isEmployeeMenuOpen)}>
                        <i className="fas fa-users"></i>
                        <span className="menu-label">{isSidebarOpen && "Employés"}</span>
                        {isSidebarOpen && (
                            <i className={`fas ${isEmployeeMenuOpen ? "fa-chevron-down" : "fa-chevron-right"} chevron`}></i>
                        )}
                    </div>
                    {isEmployeeMenuOpen && (
                        <div className="submenu">
                            <Link to="/employees/manage">
                                <i className="fas fa-user-cog"></i> <span>{isSidebarOpen && "Gestion des employés"}</span>
                            </Link>
                            <Link to="/employees/roles">
                                <i className="fas fa-user-tag"></i> <span>{isSidebarOpen && "Gestion des rôles"}</span>
                            </Link>
                            <Link to="/employees/permissions">
                                <i className="fas fa-lock"></i> <span>{isSidebarOpen && "Gestion des permissions"}</span>
                            </Link>
                            <Link to="/employees/teams">
                                <i className="fas fa-users-cog"></i> <span>{isSidebarOpen && "Gestion des équipes"}</span>
                            </Link>
                        </div>
                    )}

                    <Link to="/clients">
                        <i className="fas fa-user-tie"></i> <span>{isSidebarOpen && "Clients"}</span>
                    </Link>

                    <Link to="/logs">
                        <i className="fas fa-file-alt"></i> <span>{isSidebarOpen && "Logs"}</span>
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    <div className="left">
                        <img src="/avatar.jpg" alt="Avatar" className="avatar" />
                        <span className="username">John Doe</span>
                        <i className="fas fa-sign-out-alt logout-icon"></i>
                    </div>
                    <div className="right">
                        <i className="fas fa-comments icon"></i>
                        <i className="fas fa-bell icon"></i>
                    </div>
                </header>

                {/* Contenu dynamique */}
                <div className="content">{children}</div>
            </main>
        </div>
    );
}

export default DashboardLayout;
