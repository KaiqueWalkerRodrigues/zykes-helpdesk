import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";
import PageUsuarios from "./pages/configuracoes/PageUsuarios";
import PageCargos from "./pages/configuracoes/PageCargos";
import PageSetores from "./pages/configuracoes/PageSetores";
import PageEmpresas from "./pages/configuracoes/PageEmpresas";
import PageLogIn from "./pages/AuthPages/PageLogIn";
import PageLogout from "./pages/AuthPages/PageLogout";
import PageNotFound from "./pages/OtherPage/PageNotFound";
import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ROTAS PRIVADAS */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<PageHome />} />

            {/* Configurações */}
            <Route path="/configuracoes/cargos" element={<PageCargos />} />
            <Route path="/configuracoes/empresas" element={<PageEmpresas />} />
            <Route path="/configuracoes/setores" element={<PageSetores />} />
            <Route path="/configuracoes/usuarios" element={<PageUsuarios />} />

            {/* Outras páginas privadas */}
          </Route>
        </Route>

        {/* Login */}
        <Route path="/login" element={<PageLogIn />} />
        <Route path="/logout" element={<PageLogout />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
