import React, { useEffect, useState } from 'react';
import { updateTeam } from '../../config/api/teams';
import { getAgencies } from '../../config/api/agencies';
import { getTeams } from '../../config/api/teams';
import { Team } from '../../types/Team';
import { Agency } from '../../types/Agency';

interface ModifyTeamModalProps {
  team: Team;
  onClose: () => void;
  onTeamUpdated: () => void;
}

const ModifyTeamModal: React.FC<ModifyTeamModalProps> = ({ team, onClose, onTeamUpdated }) => {
  const [teamName, setTeamName] = useState(team.name);
  const [agencyId, setAgencyId] = useState(team.agency?.id || '');
  const [parentTeamId, setParentTeamId] = useState(team.parentTeam?.id || '');
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

  const handleUpdateTeam = async () => {
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
      await updateTeam(token, team.id, teamName, agencyId, parentTeamId || null);
      alert("Équipe modifiée avec succès !");
      onTeamUpdated();
      onClose();
    } catch (error) {
      alert("Erreur lors de la modification de l'équipe.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Modifier une équipe</h2>
        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

        {/* Sélection de l'équipe parente */}
        <select value={parentTeamId} onChange={(e) => setParentTeamId(e.target.value)}>
          <option value="">Sélectionner une équipe parente</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>

        <div className="modal-buttons">
            <button className="confirm-button" onClick={handleUpdateTeam}>✅ Modifier</button>
            <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default ModifyTeamModal;
