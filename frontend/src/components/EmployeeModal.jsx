import React, { useState, useEffect } from "react";

function EmployeeModal({ employee, isOpen, onClose, isEditing }) {
    const [formData, setFormData] = useState({
        id: "",
        lastName: "",
        firstName: "",
        entryDate: "",
        seniority: "",
        departureDate: "",
        role: "",
        team: "",
        agency: "",
        supervisor: "",
        email: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                id: employee.id || "",
                lastName: employee.lastName || "",
                firstName: employee.firstName || "",
                entryDate: employee.entryDate || "",
                seniority: employee.seniority || "",
                departureDate: employee.departureDate || "Toujours en poste",
                role: employee.role || "",
                team: employee.team || "",
                agency: employee.agency || "",
                supervisor: employee.supervisor || "",
                email: employee.email || "",
            });
        }
    }, [employee]);

    if (!isOpen || !employee) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{isEditing ? "Modifier l'employé" : "Détails de l'employé"}</h3>

                <div className="modal-body">
                    {/* Section Identité */}
                    <Section title="Identité">
                        <Field label="Matricule" value={formData.id} disabled />
                        <Field label="Nom" value={formData.lastName} disabled={!isEditing} />
                        <Field label="Prénom" value={formData.firstName} disabled={!isEditing} />
                        <Field label="Date d'entrée" value={formData.entryDate} disabled />
                        <Field label="Ancienneté" value={formData.seniority} disabled />
                        <Field label="Date de départ" value={formData.departureDate} disabled />
                    </Section>

                    {/* Section Poste */}
                    <Section title="Poste">
                        <Field label="Fonction" value={formData.role} disabled={!isEditing} />
                        <Field label="Équipe" value={formData.team} disabled={!isEditing} />
                        <Field label="Agence" value={formData.agency} disabled={!isEditing} />
                        <Field label="Supérieur hiérarchique" value={formData.supervisor} disabled />
                    </Section>

                    {/* Section Connexion */}
                    <Section title="Connexion">
                        <Field label="Email" value={formData.email} disabled={!isEditing} fullWidth />
                        <div className="form-group full-width">
                            <label>Mot de passe</label>
                            <div className="password-field">
                                <input type="password" value="********" disabled />
                                <button className="reset-password">Réinitialiser</button>
                            </div>
                        </div>
                    </Section>
                </div>

                <div className="modal-footer">
                    {isEditing && <button className="save-btn">Enregistrer</button>}
                    <button className="close-btn" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    );
}

/** Composant pour une section de la modale */
const Section = ({ title, children }) => (
    <div className="modal-section">
        <h4>{title}</h4>
        <div className="modal-grid">{children}</div>
    </div>
);

/** Composant pour un champ de formulaire */
const Field = ({ label, value, disabled, fullWidth = false }) => (
    <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
        <label>{label}</label>
        <input type="text" value={value} disabled={disabled} />
    </div>
);

export default EmployeeModal;
