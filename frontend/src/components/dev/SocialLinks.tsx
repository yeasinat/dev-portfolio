import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FiGithub, FiLinkedin, FiX } from "react-icons/fi";

import { UserFormData } from "../../types/schemas";
import TextInput from "../ui/form-component/InputField";

type SocialLinksProps = {
  register: UseFormRegister<UserFormData>;
  control: Control<UserFormData>;
  errors: FieldErrors<UserFormData>;
  isEditing: boolean;
};

function SocialLinks({register, control, errors, isEditing}:SocialLinksProps) {
  return (
    <div className="bg-secondary/5 rounded-md p-4">
      <h3 className="text-text/70 mb-3 text-sm font-medium">Social Links</h3>

      <div className="space-y-3">
        <TextInput<UserFormData>
          name="socialLinks.github"
          register={register}
          control={control}
          icon={FiGithub}
          isEditing={isEditing}
          error={errors.socialLinks?.github}
          isLink
        />

        <TextInput<UserFormData>
          name="socialLinks.linkedin"
          register={register}
          control={control}
          icon={FiLinkedin}
          isEditing={isEditing}
          error={errors.socialLinks?.linkedin}
          isLink
        />
        <TextInput<UserFormData>
          name="socialLinks.x"
          register={register}
          control={control}
          icon={FiX}
          isEditing={isEditing}
          error={errors.socialLinks?.x}
          isLink
        />
      </div>
    </div>
  );
}

export default SocialLinks;
