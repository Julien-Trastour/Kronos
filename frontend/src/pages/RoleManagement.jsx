import { useState } from "react";
import RoleModal from "../components/RoleModal";

function RoleManagement() {
    const [roles] = useState([
        { id: 1, name: "PDG", superior: "-", userCount: 1 },
        { id: 2, name: "Responsable Agence", superior: "PDG", userCount: 3 },
        { id: 3, name: "Responsable Technique", superior: "PDG", userCount: 2 },
        { id: 4, name: "Vendeur", superior: "Responsable Agence", userCount: 10 },
        { id: 5, name: "Technicien", superior: "Responsable Technique", userCount: 7 },
    ]);

    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openModal = (role, editMode = false) => {
        setSelectedRole(role);
        setIsEditing(editMode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRole(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Gestion des fonctions</h2>
                <button className="add-btn" onClick={() => openModal(null, true)}>+ Nouvelle fonction</button>
            </div>

            <table className="table-container">
                <thead>
                    <tr>
                        <th>Fonction</th>
                        <th>Supérieur hiérarchique</th>
                        <th>Nombre d’utilisateurs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.superior}</td>
                            <td>{role.userCount}</td>
                            <td className="actions">
                                <i className="fas fa-eye action-icon consult" onClick={() => openModal(role)}></i>
                                <i className="fas fa-edit action-icon edit" onClick={() => openModal(role, true)}></i>
                                <i className="fas fa-trash action-icon delete"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <RoleModal role={selectedRole} isOpen={isModalOpen} onClose={closeModal} isEditing={isEditing} />
        </div>
    );
}

export default RoleManagement;
