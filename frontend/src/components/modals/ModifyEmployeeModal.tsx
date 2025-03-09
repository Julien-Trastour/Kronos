import React, { useState, useEffect } from 'react';
import { updateEmployee } from '../../config/api/employees';
import { getRoles } from '../../config/api/roles';
import { getAgencies } from '../../config/api/agencies';
import { getTeams } from '../../config/api/teams';
import { Employee } from '../../types/Employee';

interface ModifyEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onEmployeeUpdated: () => void;
}

const ModifyEmployeeModal: React.FC<ModifyEmployeeModalProps> = ({ employee, onClose, onEmployeeUpdated }) => {

  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({
    ...employee,
    roleId: employee.role?.id ?? "",
    agencyId: employee.agency?.id ?? "",
    teamId: employee.team?.id ?? "",
  });

  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [agencies, setAgencies] = useState<{ id: string; name: string }[]>([]);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
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
        console.error("❌ Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [employee]);

  // 🔄 Met à jour les `select` après le chargement des données
  useEffect(() => {
    if (roles.length > 0 && agencies.length > 0 && teams.length > 0) {
      setUpdatedEmployee((prev) => ({
        ...prev,
        roleId: prev.roleId || employee.role?.id || roles.find((r) => r.name === employee.role?.name)?.id || "",
        agencyId: prev.agencyId || employee.agency?.id || agencies.find((a) => a.name === employee.agency?.name)?.id || "",
        teamId: prev.teamId || employee.team?.id || teams.find((t) => t.name === employee.team?.name)?.id || "",
      }));

    }
  }, [roles, agencies, teams]);

  const handleUpdateEmployee = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      await updateEmployee(token, updatedEmployee.id, {
        ...updatedEmployee,
        roleId: updatedEmployee.roleId || employee.role?.id || "",
        agencyId: updatedEmployee.agencyId || employee.agency?.id || "",
        teamId: updatedEmployee.teamId || employee.team?.id || "",
      });

      alert("✅ Employé modifié avec succès !");
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      alert("❌ Erreur lors de la modification.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Modifier un employé</h2>

        <div className="modal-content">
          <input
            type="text"
            value={updatedEmployee.firstName}
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, firstName: e.target.value })}
            placeholder="Prénom"
          />
          <input
            type="text"
            value={updatedEmployee.lastName}
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, lastName: e.target.value })}
            placeholder="Nom"
          />
          <input
            type="email"
            value={updatedEmployee.email}
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, email: e.target.value })}
            placeholder="Email"
          />

          {/* Sélection du rôle */}
          <select
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, roleId: e.target.value })}
            value={updatedEmployee.roleId || ""}
          >
            <option value="">Sélectionner un rôle</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          {/* Sélection de l'agence */}
          <select
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, agencyId: e.target.value })}
            value={updatedEmployee.agencyId || ""}
          >
            <option value="">Sélectionner une agence</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>

          {/* Sélection de l'équipe */}
          <select
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, teamId: e.target.value })}
            value={updatedEmployee.teamId || ""}
          >
            <option value="">Sélectionner une équipe</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          {/* Sélection du statut */}
          <select
            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, status: e.target.value })}
            value={updatedEmployee.status}
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
        </div>

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleUpdateEmployee}>
            ✅ Enregistrer
          </button>
          <button className="close-modal" onClick={onClose}>
            ❌ Annuler
          </button>
        </div>
      </div>
    </>
  );
};

export default ModifyEmployeeModal;
