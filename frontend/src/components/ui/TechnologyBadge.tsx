import { TechnologyProps } from "../../types/types";

interface TechnologyBadgeProps {
  technology: TechnologyProps;
  size?: "xs" | "sm" | "md";
}

const TechnologyBadge = ({ technology, size = "sm" }: TechnologyBadgeProps) => {
  const sizeClasses = {
    xs: "p-2 space-y-1",
    sm: "p-3 space-y-2",
    md: "p-4 space-y-3",
  };

  const iconSizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="from-accent/20 to-primary/20 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Main badge */}
      <div
        className={`bg-background/40 border-primary/20 group-hover:border-accent/40 group-hover:bg-background/60 flex cursor-pointer flex-col items-center rounded-lg border text-center backdrop-blur-sm transition-all duration-300 ${sizeClasses[size]} `}
      >
        {/* Technology Icon/Image */}
        <div className="relative">
          {technology.imgUrl ? (
            <div
              className={`${iconSizes[size]} bg-background/30 overflow-hidden rounded p-1 transition-transform duration-300 group-hover:scale-110`}
            >
              <img
                src={technology.imgUrl}
                alt={technology.name}
                className="h-full w-full object-contain filter transition-all duration-300 group-hover:brightness-110"
              />
            </div>
          ) : (
            <div
              className={`${iconSizes[size]} from-accent/30 to-primary/30 flex items-center justify-center rounded bg-gradient-to-br transition-transform duration-300 group-hover:scale-110`}
            >
              <span
                className={`${size === "xs" ? "text-sm" : size === "sm" ? "text-lg" : "text-xl"} text-accent group-hover:text-primary font-bold transition-colors duration-300`}
              >
                {technology.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Technology Name */}
        <span
          className={`font-victor text-text/90 group-hover:text-accent line-clamp-1 font-medium transition-colors duration-300 ${textSizes[size]}`}
        >
          {technology.name}
        </span>
      </div>
    </div>
  );
};

export default TechnologyBadge;
