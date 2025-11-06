import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const pageTitle = items.length > 0 ? items[items.length - 1].name : "";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            if (isLast) {
              return (
                <li
                  key={item.name}
                  className="text-sm text-gray-800 dark:text-white/90"
                >
                  {item.name}
                </li>
              );
            }

            return (
              <li key={item.name}>
                <Link
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                  to={item.path || "#"}
                >
                  {item.name}
                  <svg
                    className="stroke-current"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke=""
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
