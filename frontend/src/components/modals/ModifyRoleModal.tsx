import React, { useState } from 'react';
import { updateRole } from '../../config/api';

interface ModifyRoleModalProps {
  role: { id: string; name: string; parentRole?: { id: string; name: string } | null };
  onClose: () => void;
  onRoleUpdated: () => void;
  roles: { id: string; name: string }[];
}

const ModifyRoleModal: React.FC<ModifyRoleModalProps> = ({ role, onClose, onRoleUpdated, roles }) => {
  const [roleName, setRoleName] = useState(role.name);
  const [parentRoleId, setParentRoleId] = useState(role.parentRole?.id || '');

  const handleUpdateRole = async () => {
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
      await updateRole(token, role.id, roleName, parentRoleId || undefined);
      alert("Rôle modifié avec succès !");
      onRoleUpdated();
      onClose();
    } catch (error) {
      alert("Erreur lors de la modification du rôle.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Modifier le rôle</h2>
        <input
          type="text"
          placeholder="Nom du rôle"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />

        {/* ✅ Sélecteur du rôle parent */}
        <select value={parentRoleId} onChange={(e) => setParentRoleId(e.target.value)}>
          <option value="">Aucun rôle parent</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleUpdateRole}>✅ Modifier</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default ModifyRoleModal;
