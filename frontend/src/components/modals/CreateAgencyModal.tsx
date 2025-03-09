import React, { useEffect, useState } from 'react';
import { createAgency, getAgencyTypes } from '../../config/api/agencies';
import { AgencyType } from '../../types/Agency';

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
  const [agencyTypes, setAgencyTypes] = useState<AgencyType[]>([]);
  const [postalCodeError, setPostalCodeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgencyTypes = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await getAgencyTypes(token);
        setAgencyTypes(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des types d'agences :", error);
      }
    };

    fetchAgencyTypes();
  }, []);

  // ✅ Vérification du format du code postal (5 chiffres)
  const handlePostalCodeChange = (value: string) => {
    setPostalCode(value);
    if (!/^\d{5}$/.test(value)) {
      setPostalCodeError("Le code postal doit contenir exactement 5 chiffres.");
    } else {
      setPostalCodeError(null);
    }
  };

  const handleCreateAgency = async () => {
    if (!agencyName.trim() || !agencyType.trim() || !address.trim() || !postalCode.trim() || !city.trim()) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    if (postalCodeError) {
      alert("Le code postal est invalide.");
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
        typeId: agencyType,
        address,
        postalCode,
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
        <input type="text" placeholder="Nom de l'agence" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
        
        {/* ✅ Sélecteur des types d'agences */}
        <select value={agencyType} onChange={(e) => setAgencyType(e.target.value)}>
          <option value="">Sélectionner un type d'agence</option>
          {agencyTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>

        <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Code postal" value={postalCode} onChange={(e) => handlePostalCodeChange(e.target.value)} />
        {postalCodeError && <p className="error-message">{postalCodeError}</p>}
        <input type="text" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />

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
