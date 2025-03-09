import React, { useState } from 'react';
import { createRole } from '../../config/api/roles';

interface CreateRoleModalProps {
  onClose: () => void;
  onRoleAdded: () => void;
  roles: { id: string; name: string }[]; // ✅ Liste des rôles existants
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ onClose, onRoleAdded, roles }) => {
  const [roleName, setRoleName] = useState('');
  const [parentRoleId, setParentRoleId] = useState('');

  const handleCreateRole = async () => {
    if (!roleName.trim()) {
      alert("Le nom du rôle ne peut pas être vide.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await createRole(token, roleName, parentRoleId || undefined);
      alert("Rôle ajouté avec succès !");
      onRoleAdded();
      onClose();
    } catch (error) {
      alert("Erreur lors de l'ajout du rôle.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Ajouter un rôle</h2>
        <input
          type="text"
          placeholder="Nom du rôle"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />

        {/* ✅ Sélecteur du rôle parent */}
        <select value={parentRoleId} onChange={(e) => setParentRoleId(e.target.value)}>
          <option value="">Aucun rôle parent</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleCreateRole}>✅ Ajouter</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default CreateRoleModal;
