import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import TableCargos from "../../components/tables/TableCargos";

export default function PageCargos() {
  const breadcrumbItems = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Configuracoes" },
    { name: "Cargos", path: "/configuracoes/cargos" },
  ];

  return (
    <div>
      <PageMeta title="Zykes | Configurações Cargos" description="" />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6">
        <ComponentCard title="Tabela Cargos">
          <TableCargos />
        </ComponentCard>
      </div>
    </div>
  );
}
