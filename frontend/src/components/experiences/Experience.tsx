import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiBriefcase } from "react-icons/fi";
import {
  createExperience,
  deleteExperience,
  fetchExperiences,
  updateExperience,
} from "../../api/expApi";
import { useState } from "react";
import ExperienceList from "./ExperienceList";
import ExperienceForm from "./ExperienceForm";
import { ExperienceProps } from "../../types/types";

const Experience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<ExperienceProps | null>(null);

  const {
    data: experiences,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  const queryClient = useQueryClient();

  const createExpMutation = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  const updateExpMutation = useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      setIsModalOpen(false);
      setCurrentExp(null);
      setIsEditing(false);
    },
  });

  const deleteExpMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  const handleAddModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setCurrentExp(null);
  };

  const handleSubmitExp = (formData: ExperienceProps) => {
    if (isEditing && currentExp) {
      updateExpMutation.mutate({
        id: currentExp.id,
        formData: formData as unknown as FormData,
      });
    } else {
      createExpMutation.mutate(formData);
    }

    setIsModalOpen(false);
  };

  const handleEdit = (formData: ExperienceProps) => {
    setCurrentExp(formData);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteExpMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-primary text-3xl font-bold">
            Experiences
          </h1>
          <p className="font-victor text-text/80 mt-2">
            Manage your professional experience and work history
          </p>
        </div>
        <button
          onClick={handleAddModal}
          className="bg-secondary font-poppins text-text hover:bg-secondary/80 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <FiPlus /> Add Experience
        </button>
      </div>

      {/* Empty state */}
      {experiences?.length === 0 && (
        <div className="border-secondary/20 bg-secondary/5 flex h-60 flex-col items-center justify-center rounded-lg border p-6 text-center">
          <FiBriefcase className="text-primary/50 mb-3 text-4xl" />
          <h3 className="font-poppins text-primary mb-2 text-lg font-medium">
            No experiences yet
          </h3>
          <p className="font-victor text-text/70">
            Add your professional experiences to showcase in your portfolio.
          </p>
          <button className="bg-secondary font-poppins text-text hover:bg-secondary/80 mt-4 rounded-md px-4 py-2 text-sm transition-colors">
            Add Your First Experience
          </button>
        </div>
      )}

      {/* Experiences List */}
      <ExperienceList
        experiences={experiences}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExperienceForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentExp(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        experience={currentExp}
        onSubmit={handleSubmitExp}
        size="xl"
      />
    </div>
  );
};

export default Experience;
