import React, { useState, useEffect } from 'react';
import { addEmployee, getRoles, getAgencies, getTeams } from '../../config/api';

interface CreateEmployeeModalProps {
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ onClose, onEmployeeAdded }) => {
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [agencies, setAgencies] = useState<{ id: string; name: string }[]>([]);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',
    agencyId: '',
    teamId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const [rolesData, agenciesData, teamsData] = await Promise.all([
          getRoles(token),
          getAgencies(token),
          getTeams(token),
        ]);

        setRoles(rolesData);
        setAgencies(agenciesData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleAddEmployee = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await addEmployee(token, newEmployee);
      alert("Employé ajouté avec succès !");
      onEmployeeAdded();
      onClose();
    } catch (error) {
      alert("Erreur lors de l'ajout.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Ajouter un employé</h2>

        <div className="modal-content">
          <input type="text" placeholder="Prénom" onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })} />
          <input type="text" placeholder="Nom" onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />

          {/* Sélection du rôle */}
          <select onChange={(e) => setNewEmployee({ ...newEmployee, roleId: e.target.value })}>
            <option value="">Sélectionner un rôle</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>

          {/* Sélection de l'agence */}
          <select onChange={(e) => setNewEmployee({ ...newEmployee, agencyId: e.target.value })}>
            <option value="">Sélectionner une agence</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>{agency.name}</option>
            ))}
          </select>

          {/* Sélection de l'équipe */}
          <select onChange={(e) => setNewEmployee({ ...newEmployee, teamId: e.target.value })}>
            <option value="">Sélectionner une équipe</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleAddEmployee}>Créer</button>
          <button className="close-modal" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </>
  );
};

export default CreateEmployeeModal;
