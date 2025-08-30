import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { UserFormData } from "../../types/schemas";
import TextInput from "../ui/form-component/InputField";

type BasicInfoProps = {
  register: UseFormRegister<UserFormData>;
  control: Control<UserFormData>;
  isEditing: boolean;
  errors: FieldErrors<UserFormData>;
};

function BasicInfo({ register, control, isEditing, errors }: BasicInfoProps) {
  return (
    <div className="bg-secondary/5 rounded-md p-4">
      <h3 className="text-text/70 mb-3 text-sm font-medium">
        Basic Information
      </h3>

      <div className="space-y-3">
        <TextInput<UserFormData>
          label="Full Name"
          name="name"
          type="text"
          register={register}
          control={control}
          isEditing={isEditing}
          error={errors.name}
        />

        <TextInput<UserFormData>
          label="Bio"
          name="bio"
          type="text"
          register={register}
          control={control}
          isEditing={isEditing}
          error={errors.bio}
        />
      </div>
    </div>
  );
}

export default BasicInfo;
