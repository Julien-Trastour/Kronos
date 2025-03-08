import React, { useState } from 'react';
import { createAgency } from '../../config/api';

interface CreateAgencyModalProps {
  onClose: () => void;
  onAgencyAdded: () => void;
}

const CreateAgencyModal: React.FC<CreateAgencyModalProps> = ({ onClose, onAgencyAdded }) => {
  const [agencyName, setAgencyName] = useState('');
  const [agencyType, setAgencyType] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('Actif');

  const handleCreateAgency = async () => {
    if (!agencyName.trim() || !agencyType.trim() || !address.trim() || !postalCode.trim() || !city.trim()) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await createAgency(token, {
        name: agencyName,
        type: agencyType,
        address, // ✅ Ajout de l'adresse
        postalCode, // ✅ Ajout du code postal
        city,
        status,
      });

      alert("Agence ajoutée avec succès !");
      onAgencyAdded();
      onClose();
    } catch (error) {
      alert("Erreur lors de l'ajout de l'agence.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Ajouter une agence</h2>
        <input
          type="text"
          placeholder="Nom de l'agence"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type d'agence (Siège, Boutique, etc.)"
          value={agencyType}
          onChange={(e) => setAgencyType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Code postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Actif">Actif</option>
          <option value="En sommeil">En sommeil</option>
          <option value="En construction">En construction</option>
        </select>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleCreateAgency}>✅ Ajouter</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default CreateAgencyModal;
