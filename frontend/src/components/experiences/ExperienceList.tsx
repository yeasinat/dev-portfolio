import { FiEdit2, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { ExperienceProps } from "../../types/types";

interface ExperienceListProps {
  experiences: ExperienceProps[] | null;
  isLoading: boolean;
  isError: boolean;
  onEdit: (experience: ExperienceProps) => void;
  onDelete: (id: string) => void;
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences = [],
  isLoading,
  isError,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="border-secondary/20 bg-secondary/5 animate-pulse rounded-lg border p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="w-full">
                  <div className="bg-secondary/30 mb-2 h-6 w-3/4 rounded"></div>
                  <div className="bg-secondary/20 h-4 w-1/2 rounded"></div>
                </div>
                <div className="flex space-x-2 sm:self-start">
                  <div className="bg-secondary/20 h-9 w-9 rounded"></div>
                  <div className="bg-secondary/20 h-9 w-9 rounded"></div>
                </div>
              </div>
              <div className="bg-secondary/10 mt-4 h-20 w-full rounded"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-text rounded-lg border border-red-500/30 bg-red-50/10 p-6">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-red-400" size={20} />
            <h3 className="font-poppins text-lg font-medium">
              Error loading experience data
            </h3>
          </div>
          <p className="font-victor text-text/80 mt-2">
            There was a problem fetching your experience data. Please try again
            later.
          </p>
          <button
            className="bg-secondary/20 hover:bg-secondary/30 mt-4 rounded px-4 py-2 text-sm font-medium"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      ) : !experiences || experiences.length === 0 ? (
        <div className="border-secondary/20 bg-secondary/5 text-text/70 rounded-lg border p-6 text-center">
          <p className="font-victor">No experience entries found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="group border-secondary/20 bg-secondary/5 hover:border-accent/30 rounded-lg border p-6 transition-all"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="font-poppins text-primary text-xl font-bold">
                    {experience.position}
                  </h3>
                  <div className="font-victor text-accent mt-1">
                    {experience.company}
                  </div>
                </div>

                <div className="flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100 sm:self-start">
                  <button
                    className="text-text/70 hover:bg-secondary/20 hover:text-primary rounded p-2"
                    aria-label={`Edit ${experience.position} at ${experience.company}`}
                    onClick={() => onEdit(experience)}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="text-text/70 hover:bg-secondary/20 rounded p-2 hover:text-red-400"
                    aria-label={`Delete ${experience.position} at ${experience.company}`}
                    onClick={() => onDelete(experience.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="font-victor text-text/80 mt-4">
                {experience.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceList;
