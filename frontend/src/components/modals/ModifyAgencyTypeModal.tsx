import React, { useState } from 'react';
import { updateAgencyType } from '../../config/api/agencies';

interface ModifyAgencyTypeModalProps {
  typeId: string;
  currentName: string;
  onClose: () => void;
  onTypeUpdated: () => void;
}

const ModifyAgencyTypeModal: React.FC<ModifyAgencyTypeModalProps> = ({ typeId, currentName, onClose, onTypeUpdated }) => {
  const [name, setName] = useState(currentName);

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("Veuillez entrer un nom valide.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await updateAgencyType(token, typeId, name);
      alert("Type d'agence modifié avec succès !");
      onTypeUpdated();
      onClose();
    } catch (error) {
      alert("Erreur lors de la modification du type d'agence.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>Modifier le type d'agence</h2>
        <input
          type="text"
          placeholder="Nom du type"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleUpdate}>✅ Modifier</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default ModifyAgencyTypeModal;
