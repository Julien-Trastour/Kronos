import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/employee.css';

const EmployeeManagement = () => {
  const [search, setSearch] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Julien Trastour', email: 'julien.trastour@outlook.com', role: 'PDG', agency: 'Siège', team: 'Direction', status: 'Actif' },
    { id: 2, name: 'Alice Dupont', email: 'alice.dupont@example.com', role: 'Administrateur', agency: 'Centre SAV', team: 'Support', status: 'Inactif' },
  ]);

  return (
    <DashboardLayout>
      <div className="employee-container">
        <div className="header">
          <h1>Gestion des employés</h1>
          <button className="add-employee">➕ Ajouter un employé</button>
        </div>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher un employé..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tableau des employés */}
        <table className="employee-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Agence</th>
              <th>Équipe</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()))
              .map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.agency}</td>
                  <td>{emp.team}</td>
                  <td>
                    <span className={`status ${emp.status.toLowerCase()}`}>{emp.status}</span>
                  </td>
                  <td>
                    <button className="edit">📝</button>
                    <button className="toggle-status">{emp.status === 'Actif' ? '🚀' : '🔒'}</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
