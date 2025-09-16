import { ProjectProps } from "../../types/types";
import Card from "./Card";
import Button from "./Button";
import { HiExternalLink, HiCode, HiCalendar } from "react-icons/hi";

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  // Parse technologies from string to array
  const technologies = project.technologiesUsed
    ? project.technologiesUsed.split(",").map((tech) => tech.trim())
    : [];

  return (
    <Card className="group flex h-full flex-col" hover={true}>
      {/* Project Image */}
      <div className="relative mb-6 overflow-hidden rounded-lg">
        {project.imgUrl ? (
          <img
            src={project.imgUrl}
            alt={project.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="from-accent/20 to-primary/20 relative flex aspect-video items-center justify-center bg-gradient-to-br">
            <div className="text-accent/60 text-6xl">🚀</div>
            <div className="from-background/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
          </div>
        )}
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="font-poppins text-text group-hover:text-accent line-clamp-2 text-xl font-bold transition-colors duration-300">
            {project.title}
          </h3>

          {project.createdAt && (
            <div className="text-text/60 font-victor flex items-center text-sm">
              <HiCalendar className="mr-2" fontSize={14} />
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-victor text-text/80 line-clamp-3 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-sm font-medium">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3 pt-4">
          {project.liveLink && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-sm"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              <HiExternalLink className="mr-2" fontSize={16} />
              Live Demo
            </Button>
          )}

          {project.repoLink && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-sm"
              onClick={() => window.open(project.repoLink, "_blank")}
            >
              <HiCode className="mr-2" fontSize={16} />
              Code
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
