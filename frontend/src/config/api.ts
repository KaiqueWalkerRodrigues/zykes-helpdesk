// src/config/api.ts

// Detecta se está rodando localmente ou em outro dispositivo
const LOCAL_API = "http://localhost:81";
const NETWORK_API = "http://26.21.172.57:81";

const API_BASE =
  window.location.hostname === "localhost" ? LOCAL_API : NETWORK_API;

export default API_BASE;
