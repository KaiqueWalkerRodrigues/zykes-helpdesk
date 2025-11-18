// hooks/useAuth.js
import { useEffect, useState } from "react";
import API_BASE from "../config/api";

type Usuario = {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: boolean;
};

export function useAuth() {
  const [usuario, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE}/tokens?token=${token}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id_usuario) setUser(data);
      });
  }, []);

  return { usuario };
}
