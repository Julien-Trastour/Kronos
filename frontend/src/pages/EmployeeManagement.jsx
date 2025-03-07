import { useState } from "react";
import EmployeeModal from "../components/EmployeeModal";

function EmployeeManagement() {
    const [employees] = useState([
        {
            id: "EMP001",
            lastName: "Dupont",
            firstName: "Jean",
            role: "Développeur",
            team: "Back-end",
            agency: "Paris",
            email: "jean.dupont@example.com",
            supervisor: "Marie Curie",
            entryDate: "2020-03-15",
            seniority: "3 ans",
            departureDate: "",
        },
        {
            id: "EMP002",
            lastName: "Martin",
            firstName: "Sophie",
            role: "Designer",
            team: "UI/UX",
            agency: "Lyon",
            email: "sophie.martin@example.com",
            supervisor: "Pierre Durand",
            entryDate: "2019-08-10",
            seniority: "4 ans",
            departureDate: "",
        },
    ]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openModal = (employee, editMode = false) => {
        setSelectedEmployee(employee);
        setIsEditing(editMode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Gestion des employés</h2>
                <button className="add-btn">+ Nouvel employé</button>
            </div>

            <table className="table-container">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Fonction</th>
                        <th>Équipe</th>
                        <th>Agence</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.role}</td>
                            <td>{employee.team}</td>
                            <td>{employee.agency}</td>
                            <td className="actions">
                                <i className="fas fa-eye action-icon consult" onClick={() => openModal(employee)}></i>
                                <i className="fas fa-edit action-icon edit" onClick={() => openModal(employee, true)}></i>
                                <i className="fas fa-trash action-icon delete"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EmployeeModal
                employee={selectedEmployee}
                isOpen={isModalOpen}
                onClose={closeModal}
                isEditing={isEditing}
            />
        </div>
    );
}

export default EmployeeManagement;
