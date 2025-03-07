import { useState } from "react";
import '../styles/permissions.css';

function PermissionManagement() {
    // Liste des rôles
    const roles = ["PDG", "Responsable Agence", "Responsable Technique", "Vendeur", "Technicien"];

    // Liste des permissions classées par micro-service
    const permissionsByService = {
        "Ouranos CRM": ["Créer une facture", "Modifier une facture", "Consulter une facture"],
        "Ouranos Desk": ["Ouvrir un ticket", "Modifier un ticket", "Consulter un ticket"],
    };

    // Initialisation des permissions (false par défaut)
    const [permissions, setPermissions] = useState(
        Object.keys(permissionsByService).reduce((acc, service) => {
            acc[service] = {};
            permissionsByService[service].forEach((perm) => {
                acc[service][perm] = roles.reduce((roleAcc, role) => {
                    roleAcc[role] = false;
                    return roleAcc;
                }, {});
            });
            return acc;
        }, {})
    );

    // Fonction pour basculer une permission (true/false)
    const togglePermission = (service, permission, role) => {
        setPermissions((prev) => ({
            ...prev,
            [service]: {
                ...prev[service],
                [permission]: {
                    ...prev[service][permission],
                    [role]: !prev[service][permission][role],
                },
            },
        }));
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Gestion des permissions</h2>
            </div>

            {Object.keys(permissionsByService).map((service) => (
                <div key={service} className="permission-section">
                    <h3>{service}</h3>
                    <div className="permissions-table-wrapper">
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Permission</th>
                                    {roles.map((role) => (
                                        <th key={role}>{role}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {permissionsByService[service].map((perm) => (
                                    <tr key={perm}>
                                        <td>{perm}</td>
                                        {roles.map((role) => (
                                            <td key={`${perm}-${role}`} className="permission-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={permissions[service][perm][role]}
                                                    onChange={() => togglePermission(service, perm, role)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PermissionManagement;
