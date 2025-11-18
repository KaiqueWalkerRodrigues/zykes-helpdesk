import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { validarToken } from "../../functions/validarToken";

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    async function verificar() {
      const ok = await validarToken();
      setAutorizado(ok);
      setLoading(false);
    }
    verificar();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!autorizado) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
