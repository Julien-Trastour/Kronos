import React, { useState, useEffect } from "react";

function RoleModal({ role, isOpen, onClose, isEditing }) {
    const [roleName, setRoleName] = useState("");
    const [superiorRole, setSuperiorRole] = useState("");

    useEffect(() => {
        if (role) {
            setRoleName(role.name || "");
            setSuperiorRole(role.superior || "");
        }
    }, [role]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{isEditing ? "Modifier la fonction" : "Détails de la fonction"}</h3>

                <div className="modal-body">
                    <div className="modal-grid">
                        <div className="form-group">
                            <label>Nom de la fonction</label>
                            <input 
                                type="text" 
                                value={roleName} 
                                onChange={(e) => setRoleName(e.target.value)} 
                                disabled={!isEditing} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Fonction supérieure</label>
                            <input 
                                type="text" 
                                value={superiorRole} 
                                onChange={(e) => setSuperiorRole(e.target.value)} 
                                disabled={!isEditing} 
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    {isEditing && <button className="save-btn">Enregistrer</button>}
                    <button className="close-btn" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    );
}

export default RoleModal;
