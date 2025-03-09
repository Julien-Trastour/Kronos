import React, { useState } from 'react';
import { createAgencyType } from '../../config/api';

interface CreateAgencyTypeModalProps {
  onClose: () => void;
  onTypeAdded: () => void;
}

const CreateAgencyTypeModal: React.FC<CreateAgencyTypeModalProps> = ({ onClose, onTypeAdded }) => {
  const [name, setName] = useState('');

  const handleCreate = async () => {
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
      await createAgencyType(token, name);
      alert("Type d'agence ajouté avec succès !");
      onTypeAdded();
      onClose();
    } catch (error) {
      alert("Erreur lors de la création du type d'agence.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>Ajouter un type d'agence</h2>
        <input
          type="text"
          placeholder="Nom du type"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleCreate}>✅ Ajouter</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default CreateAgencyTypeModal;
