import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAgencies, deleteAgency, getAgencyTypes, createAgencyType, deleteAgencyType } from '../config/api/agencies';
import CreateAgencyModal from '../components/modals/CreateAgencyModal';
import ModifyAgencyModal from '../components/modals/ModifyAgencyModal';
import CreateAgencyTypeModal from '../components/modals/CreateAgencyTypeModal';
import ModifyAgencyTypeModal from '../components/modals/ModifyAgencyTypeModal';
import { Agency, AgencyType } from '../types/Agency';

const AgenciesManagement: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [agencyTypes, setAgencyTypes] = useState<AgencyType[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [loadingAgencyTypes, setLoadingAgencyTypes] = useState(true);
  const [error, setError] = useState('');
  const [showAddAgencyModal, setShowAddAgencyModal] = useState(false);
  const [showAddAgencyTypeModal, setShowAddAgencyTypeModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedAgencyType, setSelectedAgencyType] = useState<AgencyType | null>(null);
  
  // États pour les barres de recherche
  const [searchAgency, setSearchAgency] = useState('');
  const [searchAgencyType, setSearchAgencyType] = useState('');

  const handleOpenEditModal = (agency: Agency) => {
    setSelectedAgency(agency);
  };

  const handleOpenEditTypeModal = (type: AgencyType) => {
    setSelectedAgencyType(type);
  };

  const handleDeleteAgency = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette agence ?")) return;
    const token = localStorage.getItem('token');
    if (!token) return alert("Vous devez être connecté.");
    
    try {
      await deleteAgency(token, id);
      alert("Agence supprimée avec succès !");
      fetchAgencies();
    } catch (error) {
      alert("Erreur lors de la suppression de l'agence.");
    }
  };

  const handleDeleteAgencyType = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce type d'agence ?")) return;
    const token = localStorage.getItem('token');
    if (!token) return alert("Vous devez être connecté.");

    try {
      await deleteAgencyType(token, id);
      alert("Type d'agence supprimé avec succès !");
      fetchAgencyTypes();
    } catch (error) {
      alert("Erreur lors de la suppression du type d'agence.");
    }
  };

  const fetchAgencies = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError("Vous n'êtes pas authentifié.");
    
    try {
      const data = await getAgencies(token);
      setAgencies(data);
    } catch (err) {
      setError("Impossible de récupérer les agences.");
    } finally {
      setLoadingAgencies(false);
    }
  };

  const fetchAgencyTypes = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const data = await getAgencyTypes(token);
      setAgencyTypes(data);
    } finally {
      setLoadingAgencyTypes(false);
    }
  };

  useEffect(() => {
    fetchAgencies();
    fetchAgencyTypes();
  }, []);

  return (
    <DashboardLayout>
      <div className="table-container">
        
        {/* ✅ Tableau des types d'agences */}
        <div className="title-button-container">
          <h1>Types d'agences</h1>
          <button className="add-button" onClick={() => setShowAddAgencyTypeModal(true)}>➕ Ajouter un type</button>
        </div>

        {/* ✅ Barre de recherche pour filtrer les types d'agences */}
        <input
          type="text"
          placeholder="🔍 Rechercher un type d'agence..."
          className="search-bar"
          value={searchAgencyType}
          onChange={(e) => setSearchAgencyType(e.target.value)}
        />

        {loadingAgencyTypes ? (
          <p>Chargement des types d'agences...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom du Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agencyTypes
                .filter((type) =>
                  type.name.toLowerCase().includes(searchAgencyType.toLowerCase())
                )
                .map((type) => (
                  <tr key={type.id}>
                    <td>{type.name}</td>
                    <td className="action-buttons">
                      <button className="edit" onClick={() => handleOpenEditTypeModal(type)}>📝 Modifier</button>
                      <button className="delete" onClick={() => handleDeleteAgencyType(type.id)}>🗑️ Supprimer</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* ✅ Espace entre les deux tableaux */}
        <hr style={{ margin: "30px 0", border: "1px solid #444" }} />

        {/* ✅ Tableau des agences */}
        <div className="title-button-container">
          <h1>Liste des agences</h1>
          <button className="add-button" onClick={() => setShowAddAgencyModal(true)}>➕ Ajouter une agence</button>
        </div>

        {/* ✅ Barre de recherche pour filtrer les agences */}
        <input
          type="text"
          placeholder="🔍 Rechercher une agence..."
          className="search-bar"
          value={searchAgency}
          onChange={(e) => setSearchAgency(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        {loadingAgencies ? (
          <p>Chargement des agences...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Ville</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agencies
                .filter((agency) =>
                  agency.name.toLowerCase().includes(searchAgency.toLowerCase()) ||
                  agency.city.toLowerCase().includes(searchAgency.toLowerCase())
                )
                .map((agency) => (
                  <tr key={agency.id}>
                    <td>{agency.name}</td>
                    <td>{agency.type?.name || "Non défini"}</td>
                    <td>{agency.city}</td>
                    <td>{agency.status}</td>
                    <td className="action-buttons">
                      <button className="edit" onClick={() => handleOpenEditModal(agency)}>📝 Modifier</button>
                      <button className="delete" onClick={() => handleDeleteAgency(agency.id)}>🗑️ Supprimer</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* ✅ Les 4 modales correctement affichées */}
        {showAddAgencyTypeModal && <CreateAgencyTypeModal onClose={() => setShowAddAgencyTypeModal(false)} onTypeAdded={fetchAgencyTypes} />}
        {selectedAgencyType && <ModifyAgencyTypeModal typeId={selectedAgencyType.id} currentName={selectedAgencyType.name} onClose={() => setSelectedAgencyType(null)} onTypeUpdated={fetchAgencyTypes} />}
        {showAddAgencyModal && <CreateAgencyModal onClose={() => setShowAddAgencyModal(false)} onAgencyAdded={fetchAgencies} />}
        {selectedAgency && <ModifyAgencyModal agency={selectedAgency} onClose={() => setSelectedAgency(null)} onAgencyUpdated={fetchAgencies} />}
        
      </div>
    </DashboardLayout>
  );
};

export default AgenciesManagement;
