import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getEmployees } from '../config/api';
import CreateEmployeeModal from '../components/modals/CreateEmployeeModal';
import ModifyEmployeeModal from '../components/modals/ModifyEmployeeModal';
import { Employee } from '../types/Employee';
import '../styles/employee.css';

const EmployeeManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Récupération des employés
  const fetchEmployees = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous n'êtes pas authentifié.");
      setLoading(false);
      return;
    }

    try {
      const data = await getEmployees(token);
      setEmployees(data);
    } catch (err) {
      setError("Impossible de récupérer les employés.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Ouvrir la modale de modification
  const handleOpenEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout>
      <div className="employee-container">
        <div className="header">
          <h1>Gestion des employés</h1>
          <button className="add-employee" onClick={() => setShowAddModal(true)}>
            ➕ Ajouter un employé
          </button>
        </div>

        {/* Affichage du message d'erreur */}
        {error && <p className="error-message">{error}</p>}

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher un employé..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tableau des employés */}
        {loading ? (
          <p>Chargement des employés...</p>
        ) : (
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
                .filter((emp) =>
                  `${emp.firstName} ${emp.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role?.name || 'Non défini'}</td>
                    <td>{emp.agency?.name || 'Aucune'}</td>
                    <td>{emp.team?.name || 'Aucune'}</td>
                    <td>
                      <span className={`status ${emp.status.toLowerCase()}`}>{emp.status}</span>
                    </td>
                    <td>
                      <button className="edit" onClick={() => handleOpenEditModal(emp)}>📝 Modifier</button>
                      <button className="toggle-status">
                        {emp.status === 'Actif' ? '🚀 Actif' : '🔒 Inactif'}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Modale d'ajout d'employé */}
        {showAddModal && (
          <CreateEmployeeModal onClose={() => setShowAddModal(false)} onEmployeeAdded={fetchEmployees} />
        )}

        {/* Modale de modification d'employé */}
        {showEditModal && selectedEmployee && (
          <ModifyEmployeeModal
            employee={selectedEmployee}
            onClose={() => setShowEditModal(false)}
            onEmployeeUpdated={fetchEmployees}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
