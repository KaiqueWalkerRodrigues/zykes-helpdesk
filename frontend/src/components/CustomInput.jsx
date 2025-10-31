import React from "react";

/**
 * Componente de input reutilizável com TailwindCSS
 * Exemplo de uso:
 * <CustomInput
 *    label="E-mail"
 *    name="email"
 *    type="email"
 *    value={form.email}
 *    onChange={handleChange}
 * />
 */

export default function CustomInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Digite o ${label?.toLowerCase()}`}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg text-sm placeholder-gray-400 transition duration-150 ease-in-out
          ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
