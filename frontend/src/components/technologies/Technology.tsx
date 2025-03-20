import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTech,
  deleteTech,
  fetchTechs,
  updateTech,
} from "../../api/techApi";
import { TechnologyProps } from "../../types/types";
import TechnologyGrid from "./TechnologyGrid";
import TechnologyForm from "./TechnologyForm";
import { toast } from "react-toastify";

const Technology = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTech, setCurrentTech] = useState<TechnologyProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: technologies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["technologies"],
    queryFn: fetchTechs,
    staleTime: 1000 * 60 * 2,
  });

  const queryClient = useQueryClient();

  const createTechMutation = useMutation({
    mutationFn: createTech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
    },
  });

  const updateTechMutation = useMutation({
    mutationFn: updateTech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      setIsModalOpen(false);
      setCurrentTech(null);
      setIsEditing(false);
    },
  });

  const deleteTechMutation = useMutation({
    mutationFn: deleteTech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
    },
  });

  const handleAddModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setCurrentTech(null);
  };

  const handleSubmitTech = (formData: FormData) => {
    if (isEditing && currentTech) {
      updateTechMutation.mutate({ id: currentTech.id, formData });
      toast.success("Technology updated successfully");
    } else {
      createTechMutation.mutateAsync(formData as unknown as TechnologyProps);
      toast.success("Technology added successfully");
    }

    setIsModalOpen(false);
  };

  const handleTechEdit = (formData: TechnologyProps) => {
    setCurrentTech(formData);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleTechDelete = (id: string) => {
    deleteTechMutation.mutate(id);
    toast.success("Technology deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-primary text-3xl font-bold">
            Technologies
          </h1>
          <p className="font-victor text-text/80 mt-2">
            Manage technologies and skills to showcase in your portfolio
          </p>
        </div>
        <button
          onClick={handleAddModal}
          className="bg-secondary font-poppins text-text hover:bg-secondary/80 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <FiPlus /> Add Technology
        </button>
      </div>

      {/* Technology Grid */}
      <TechnologyGrid
        technologies={technologies}
        isLoading={isLoading}
        isError={isError}
        onDelete={handleTechDelete}
        onEdit={handleTechEdit}
      />

      {/* Technology Form Modal*/}

      <TechnologyForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTech(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        technology={currentTech}
        onSubmit={handleSubmitTech}
        size="sm"
      />
    </div>
  );
};

export default Technology;
