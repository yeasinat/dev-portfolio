import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import ProjectForm from "./ProjectForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../api/projectApi";
import ProjectGrid from "./ProjectGrid";
import { ProjectProps } from "../../types/types";

const Project = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectProps | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 1,
  });

  // Create project
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // setIsModalOpen(true);
    },
  });

  //Update project
  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsModalOpen(false);
      setCurrentProject(null);
      setIsEditing(false);
    },
  });

  // Delete project
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleOpenAddModal = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleEditProject = (project: ProjectProps) => {
    setCurrentProject(project);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDeleteProject = (id: string) => {
    deleteProjectMutation.mutate(id);
  };

  const handleSubmitProject = (formData: FormData) => {
    if (isEditing && currentProject) {
      // For update operation
      updateProjectMutation.mutate({
        id: currentProject.id,
        formData,
      });
    } else {
      // For create operation
      createProjectMutation.mutate(formData as unknown as ProjectProps);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-primary text-3xl font-bold">
            Projects
          </h1>
          <p className="font-victor text-text/80 mt-2">
            Manage and showcase your development projects
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-secondary font-poppins text-text hover:bg-secondary/80 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <FiPlus /> Add New Project
        </button>
      </div>

      {/* Search and Filter */}
      {/* <div className="border-secondary/20 bg-secondary/5 flex flex-wrap gap-4 rounded-lg border p-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-secondary/30 bg-background font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
          />
        </div>
        <div className="w-48">
          <select
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            className="border-secondary/30 bg-background font-victor text-text focus:border-accent w-full rounded-md border px-4 py-2 outline-none"
          >
            <option value="">All Technologies</option>
            {allTechnologies.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Projects Grid */}
      <ProjectGrid
        projects={projects}
        isLoading={projectLoading}
        isError={projectError}
        onDelete={handleDeleteProject}
        onEdit={handleEditProject}
      />

      {/* Project Modal */}
      <ProjectForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentProject(null);
          setIsEditing(false);
        }}
        size="lg"
        project={currentProject}
        isEditing={isEditing}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
};

export default Project;
