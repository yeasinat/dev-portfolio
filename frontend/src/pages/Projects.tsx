import ProjectCard from "../components/ui/ProjectCard";
import Button from "../components/ui/Button";
import { useFront } from "../hooks/useFront";
import { ProjectProps } from "../types/types";
import { HiPlus, HiViewGrid, HiViewList } from "react-icons/hi";
import { useState } from "react";

const ProjectsPage = () => {
  const { projectData, projectDataLoading } = useFront();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "featured">("all");

  // Loading state with skeleton
  if (projectDataLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <div className="bg-accent/20 mx-auto mb-4 h-12 w-96 animate-pulse rounded-lg"></div>
          <div className="bg-text/20 mx-auto h-6 w-[600px] animate-pulse rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="glass animate-pulse rounded-xl p-6">
              <div className="bg-accent/20 mb-6 aspect-video rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-text/20 h-6 w-3/4 rounded"></div>
                <div className="bg-text/20 h-4 w-full rounded"></div>
                <div className="bg-text/20 h-4 w-2/3 rounded"></div>
                <div className="flex gap-2">
                  <div className="bg-primary/20 h-6 w-16 rounded-full"></div>
                  <div className="bg-primary/20 h-6 w-20 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!projectData || projectData.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
        <div className="text-center">
          <div className="from-accent/20 to-primary/20 mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br">
            <div className="text-accent/60 text-6xl">📂</div>
          </div>
          <h2 className="font-jetBrains text-text mb-4 text-3xl font-bold">
            No Projects Yet
          </h2>
          <p className="font-victor text-text/70 mx-auto mb-8 max-w-md text-lg">
            Projects will appear here once they're added to your portfolio.
          </p>
          <Button variant="primary">
            <HiPlus className="mr-2" fontSize={20} />
            Add Your First Project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-accent/5 absolute top-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-primary/5 absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full blur-2xl"></div>
      </div>

      {/* Header Section */}
      <div className="animate-fade-in mb-16 text-center">
        <h1 className="font-jetBrains text-text mb-6 text-4xl font-bold md:text-6xl">
          My{" "}
          <span className="from-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="font-victor text-text/80 mx-auto max-w-3xl text-lg leading-relaxed md:text-xl">
          Explore my collection of projects that showcase my passion for
          creating innovative solutions and solving complex problems with modern
          technologies.
        </p>

        {/* Stats */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-accent font-jetBrains text-3xl font-bold">
              {projectData.length}
            </div>
            <div className="text-text/60 font-victor text-sm">
              Total Projects
            </div>
          </div>
          <div className="bg-accent/30 h-12 w-px"></div>
          <div className="text-center">
            <div className="text-primary font-jetBrains text-3xl font-bold">
              {
                new Set(
                  projectData.flatMap(
                    (p: ProjectProps) => p.technologiesUsed?.split(",") || [],
                  ),
                ).size
              }
            </div>
            <div className="text-text/60 font-victor text-sm">
              Technologies Used
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Filter Buttons */}
        <div className="flex gap-3">
          <Button
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All Projects ({projectData.length})
          </Button>
          <Button
            variant={filter === "featured" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("featured")}
          >
            Featured (0)
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-background/50 border-primary/20 flex gap-2 rounded-lg border p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded p-2 transition-colors duration-200 ${
              viewMode === "grid"
                ? "bg-accent text-background"
                : "text-accent hover:bg-accent/20"
            }`}
          >
            <HiViewGrid fontSize={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded p-2 transition-colors duration-200 ${
              viewMode === "list"
                ? "bg-accent text-background"
                : "text-accent hover:bg-accent/20"
            }`}
          >
            <HiViewList fontSize={20} />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className={` ${
          viewMode === "grid"
            ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-6"
        } `}
      >
        {projectData.map((project: ProjectProps, index: number) => (
          <div
            key={project.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <div className="glass mx-auto max-w-2xl rounded-2xl p-8">
          <h3 className="font-jetBrains text-text mb-4 text-2xl font-bold">
            Interested in working together?
          </h3>
          <p className="font-victor text-text/80 mb-6">
            I'm always open to discussing new opportunities and exciting
            projects.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
