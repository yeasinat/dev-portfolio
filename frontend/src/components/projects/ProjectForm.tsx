import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "../ui/Modal";
import { ProjectProps } from "../../types/types";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectProps | null;
  onSubmit: (project: FormData) => void;
  isEditing?: boolean;
  size?: "sm" | "md" | "lg";
}

interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  technologiesUsed: string;
  imgFile: FileList;
  repoLink: string;
  liveLink: string;
}

const ProjectForm: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  project,
  onSubmit,
  isEditing = false,
  size,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      technologiesUsed: "",
      repoLink: "",
      liveLink: "",
    },
  });

  // Initialize form with project data if editing
  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        description: project.description || "",
        technologiesUsed: project.technologiesUsed || "",
        repoLink: project.repoLink || "",
        liveLink: project.liveLink || "",
      });
    } else {
      // Reset form for new project
      reset({
        title: "",
        description: "",
        technologiesUsed: "",
        repoLink: "",
        liveLink: "",
      });
    }
  }, [project, isOpen, reset]);

  const onFormSubmit = async (data: ProjectFormData) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("technologiesUsed", data.technologiesUsed);

    // Only append image if a new file is selected
    if (data.imgFile && data.imgFile.length > 0) {
      formData.append("image", data.imgFile[0]);
    }

    formData.append("repoLink", data.repoLink || "");
    formData.append("liveLink", data.liveLink || "");

    if (project?.id) {
      formData.append("id", project.id);
    }

    // Submit formData to parent component
    await onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Project" : "Add New Project"}
      size={size}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="font-jetBrains text-text/70 mb-1 block text-sm">
              Project Title*
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
              placeholder="My Awesome Project"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-jetBrains text-text/70 mb-1 block text-sm">
              Project Image*
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("imgFile", {
                required: project ? false : "Project image is required",
              })}
              className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            />
            {errors.imgFile && (
              <p className="mt-1 text-xs text-red-500">
                {errors.imgFile.message}
              </p>
            )}
            {project?.imgUrl && (
              <div className="mt-2">
                <p className="text-text/70 text-xs">Current image:</p>
                <img
                  src={project.imgUrl}
                  alt="Current project image"
                  className="mt-1 h-20 w-auto rounded object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Description*
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="A brief description of your project..."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Technologies* (comma separated)
          </label>
          <input
            {...register("technologiesUsed", {
              required: "Technologies are required",
            })}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="React, TypeScript, Node.js"
          />
          {errors.technologiesUsed && (
            <p className="mt-1 text-xs text-red-500">
              {errors.technologiesUsed.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="font-jetBrains text-text/70 mb-1 block text-sm">
              GitHub URL
            </label>
            <input
              {...register("repoLink", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Must be a valid URL",
                },
              })}
              className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
              placeholder="https://github.com/username/repo"
            />
            {errors.repoLink && (
              <p className="mt-1 text-xs text-red-500">
                {errors.repoLink.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-jetBrains text-text/70 mb-1 block text-sm">
              Live URL
            </label>
            <input
              {...register("liveLink", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Must be a valid URL",
                },
              })}
              className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
              placeholder="https://myproject.com"
            />
            {errors.liveLink && (
              <p className="mt-1 text-xs text-red-500">
                {errors.liveLink.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="border-secondary/30 font-poppins text-text hover:bg-secondary/10 rounded-md border bg-transparent px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary font-poppins text-text hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium"
          >
            {isEditing ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectForm;
