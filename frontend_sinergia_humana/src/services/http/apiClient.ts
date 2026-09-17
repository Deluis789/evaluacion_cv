import axios from "axios";
import { env } from "@/config/env";

/**
 * Cliente Axios centralizado.
 *
 * Este es el ÚNICO lugar donde debería configurarse Axios en toda la
 * aplicación. Ningún componente ni hook debe importar Axios directamente:
 * siempre se debe pasar por un servicio (services/api/*) que a su vez
 * decide si usar este cliente HTTP real o el mock correspondiente
 * (ver services/mock).
 *
 * Cuando VITE_USE_MOCKS=false, los servicios en services/api usarán
 * este cliente para hablar con la API de Django REST Framework.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Placeholder para autenticación futura basada en JWT.
// Cuando se implemente el login real contra Django, el token se
// adjuntará aquí (por ejemplo leyéndolo de memoria/estado, nunca de
// localStorage en texto plano si se puede evitar).
apiClient.interceptors.request.use((config) => {
  // Intentamos obtener el token que guardamos al iniciar sesión
  const isLoginUrl = config.url && config.url.includes("/auth/login/");
  const token = localStorage.getItem("token");
  console.log("Interceptor ejecutándose. Token encontrado:", token);
  //if (token) {
    // Inyectamos el encabezado Authorization. 
    // Nota: Si tu Django usa JWT estándar, se suele usar 'Bearer'.
    // Si usa el sistema nativo de Django, cámbialo por 'Token' o según tu backend.
    //config.headers.Authorization = `Bearer ${token}`;
  //} else {
    //console.warn("¡Ojo! No se encontró ningún token en LocalStorage para esta petición.");
  //}
  if (token && !isLoginUrl) {
    console.log("Interceptor ejecutándose. Añadiendo token a ruta protegida.");
    config.headers.Authorization = `Bearer ${token}`;
  } else if (isLoginUrl) {
    console.log("Petición de Login detectada. Omitiendo token para evitar conflictos.");
  } else {
    console.warn("¡Ojo! No se encontró ningún token en LocalStorage para esta petición.");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "Ocurrió un error de comunicación con el servidor.";
    return Promise.reject({
      message,
      status: error?.response?.status,
      fieldErrors: error?.response?.data?.errors,
    });
  }
);
