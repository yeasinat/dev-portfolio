import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { ExperienceProps } from "../../types/types";

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceProps) => void;
  experience?: ExperienceProps | null;
  size?: "sm" | "md" | "lg" | "xl";
  isEditing?: boolean;
}

type ExperienceFormData = {
  id: string;
  position: string;
  company: string;
  description: string;
};

const ExperienceForm = ({
  isOpen,
  onClose,
  onSubmit,
  experience,
  size,
  isEditing = false,
}: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    defaultValues: {
      position: "",
      company: "",
      description: "",
    },
  });

  // Reset form when initialData changes or modal opens/closes
  useEffect(() => {
    if (!experience) {
      reset({
        position: "",
        company: "",
        description: "",
      });
    } else {
      reset({
        position: experience?.position || "",
        company: experience?.company || "",
        description: experience?.description || "",
      });
    }
  }, [isOpen, experience, reset]);

  const handleFormSubmit = (data: ExperienceFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Experience" : "Add New Experience"}
      size={size}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Position/Role*
          </label>
          <input
            {...register("position", {
              required: "Position is required",
              minLength: {
                value: 2,
                message: "Position must be at least 2 characters",
              },
            })}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="Senior Frontend Developer"
          />
          {errors.position && (
            <p className="font-victor mt-1 text-xs text-red-400">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Company*
          </label>
          <input
            {...register("company", {
              required: "Company name is required",
              minLength: {
                value: 2,
                message: "Company name must be at least 2 characters",
              },
            })}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="TechCorp Inc."
          />
          {errors.company && (
            <p className="font-victor mt-1 text-xs text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Description*
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            rows={5}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="Describe your responsibilities, achievements, and technologies used..."
          />
          {errors.description && (
            <p className="font-victor mt-1 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border-secondary/30 font-poppins text-text hover:bg-secondary/10 rounded-md border bg-transparent px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary font-poppins text-text hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isEditing ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceForm;
