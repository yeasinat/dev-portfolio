import { FiAlertTriangle, FiEdit2, FiTrash2 } from "react-icons/fi";
import { TechnologyProps } from "../../types/types";

interface TechnologyGridProps {
  technologies: TechnologyProps[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onEdit: (technology: TechnologyProps) => void;
  onDelete: (id: string) => void;
}

const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  technologies = [],
  isLoading,
  isError,
  onEdit,
  onDelete,
}) => {
  const skeletonCount = 10;
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => i);

  return isLoading ? (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {skeletonArray.map((index) => (
        <div
          key={index}
          className="border-secondary/20 bg-secondary/5 flex animate-pulse flex-col items-center rounded-lg border p-4"
        >
          <div className="bg-secondary/20 mb-3 h-16 w-16 rounded-md" />
          <div className="bg-secondary/20 h-4 w-20 rounded" />
          <div className="bg-secondary/10 mt-2 h-3 w-16 rounded" />
        </div>
      ))}
    </div>
  ) : isError ? (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-red-400/20 bg-red-400/5 p-6 text-center">
      <FiAlertTriangle className="mb-3 text-4xl text-red-400" />
      <h3 className="font-poppins mb-2 text-lg font-medium text-red-400">
        Error Loading Technologies
      </h3>
      <p className="font-victor text-text/70">
        There was a problem loading your technologies. Please try again later.
      </p>
      <button
        className="border-secondary/30 bg-secondary/10 font-poppins text-text hover:bg-secondary/20 mt-4 rounded-md border px-4 py-2 text-sm transition-colors"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  ) : (
    <div>
      {technologies && technologies?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {technologies?.map((tech: TechnologyProps) => (
            <div
              key={tech.id}
              className="group border-secondary/20 bg-secondary/5 hover:border-accent/30 relative flex flex-col items-center rounded-lg border p-4 transition-all"
            >
              <div className="mb-3 h-16 w-16 overflow-hidden">
                <img
                  src={tech.imgUrl}
                  alt={tech.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-poppins text-text text-center text-sm font-medium">
                {tech.name}
              </h3>

              {/* Action buttons - visible on hover */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => onEdit(tech)}
                  className="text-text/70 hover:bg-secondary/20 hover:text-primary rounded p-1"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(tech.id)}
                  className="text-text/70 hover:bg-secondary/20 rounded p-1 hover:text-red-400"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-secondary/20 bg-secondary/5 flex h-40 items-center justify-center rounded-lg border">
          <p className="font-victor text-text/60">
            No technologies found. Add a new technology or adjust your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default TechnologyGrid;
