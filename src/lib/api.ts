import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  // Verifica se estamos no browser
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request URL:", config.url);
      console.log("Token usado:", token.substring(0, 50) + "...");
    } else {
      console.warn("Token não encontrado no localStorage");
    }
  }

  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      // Redirecionar para login se não estiver autenticado
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const tenant = currentPath.split("/")[1];
        window.location.href = `/${tenant}/login`;
      }
    }
    return Promise.reject(error);
  }
);
