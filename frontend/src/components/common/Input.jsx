import { useFormContext } from "react-hook-form";

function Input({
  name,
  label,
  type = "text",
  placeholder,
  rules = {},
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div>
      <label className="mb-2 block font-semibold text-slate-700 dark:text-gray-200">
        {label}
        {rules.required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          transition-all
          duration-300
          bg-white
          text-slate-900
          placeholder:text-gray-400
          dark:bg-slate-800
          dark:text-white
          dark:placeholder:text-gray-500
          focus:outline-none
          focus:ring-2

          ${
            error
              ? "border-red-500 focus:ring-red-400 dark:border-red-400"
              : "border-gray-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-400"
          }
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Input;