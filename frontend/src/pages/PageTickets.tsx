import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function PageTickets() {
  const breadcrumbItems = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Tickets", path: "/tickets" },
  ];

  return (
    <div>
      <PageMeta title="Zykes | Tickets" description="" />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6"></div>
    </div>
  );
}
