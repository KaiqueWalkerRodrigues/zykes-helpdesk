import { useEffect } from "react";
import API_BASE from "../../config/api";

export default function PageLogout() {
  useEffect(() => {
    async function processLogout() {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await fetch(`${API_BASE}/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error("Erro ao comunicar logout:", err);
        }
      }

      // limpa localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("keepLogged");

      // redireciona
      window.location.href = "/login";
    }

    processLogout();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-lg text-gray-600 dark:text-gray-300">
      Encerrando sessão...
    </div>
  );
}
