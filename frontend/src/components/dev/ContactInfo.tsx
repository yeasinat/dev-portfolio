import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import TextInput from "../ui/form-component/InputField";
import { UserFormData } from "../../types/schemas";
import { FiMail } from "react-icons/fi";

type ContactInfoProps = {
  register: UseFormRegister<UserFormData>;
  control: Control<UserFormData>;
  errors: FieldErrors<UserFormData>;
  isEditing: boolean;
};

function ContactInfo({
  register,
  control,
  errors,
  isEditing,
}: ContactInfoProps) {
  return (
    <div className="bg-secondary/5 rounded-md p-4">
      <h3 className="text-text/70 mb-3 text-sm font-medium">
        Contact Information
      </h3>

      <div className="space-y-3">
        <TextInput<UserFormData>
          label="Email"
          name="email"
          register={register}
          control={control}
          icon={FiMail}
          isEditing={isEditing}
          error={errors.email}
        />
      </div>
    </div>
  );
}

export default ContactInfo;
