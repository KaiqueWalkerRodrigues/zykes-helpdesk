import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import TableSetores from "../../components/tables/TableSetores";

export default function PageSetores() {
  const breadcrumbItems = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Configuracoes" },
    { name: "Setores", path: "/configuracoes/setores" },
  ];

  return (
    <div>
      <PageMeta title="Zykes | Configurações Setores" description="" />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6">
        <ComponentCard title="Tabela Setores">
          <TableSetores />
        </ComponentCard>
      </div>
    </div>
  );
}
