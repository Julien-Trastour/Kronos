import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import EmployeeManagement from './pages/EmployeeManagement';
import RolesManagement from './pages/RolesManagement';
import AgenciesManagement from './pages/AgenciesManagement';
import TeamsManagement from './pages/TeamsManagement';
import Login from './pages/Login';
import './styles/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/roles" element={<RolesManagement />} />
        <Route path="/agencies" element={<AgenciesManagement />} />
        <Route path="/teams" element={<TeamsManagement />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

