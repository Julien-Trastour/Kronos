import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getRoles, deleteRole } from '../config/api';
import CreateRoleModal from '../components/modals/CreateRoleModal';
import ModifyRoleModal from '../components/modals/ModifyRoleModal';

interface Role {
  id: string;
  name: string;
}

const RolesManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<{ id: string; name: string } | null>(null);

  const handleOpenEditModal = (role: { id: string; name: string }) => {
    setSelectedRole(role);
  };

  const handleDeleteRole = async (id: string) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce rôle ?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }
  
    try {
      await deleteRole(token, id);
      alert("Rôle supprimé avec succès !");
      fetchRoles();
    } catch (error) {
      alert("Erreur lors de la suppression du rôle.");
    }
  };

  const fetchRoles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous n'êtes pas authentifié.");
      setLoading(false);
      return;
    }

    try {
      const data = await getRoles(token);
      setRoles(data);
    } catch (err) {
      setError("Impossible de récupérer les rôles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="header">
          <h1>Gestion des rôles</h1>
          <button className="add-button" onClick={() => setShowAddRoleModal(true)}>➕ Ajouter un rôle</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Chargement des rôles...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td className="action-buttons">
                    <button className="edit" onClick={() => handleOpenEditModal(role)}>📝 Modifier</button>
                    <button className="delete" onClick={() => handleDeleteRole(role.id)}>🗑️ Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showAddRoleModal && (
          <CreateRoleModal onClose={() => setShowAddRoleModal(false)} onRoleAdded={fetchRoles} />
        )}
        {selectedRole && (
          <ModifyRoleModal role={selectedRole} onClose={() => setSelectedRole(null)} onRoleUpdated={fetchRoles} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default RolesManagement;
