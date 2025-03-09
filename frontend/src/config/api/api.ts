import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // 🔹 Mets ici l'URL du backend

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 GESTION GLOBALE DES ERREURS
export const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    console.error("Erreur API :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Une erreur s'est produite.");
  }
};
