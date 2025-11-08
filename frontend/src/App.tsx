import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import PageHome from "./pages/PageHome";
import PageUsuarios from "./pages/configuracoes/PageUsuarios";
import PageCargos from "./pages/configuracoes/PageCargos";
import PageSetores from "./pages/configuracoes/PageSetores";
import PageEmpresas from "./pages/configuracoes/PageEmpresas";
import PageLogIn from "./pages/AuthPages/PageLogIn";
import PageNotFound from "./pages/OtherPage/PageNotFound";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<PageHome />} />

            {/* Configurações */}
            <Route
              index
              path="/configuracoes/cargos"
              element={<PageCargos />}
            />
            <Route
              index
              path="/configuracoes/empresas"
              element={<PageEmpresas />}
            />
            <Route
              index
              path="/configuracoes/setores"
              element={<PageSetores />}
            />
            <Route
              index
              path="/configuracoes/usuarios"
              element={<PageUsuarios />}
            />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Auth Layout */}
          <Route path="/login" element={<PageLogIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}
