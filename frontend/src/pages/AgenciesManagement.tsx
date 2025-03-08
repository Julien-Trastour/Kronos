import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAgencies } from '../config/api';
import CreateAgencyModal from '../components/modals/CreateAgencyModal';

interface Agency {
  id: string;
  name: string;
  type: string;
  city: string;
  status: string;
}

const AgenciesManagement: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddAgencyModal, setShowAddAgencyModal] = useState(false);

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
                  <td>{agency.type}</td>
                  <td>{agency.city}</td>
                  <td>{agency.status}</td>
                  <td className="action-buttons">
                    <button className="edit">📝 Modifier</button>
                    <button className="delete">🗑️ Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showAddAgencyModal && (
          <CreateAgencyModal onClose={() => setShowAddAgencyModal(false)} onAgencyAdded={fetchAgencies} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgenciesManagement;
