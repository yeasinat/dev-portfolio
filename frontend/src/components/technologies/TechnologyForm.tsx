import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { TechnologyProps } from "../../types/types";
import { useEffect } from "react";

interface TechFormData {
  name: string;
  imgUrl: string;
  imgFile?: FileList;
}

interface TechFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  onSubmit: (formData: FormData) => void;
  size?: "sm" | "md" | "lg";
  technology?: TechnologyProps | null;
}

const TechnologyForm: React.FC<TechFormModalProps> = ({
  isOpen,
  onClose,
  isEditing,
  technology,
  onSubmit,
  size,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TechFormData>({
    defaultValues: {
      name: "",
      imgUrl: "",
    },
  });

  useEffect(() => {
    if (technology) {
      reset({
        name: technology.name || "",
        imgUrl: technology.imgUrl || "",
      });
    } else {
      reset({
        name: "",
        imgUrl: "",
      });
    }
  }, [technology, isOpen, reset]);

  const onFormSubmit = async (data: TechFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("imgUrl", data.imgUrl);

    if (data.imgFile && data.imgFile.length > 0) {
      formData.append("image", data.imgFile[0]);
    }

    if (technology?.id) {
      formData.append("id", technology.id);
    }

    await onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Technology" : "Add New Technology"}
      size={size}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Technology Name*
          </label>
          <input
            {...register("name", {
              required: "Technology name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="React, TypeScript, etc."
          />
          {errors.name && (
            <p className="font-victor mt-1 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-jetBrains text-text/70 mb-1 block text-sm">
            Logo File*
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("imgFile", {
              required: technology ? false : "Logo image is required",
            })}
            className="border-secondary/30 bg-secondary/5 font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
            placeholder="https://example.com/logo.svg"
          />
          {errors.imgFile && (
            <p className="font-victor mt-1 text-xs text-red-400">
              {errors.imgFile.message}
            </p>
          )}
          {technology?.imgUrl && (
            <div className="mt-2">
              <p className="text-text/70 text-xs">Current image:</p>
              <img
                src={technology.imgUrl}
                alt="Current project image"
                className="mt-1 h-20 w-auto rounded object-cover"
              />
            </div>
          )}
        </div>

        {/* <div className="pt-2">
          {watchImgUrl && (
            <div className="mb-4 flex items-center justify-center">
              <div className="border-secondary/20 overflow-hidden rounded border bg-white/5 p-2">
                <img
                  src={watchImgUrl}
                  alt="Technology logo preview"
                  className="h-16 w-16 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150?text=Invalid+URL";
                  }}
                />
              </div>
            </div>
          )}
        </div> */}

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
            className="bg-secondary font-poppins text-text hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium"
          >
            {isEditing ? "Update Technology" : "Add Technology"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TechnologyForm;
