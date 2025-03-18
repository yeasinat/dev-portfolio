
import { FiEdit2, FiExternalLink, FiGithub, FiTrash2 } from "react-icons/fi";
import { ProjectProps } from "../../types/types";

interface ProjectGridProps {
  projects: ProjectProps[] | undefined;
  isLoading: boolean;
  isError: boolean;

  onEdit: ( project: ProjectProps) => void;
  onDelete: (id: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects = [],
  isLoading,
  isError,
  onEdit,
  onDelete
}) => {
  return isLoading ? (
    // Skeleton loading
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="border-secondary/20 bg-secondary/5 animate-pulse overflow-hidden rounded-lg border"
        >
          {/* Skeleton image */}
          <div className="bg-secondary/20 relative h-48 w-full"></div>

          {/* Skeleton content */}
          <div className="p-4">
            {/* Skeleton title */}
            <div className="bg-secondary/30 mb-4 h-6 w-3/4 rounded"></div>

            {/* Skeleton description lines */}
            <div className="bg-secondary/30 mb-2 h-4 w-full rounded"></div>
            <div className="bg-secondary/30 mb-4 h-4 w-5/6 rounded"></div>

            {/* Skeleton tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              <div className="bg-secondary/30 h-6 w-16 rounded-full"></div>
              <div className="bg-secondary/30 h-6 w-20 rounded-full"></div>
              <div className="bg-secondary/30 h-6 w-12 rounded-full"></div>
            </div>

            {/* Skeleton footer */}
            <div className="border-secondary/10 mt-4 flex justify-between border-t pt-4">
              <div className="flex space-x-3">
                <div className="bg-secondary/30 h-5 w-5 rounded-full"></div>
                <div className="bg-secondary/30 h-5 w-5 rounded-full"></div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-secondary/30 h-5 w-5 rounded-full"></div>
                <div className="bg-secondary/30 h-5 w-5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : isError ? (
    // Error state
    <div className="border-secondary/20 bg-secondary/5 flex h-40 items-center justify-center rounded-lg border">
      <div className="flex flex-col items-center space-y-2 px-4 text-center">
        <p className="font-victor text-red-400">Error loading projects</p>
        <p className="font-victor text-text/60 text-sm">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    </div>
  ) : (
    // Projects or empty state
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border-secondary/20 bg-secondary/5 hover:border-accent/30 overflow-hidden rounded-lg border transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imgUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-poppins text-primary text-xl font-bold">
                  {project.title}
                </h3>
                <p className="font-jetBrains text-text/80 mt-2 line-clamp-2 text-sm">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {/* {project?.technologiesUsed?.map((tech, index) => ( */}
                    <span
                      // key={index}
                      className="bg-secondary/20 font-jetBrains text-accent rounded-full px-2 py-1 text-xs"
                    >
                      {project.technologiesUsed}
                    </span>
                  {/* ))} */}
                </div>

                <div className="border-secondary/10 mt-4 flex justify-between border-t pt-4">
                  <div className="flex space-x-3">
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text/70 hover:text-accent"
                      >
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text/70 hover:text-accent"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(project)}
                      className="text-text/70 hover:text-primary"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(project.id)}
                      className="text-text/70 hover:text-red-400"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-secondary/20 bg-secondary/5 flex h-40 items-center justify-center rounded-lg border">
          <p className="font-victor text-text/60">
            No projects found. Add a new project or adjust your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
