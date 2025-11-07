import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "danger"
    | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  form?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "sm",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  form,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    success:
      "bg-green-700 text-white shadow-theme-xs hover:bg-green-800 disabled:bg-green-300",
    danger:
      "bg-red-700 text-white shadow-theme-xs hover:bg-red-800 disabled:bg-red-300",
    secondary:
      "bg-gray-700 text-white shadow-theme-xs hover:bg-gray-800 disabled:bg-gray-300",
    warning:
      "bg-yellow-700 text-white shadow-theme-xs hover:bg-yellow-800 disabled:bg-yellow-300",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
