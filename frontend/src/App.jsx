import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeManagement from "./pages/EmployeeManagement";
import RoleManagement from "./pages/RoleManagement";
import PermissionManagement from "./pages/PermissionManagement";
import TeamManagement from "./pages/TeamManagement";

function App() {
    return (
        <Router>
            <DashboardLayout>
                <Routes>
                    <Route path="/home" element={<h1>Accueil</h1>} />
                    <Route path="/profile" element={<h1>Profil</h1>} />
                    <Route path="/employees/manage" element={<EmployeeManagement />} />
                    <Route path="/employees/roles" element={<RoleManagement />} />
                    <Route path="/employees/permissions" element={<PermissionManagement />} />
                    <Route path="/employees/teams" element={<TeamManagement />} />
                    <Route path="/settings" element={<h1>Paramètres</h1>} />
                </Routes>
            </DashboardLayout>
        </Router>
    );
}

export default App;
