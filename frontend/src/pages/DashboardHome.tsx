import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || (role !== 'PDG' && role !== 'Administrateur')) {
      navigate('/'); // Redirection si pas autorisé
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <h1>Bienvenue sur votre tableau de bord</h1>
    </DashboardLayout>
  );
};

export default DashboardHome;
