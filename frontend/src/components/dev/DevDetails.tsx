import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  FiEdit2,
  FiSave,
  FiLoader,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  // FiMapPin,
} from "react-icons/fi";
import { fetchUser, updateUser } from "../../api/userApi";

type UserFormData = {
  name: string;
  role: string;
  bio: string;
  email: string;
  location?: string;
  socialLinks?: {
    github: string;
    linkedin: string;
    twitter: string;
  };
};

type UpdateUserParams = {
  id: string;
  formData: FormData;
};

const DevDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      email: "",
      location: "",
      socialLinks: {
        github: "",
        linkedin: "",
        twitter: "",
      },
    },
  });

  const {
    data: devData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (devData) {
      reset({
        name: devData.name,
        role: devData.role,
        bio: devData.bio,
        email: devData.email,
        location: devData.location,
        socialLinks: {
          github: devData.socialLinks.github,
          linkedin: devData.socialLinks.linkedin,
          twitter: devData.socialLinks.twitter,
        },
      });
    }
  }, [devData, reset]);

  const mutation = useMutation({
    mutationFn: (params: UpdateUserParams) => updateUser(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      setIsEditing(false);
    },
  });

  // No changes needed to onSubmit or handleToggleEdit
  const onSubmit = (data: UserFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("bio", data.bio);
    formData.append("email", data.email);

    //TODO: Add Image update as a form data

    if (data.socialLinks) {
      const socialLinksJson = {
        github: data.socialLinks.github,
        linkedin: data.socialLinks.linkedin,
        twitter: data.socialLinks.twitter,
      };
      formData.append("sodialLinks", JSON.stringify(socialLinksJson));
    }

    mutation.mutate({
      id: devData?.id,
      formData,
    });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      handleSubmit(onSubmit)();
    } else {
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FiLoader className="text-accent h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-red-500">
        <p className="text-lg">Failed to load developer details</p>
        <button
          className="bg-accent mt-4 rounded-md px-4 py-2 text-white"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["userDetails"] })
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
              onClick={() => {
                setIsEditing(false);
                // Reset form to original values
                if (devData) {
                  reset({
                    name: devData.name,
                    role: devData.role,
                    bio: devData.bio,
                    email: devData.email,
                    location: devData.location,
                    socialLinks: {
                      github: devData.socialLinks?.github || "",
                      linkedin: devData.socialLinks?.linkedin || "",
                      twitter: devData.socialLinks?.twitter || "",
                    },
                  });
                }
              }}
              className="border-secondary/20 hover:bg-secondary/10 text-text flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleToggleEdit}
            className="bg-accent flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white disabled:opacity-50"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
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
              src={devData?.imageUrl || "https://via.placeholder.com/100"}
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
        <div className="bg-secondary/5 rounded-md p-4">
          <h3 className="text-text/70 mb-3 text-sm font-medium">
            Basic Information
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-text/50 mb-1 block text-xs">
                Full Name
              </label>
              {isEditing ? (
                <>
                  <input
                    {...register("name")}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-text text-sm">{devData?.name}</p>
              )}
            </div>

            {/* <div>
              <label className="text-text/50 mb-1 block text-xs">
                Dev Role
              </label>
              {isEditing ? (
                <>
                  <input
                    {...register("role")}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                  />
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-text text-sm">{devData?.role}</p>
              )}
            </div> */}

            <div>
              <label className="text-text/50 mb-1 block text-xs">Bio</label>
              {isEditing ? (
                <>
                  <textarea
                    {...register("bio")}
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    rows={3}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.bio.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-text text-sm">{devData?.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-secondary/5 rounded-md p-4">
          <h3 className="text-text/70 mb-3 text-sm font-medium">
            Contact Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <FiMail className="text-text/50 mr-2 shrink-0" />
              {isEditing ? (
                <div className="w-full">
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-text text-sm">
                  {devData?.email || "Not provided"}
                </p>
              )}
            </div>

            {/* <div className="flex items-center">
              <FiMapPin className="text-text/50 mr-2 shrink-0" />
              {isEditing ? (
                <div className="w-full">
                  <input
                    {...register("location")}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    placeholder="Your location"
                  />
                </div>
              ) : (
                <p className="text-text text-sm">
                  {devData?.location || "Not provided"}
                </p>
              )}
            </div> */}
          </div>
        </div>

        {/* Social Links - updated to use nested fields */}
        <div className="bg-secondary/5 rounded-md p-4">
          <h3 className="text-text/70 mb-3 text-sm font-medium">
            Social Links
          </h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <FiGithub className="text-text/50 mr-2 shrink-0" />
              {isEditing ? (
                <div className="w-full">
                  <input
                    {...register("socialLinks.github", {
                      // pattern: {
                      //   value:
                      //     /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                      //   message: "Invalid GitHub URL",
                      // },
                    })}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    placeholder="GitHub URL"
                  />
                  {errors.socialLinks?.github && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.socialLinks.github.message}
                    </p>
                  )}
                </div>
              ) : (
                <a
                  href={devData?.socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline"
                >
                  {devData?.socialLinks?.github || "Not provided"}
                </a>
              )}
            </div>

            <div className="flex items-center">
              <FiLinkedin className="text-text/50 mr-2 shrink-0" />
              {isEditing ? (
                <div className="w-full">
                  <input
                    {...register("socialLinks.linkedin", {
                      // pattern: {
                      //   value:
                      //     /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                      //   message: "Invalid LinkedIn URL",
                      // },
                    })}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    placeholder="LinkedIn URL"
                  />
                  {errors.socialLinks?.linkedin && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.socialLinks.linkedin.message}
                    </p>
                  )}
                </div>
              ) : (
                <a
                  href={devData?.socialLinks?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline"
                >
                  {devData?.socialLinks?.linkedin || "Not provided"}
                </a>
              )}
            </div>

            <div className="flex items-center">
              <FiTwitter className="text-text/50 mr-2 shrink-0" />
              {isEditing ? (
                <div className="w-full">
                  <input
                    {...register("socialLinks.twitter", {
                      // pattern: {
                      //   value:
                      //     /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_-]+\/?$/,
                      //   message: "Invalid Twitter URL",
                      // },
                    })}
                    type="text"
                    className="border-secondary/20 bg-background w-full rounded border p-2 text-sm"
                    placeholder="Twitter URL"
                  />
                  {errors.socialLinks?.twitter && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.socialLinks.twitter.message}
                    </p>
                  )}
                </div>
              ) : (
                <a
                  href={devData?.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline"
                >
                  {devData?.socialLinks?.twitter || "Not provided"}
                </a>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DevDetails;
