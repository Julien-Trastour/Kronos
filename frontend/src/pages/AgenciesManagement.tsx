import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAgencies, deleteAgency } from '../config/api';
import CreateAgencyModal from '../components/modals/CreateAgencyModal';
import ModifyAgencyModal from '../components/modals/ModifyAgencyModal';
import { Agency } from '../types/Agency';


const AgenciesManagement: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddAgencyModal, setShowAddAgencyModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<any | null>(null);

  const handleOpenEditModal = (agency: any) => {
    setSelectedAgency(agency);
  };

  const handleDeleteAgency = async (id: string) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette agence ?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }
  
    try {
      await deleteAgency(token, id);
      alert("Agence supprimée avec succès !");
      fetchAgencies(); // 🔄 Met à jour la liste après suppression
    } catch (error) {
      alert("Erreur lors de la suppression de l'agence.");
    }
  };

  const fetchAgencies = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous n'êtes pas authentifié.");
      setLoading(false);
      return;
    }

    try {
      const data = await getAgencies(token);
      setAgencies(data);
    } catch (err) {
      setError("Impossible de récupérer les agences.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="header">
          <h1>Gestion des agences</h1>
          <button className="add-button" onClick={() => setShowAddAgencyModal(true)}>➕ Ajouter une agence</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
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
              {agencies.map((agency) => (
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
        {showAddAgencyModal && (
          <CreateAgencyModal onClose={() => setShowAddAgencyModal(false)} onAgencyAdded={fetchAgencies} />
        )}
        {selectedAgency && (
          <ModifyAgencyModal agency={selectedAgency} onClose={() => setSelectedAgency(null)} onAgencyUpdated={fetchAgencies} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgenciesManagement;
