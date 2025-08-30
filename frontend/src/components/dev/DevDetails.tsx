import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FiEdit2,
  FiSave,
  FiLoader,
} from "react-icons/fi";

import { useDev, useUpdateUser } from "../../hooks/useDev";
import { UserFormData, userSchema } from "../../types/schemas";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";

const DevDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { devData, devDataLoading, devDataError } = useDev();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateUser();

  const defaultValues: UserFormData = {
    name: "",
    bio: "",
    email: "",
    socialLinks: { github: "", linkedin: "", x: "" },
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  useEffect(() => {
    if (devData) {
      reset({
        name: devData.name ?? "",
        bio: devData.bio ?? "",
        email: devData.email ?? "",
        socialLinks: {
          github: devData?.socialLinks?.github ?? "",
          linkedin: devData?.socialLinks?.linkedin ?? "",
          x: devData?.socialLinks?.x ?? "",
        },
      });
    }
  }, [devData, reset]);

  // No changes needed to onSubmit or handleToggleEdit
  const onSubmit = useCallback(
    (data: UserFormData) => {
      const formData = new FormData();

      Object.entries(data).forEach(([k, v]) => {
        if (k === "socialLinks") {
          formData.append("socialLinks", JSON.stringify(v));
        } else {
          formData.append(k, v as string);
        }
      });

      //TODO: Add Image update as a form data

      updateMutate(formData);
    },
    [updateMutate],
  );

  const handleToggleEdit = useCallback(() => {
    if (isEditing) {
      handleSubmit(onSubmit)();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isEditing, handleSubmit, onSubmit]);

  const handleCancel = () => {
    reset(devData);
    setIsEditing(false);
  };

  if (devDataLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FiLoader className="text-accent h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (devDataError) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-red-500">
        <p className="text-lg">Failed to load developer details</p>
        <button
          className="bg-accent mt-4 rounded-md px-4 py-2 text-white"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["devDetails"] })
          }
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-secondary/10 mb-6 flex items-center justify-between border-b pb-4">
        <h2 className="font-poppins text-text text-xl font-bold">
          Developer Profile
        </h2>
        <div className="flex gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="border-secondary/20 hover:bg-secondary/10 text-text flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleToggleEdit}
            className="bg-accent flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <FiLoader className="animate-spin" /> Saving...
              </>
            ) : isEditing ? (
              <>
                <FiSave /> Save Changes
              </>
            ) : (
              <>
                <FiEdit2 /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 overflow-y-auto"
      >
        {/* Profile Picture */}
        <div className="flex items-center justify-center">
          <div className="relative h-84 w-84">
            <img
              src={devData?.imageUrl}
              alt="Profile"
              className="border-accent/20 h-84 w-84 rounded-full border-2 object-contain"
            />
            {isEditing && (
              <button
                type="button"
                className="bg-accent absolute right-0 bottom-0 rounded-full p-2 text-white"
              >
                <FiEdit2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <BasicInfo
          register={register}
          control={control}
          errors={errors}
          isEditing={isEditing}
        />

        {/* Contact Information */}
        <ContactInfo
          register={register}
          control={control}
          errors={errors}
          isEditing={isEditing}
        />

        {/* Social Links - updated to use nested fields */}
        <SocialLinks
          register={register}
          control={control}
          errors={errors}
          isEditing={isEditing}
        />
      </form>
    </div>
  );
};

export default DevDetails;
