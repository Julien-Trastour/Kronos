import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_BASE_URL}/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Erreur lors du chargement des employés");

                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Gestion des Employés</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.first_name} {employee.last_name} - {employee.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeManagement;
