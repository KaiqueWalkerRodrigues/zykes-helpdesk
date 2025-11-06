import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import TableUsuarios from "../../components/tables/TableUsuarios";

export default function PageUsuarios() {
  const breadcrumbItems = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Configuracoes" },
    { name: "Usuários", path: "/configuracoes/usuarios" },
  ];

  return (
    <div>
      <PageMeta title="Zykes | Configurações Usuários" description="" />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6">
        <ComponentCard title="Tabela Usuários">
          <TableUsuarios />
        </ComponentCard>
      </div>
    </div>
  );
}
