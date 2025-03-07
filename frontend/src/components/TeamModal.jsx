import React, { useState, useEffect } from "react";

function TeamModal({ employee, isOpen, onClose, agencies }) {
    const [selectedAgency, setSelectedAgency] = useState("");

    useEffect(() => {
        if (employee) {
            setSelectedAgency(employee.agency);
        }
    }, [employee]);

    if (!isOpen || !employee) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Modifier l'agence de {employee.name}</h3>

                <div className="modal-body">
                    <label>Nouvelle agence</label>
                    <select value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)}>
                        {agencies.map((agency) => (
                            <option key={agency} value={agency}>
                                {agency}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-footer">
                    <button className="save-btn">Enregistrer</button>
                    <button className="close-btn" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    );
}

export default TeamModal;
