import { useState } from "react";
import TeamModal from "../components/TeamModal";
import EmployeeModal from "../components/EmployeeModal";
import '../styles/teams.css';

function TeamManagement() {
    // Liste des agences
    const agencies = ["Paris", "Lyon", "Marseille"];

    // Liste fictive des employés avec leur agence
    const [employees] = useState([
        { id: "EMP001", name: "Jean Dupont", role: "Développeur", supervisor: "Marie Curie", agency: "Paris", email: "jean.dupont@example.com", entryDate: "2020-03-15", seniority: "3 ans", departureDate: "" },
        { id: "EMP002", name: "Sophie Martin", role: "Designer", supervisor: "Pierre Durand", agency: "Paris", email: "sophie.martin@example.com", entryDate: "2019-08-10", seniority: "4 ans", departureDate: "" },
        { id: "EMP003", name: "Thomas Lemoine", role: "Chef de projet", supervisor: "Paul Henri", agency: "Lyon", email: "thomas.lemoine@example.com", entryDate: "2018-06-22", seniority: "5 ans", departureDate: "" },
        { id: "EMP004", name: "Claire Durand", role: "DevOps", supervisor: "Julie Vasseur", agency: "Marseille", email: "claire.durand@example.com", entryDate: "2021-01-10", seniority: "2 ans", departureDate: "" },
        { id: "EMP005", name: "Lucas Morel", role: "Développeur", supervisor: "Marie Curie", agency: "Lyon", email: "lucas.morel@example.com", entryDate: "2022-07-14", seniority: "1 an", departureDate: "" },
    ]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

    // Ouvrir la modale de modification d'équipe
    const openTeamModal = (employee) => {
        setSelectedEmployee(employee);
        setIsTeamModalOpen(true);
    };

    // Ouvrir la modale de consultation
    const openEmployeeModal = (employee) => {
        setSelectedEmployee(employee);
        setIsEmployeeModalOpen(true);
    };

    // Fermer les modales
    const closeModals = () => {
        setIsTeamModalOpen(false);
        setIsEmployeeModalOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Gestion des équipes</h2>
            </div>

            <div className="team-grid">
                {agencies.map((agency) => (
                    <div key={agency} className="team-section">
                        <h3>{agency}</h3>
                        <div className="team-table-wrapper">
                            <table className="table-container">
                                <thead>
                                    <tr>
                                        <th>Employé</th>
                                        <th>Rôle</th>
                                        <th>Supérieur</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees
                                        .filter((employee) => employee.agency === agency)
                                        .map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.role}</td>
                                                <td>{employee.supervisor}</td>
                                                <td className="actions">
                                                    <i
                                                        className="fas fa-eye action-icon consult"
                                                        onClick={() => openEmployeeModal(employee)}
                                                    ></i>
                                                    <i
                                                        className="fas fa-edit action-icon edit"
                                                        onClick={() => openTeamModal(employee)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modale pour modifier l'agence */}
            <TeamModal
                employee={selectedEmployee}
                isOpen={isTeamModalOpen}
                onClose={closeModals}
                agencies={agencies}
            />

            {/* Modale pour consulter les détails de l'employé */}
            <EmployeeModal
                employee={selectedEmployee}
                isOpen={isEmployeeModalOpen}
                onClose={closeModals}
                isEditing={false} // Consultation seulement
            />
        </div>
    );
}

export default TeamManagement;
