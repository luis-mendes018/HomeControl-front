import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7212/api/v1',
    headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    let message = "Erro inesperado ao comunicar com o servidor.";

    // API retornando TEXTO PURO
    if (typeof error?.response?.data === "string") {
      message = error.response.data;
    }
    // API retornando JSON { message }
    else if (error?.response?.data?.message) {
      message = error.response.data.message;
    }

    error.customMessage = message;

    return Promise.reject(error);
  }
);


export default api;