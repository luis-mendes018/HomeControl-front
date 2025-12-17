import React from "react";
import Modal from "./Modal";

interface SelectOption {
  value: string | number;
  label: string;
}

export type Field =
  | {
      name: string;
      label: string;
      type: "text" | "number";
      required?: boolean;
      maxLength?: number;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: SelectOption[];
      required?: boolean;
    };

interface FormModalProps {
  title: string;
  isOpen: boolean;
  fields: Field[];
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  defaultValues?: Record<string, any>;
}

export default function FormModal({
  title,
  isOpen,
  fields,
  onClose,
  onSubmit,
  defaultValues,
}: FormModalProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );

  // Atualiza formData sempre que defaultValues mudar (ex.: edição)
  React.useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        setFormData(defaultValues);
      } else {
        setFormData({});
      }
    }
  }, [defaultValues, isOpen]);

  function handleChange(name: string, value: any) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors: Record<string, string> = {};

    for (const field of fields) {
      const value = formData[field.name];

      if (field.required && !value) {
        errors[field.name] = `O campo "${field.label}" é obrigatório.`;
        continue;
      }

      if (
        field.type === "text" &&
        field.maxLength &&
        value &&
        value.length > field.maxLength
      ) {
        errors[
          field.name
        ] = `O campo "${field.label}" não pode ter mais que ${field.maxLength} caracteres.`;
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    onSubmit(formData);
    setFormErrors({});
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>

            {field.type === "text" && (
              <>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {formErrors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors[field.name]}
                  </p>
                )}
              </>
            )}

            {field.type === "select" && (
              <>
                <select
                  className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  value={formData[field.name] ?? ""}
                >
                  <option value="">Selecione</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {formErrors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors[field.name]}
                  </p>
                )}
              </>
            )}

            {field.type === "number" && (
              <>
                <input
                  type="number"
                  min="0"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData[field.name] ?? ""}
                  onChange={(e) =>
                    handleChange(
                      field.name,
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
                {formErrors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors[field.name]}
                  </p>
                )}
              </>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
