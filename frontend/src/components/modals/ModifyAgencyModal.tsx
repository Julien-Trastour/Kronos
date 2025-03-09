import React, { useEffect, useState } from 'react';
import { updateAgency, getAgencyTypes } from '../../config/api';
import { Agency, AgencyType } from '../../types/Agency';

interface ModifyAgencyModalProps {
  agency: Agency;
  onClose: () => void;
  onAgencyUpdated: () => void;
}

const ModifyAgencyModal: React.FC<ModifyAgencyModalProps> = ({ agency, onClose, onAgencyUpdated }) => {
  const [agencyName, setAgencyName] = useState(agency.name);
  const [agencyType, setAgencyType] = useState(agency.type?.id || '');
  const [address, setAddress] = useState(agency.address);
  const [postalCode, setPostalCode] = useState(agency.postalCode);
  const [city, setCity] = useState(agency.city);
  const [status, setStatus] = useState(agency.status);
  const [agencyTypes, setAgencyTypes] = useState<AgencyType[]>([]);

  useEffect(() => {
    const fetchAgencyTypes = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const data = await getAgencyTypes(token);
        console.log("✅ Types d'agences récupérés :", data); // 🔹 Ajoute ce log
        setAgencyTypes(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des types d'agences :", error);
      }
    };
  
    fetchAgencyTypes();
  }, []);  

  const handleUpdateAgency = async () => {
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
      await updateAgency(token, agency.id, { 
        name: agencyName,
        typeId: agencyType,
        address,
        postalCode,
        city,
        status 
      });

      alert("Agence modifiée avec succès !");
      onAgencyUpdated();
      onClose();
    } catch (error) {
      alert("Erreur lors de la modification de l'agence.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Modifier une agence</h2>
        <input
          type="text"
          placeholder="Nom de l'agence"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
        />
        <select value={agencyType} onChange={(e) => setAgencyType(e.target.value)}>
            <option value="">Sélectionner un type</option>
            {agencyTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
            ))}
        </select>
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
          <button className="confirm-button" onClick={handleUpdateAgency}>✅ Modifier</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default ModifyAgencyModal;
