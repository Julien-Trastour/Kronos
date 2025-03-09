import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getTeams, deleteTeam } from '../config/api/teams';
import { Team } from '../types/Team';
import CreateTeamModal from '../components/modals/CreateTeamModal';
import ModifyTeamModal from '../components/modals/ModifyTeamModal';

const TeamsManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleOpenEditModal = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleDeleteTeam = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await deleteTeam(token, id);
      alert("Équipe supprimée avec succès !");
      fetchTeams();
    } catch (error) {
      alert("Erreur lors de la suppression de l'équipe.");
    }
  };

  const fetchTeams = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous n'êtes pas authentifié.");
      setLoading(false);
      return;
    }

    try {
      const data = await getTeams(token);
      setTeams(data);
    } catch (err) {
      setError("Impossible de récupérer les équipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // ✅ Filtrer les équipes selon la recherche
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="header">
          <h1>Gestion des équipes</h1>
          <button className="add-button" onClick={() => setShowAddTeamModal(true)}>➕ Ajouter une équipe</button>
        </div>

        {/* ✅ Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher une équipe..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Chargement des équipes...</p>
        ) : (
          <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Agence</th>
                    <th>Équipe parente</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredTeams.map((team) => (
                    <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.agency ? team.agency.name : 'Aucune'}</td>
                    <td>{team.parentTeam ? team.parentTeam.name : 'Aucune'}</td>
                    <td className="action-buttons">
                        <button className="edit" onClick={() => handleOpenEditModal(team)}>
                        📝 Modifier
                        </button>
                        <button className="delete" onClick={() => handleDeleteTeam(team.id)}>
                        🗑️ Supprimer
                        </button>
                    </td>
                    </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* ✅ Modale de création */}
        {showAddTeamModal && (
          <CreateTeamModal onClose={() => setShowAddTeamModal(false)} onTeamAdded={fetchTeams} />
        )}

        {/* ✅ Modale de modification */}
        {selectedTeam && (
          <ModifyTeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} onTeamUpdated={fetchTeams} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeamsManagement;
