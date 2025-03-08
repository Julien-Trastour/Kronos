import React, { useState } from 'react';
import { updateRole } from '../../config/api';

interface ModifyRoleModalProps {
  role: { id: string; name: string };
  onClose: () => void;
  onRoleUpdated: () => void;
}

const ModifyRoleModal: React.FC<ModifyRoleModalProps> = ({ role, onClose, onRoleUpdated }) => {
  const [roleName, setRoleName] = useState(role.name);

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
      await updateRole(token, role.id, roleName);
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
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleUpdateRole}>✅ Modifier</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default ModifyRoleModal;
