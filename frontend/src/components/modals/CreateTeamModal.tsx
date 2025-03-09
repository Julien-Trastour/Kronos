import React, { useEffect, useState } from 'react';
import { createTeam } from '../../config/api/teams';
import { getAgencies } from '../../config/api/agencies';
import { getTeams } from '../../config/api/teams';
import { Agency } from '../../types/Agency';
import { Team } from '../../types/Team';

interface CreateTeamModalProps {
  onClose: () => void;
  onTeamAdded: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ onClose, onTeamAdded }) => {
  const [teamName, setTeamName] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [parentTeamId, setParentTeamId] = useState('');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const [agencyData, teamData] = await Promise.all([getAgencies(token), getTeams(token)]);
        setAgencies(agencyData);
        setTeams(teamData);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName.trim() || !agencyId.trim()) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await createTeam(token, teamName, agencyId, parentTeamId || null);
      alert("Équipe ajoutée avec succès !");
      onTeamAdded();
      onClose();
    } catch (error) {
      alert("Erreur lors de l'ajout de l'équipe.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Ajouter une équipe</h2>
        <input type="text" placeholder="Nom de l'équipe" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

        {/* Sélection de l'agence */}
        {loading ? (
          <p>Chargement des agences...</p>
        ) : (
          <select value={agencyId} onChange={(e) => setAgencyId(e.target.value)}>
            <option value="">Sélectionner une agence</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>{agency.name}</option>
            ))}
          </select>
        )}

        {/* Sélection de l'équipe parente */}
        {loading ? (
          <p>Chargement des équipes...</p>
        ) : (
          <select value={parentTeamId} onChange={(e) => setParentTeamId(e.target.value)}>
            <option value="">Sélectionner une équipe parente</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        )}

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleCreateTeam}>✅ Ajouter</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default CreateTeamModal;
