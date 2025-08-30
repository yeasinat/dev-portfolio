import {
  FieldError,
  Path,
  UseFormRegister,
  useWatch,
  Control,
  FieldValues,
} from "react-hook-form";
import { IconType } from "react-icons";

type TextInputProps<TFormValues extends FieldValues> = {
  label?: string;
  icon?: IconType;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  control: Control<TFormValues>;
  isEditing: boolean;
  type?: string;
  error?: FieldError;
  isLink?: boolean;
};

function TextInput<TFormValues extends FieldValues>({
  label,
  name,
  register,
  control,
  isEditing,
  type,
  error,
  icon: Icon,
  isLink = false,
}: TextInputProps<TFormValues>) {
  // Automatically watch the field value from react-hook-form
  const fieldValue = useWatch({
    control,
    name,
  });

  const displayValue = String(fieldValue || "");

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-text/50 mb-1 block text-xs">{label}</label>
      )}
      <div className="flex items-center">
        {Icon && <Icon className="text-text/50 mr-2 shrink-0" />}
        {isEditing ? (
          <input
            {...register(name)}
            type={type}
            className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
          />
        ) : isLink && displayValue ? (
          <a
            href={displayValue}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline"
          >
            {displayValue || "Not provided"}
          </a>
        ) : (
          <p className="text-text text-sm">{displayValue || "Not provided"}</p>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default TextInput;
