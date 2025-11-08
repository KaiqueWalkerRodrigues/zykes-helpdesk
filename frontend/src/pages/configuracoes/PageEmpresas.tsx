import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import TableEmpresas from "../../components/tables/TableEmpresas";

export default function PageEmpresas() {
  const breadcrumbItems = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Configuracoes" },
    { name: "Empresas", path: "/configuracoes/empresas" },
  ];

  return (
    <div>
      <PageMeta title="Zykes | Configurações Empresas" description="" />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6">
        <ComponentCard title="Tabela Empresas">
          <TableEmpresas />
        </ComponentCard>
      </div>
    </div>
  );
}
