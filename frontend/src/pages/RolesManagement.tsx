import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getRoles, deleteRole } from '../config/api';
import CreateRoleModal from '../components/modals/CreateRoleModal';
import ModifyRoleModal from '../components/modals/ModifyRoleModal';

interface Role {
  id: string;
  name: string;
  parentRole?: { id: string; name: string } | null;
}

const RolesManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState(''); // ✅ État pour la recherche
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleOpenEditModal = (role: Role) => {
    setSelectedRole(role);
  };

  const handleDeleteRole = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rôle ?")) return;
  
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

  // ✅ Filtrer les rôles selon la recherche
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="header">
          <h1>Gestion des rôles</h1>
          <button className="add-button" onClick={() => setShowAddRoleModal(true)}>➕ Ajouter un rôle</button>
        </div>

        {/* ✅ Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher un rôle..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Chargement des rôles...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rôle Parent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.parentRole ? role.parentRole.name : 'Aucun'}</td>
                  <td className="action-buttons">
                    <button className="edit" onClick={() => handleOpenEditModal(role)}>
                      📝 Modifier
                    </button>
                    <button className="delete" onClick={() => handleDeleteRole(role.id)}>
                      🗑️ Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showAddRoleModal && (
          <CreateRoleModal onClose={() => setShowAddRoleModal(false)} onRoleAdded={fetchRoles} roles={roles} />
        )}
        {selectedRole && (
          <ModifyRoleModal role={selectedRole} onClose={() => setSelectedRole(null)} onRoleUpdated={fetchRoles} roles={roles} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default RolesManagement;
