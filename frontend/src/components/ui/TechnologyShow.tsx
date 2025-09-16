import { TechnologyProps } from "../../types/types";

const TechnologyShow = ({ technology }: { technology: TechnologyProps }) => {
  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="from-accent/20 to-primary/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Main card */}
      <div className="glass hover-lift border-primary/20 group-hover:border-accent/40 flex h-full flex-col items-center space-y-3 rounded-xl border p-4 text-center transition-all duration-300">
        {/* Technology Icon/Image */}
        <div className="relative">
          {technology.imgUrl ? (
            <div className="bg-background/50 h-12 w-12 overflow-hidden rounded-lg p-2 transition-transform duration-300 group-hover:scale-110">
              <img
                src={technology.imgUrl}
                alt={technology.name}
                className="h-full w-full object-contain filter transition-all duration-300 group-hover:brightness-110"
              />
            </div>
          ) : (
            <div className="from-accent/30 to-primary/30 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
              <span className="text-accent group-hover:text-primary text-2xl font-bold transition-colors duration-300">
                {technology.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Animated border */}
          <div className="group-hover:border-accent/50 absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300"></div>
        </div>

        {/* Technology Name */}
        <h3 className="font-victor text-text group-hover:text-accent line-clamp-2 text-sm font-semibold transition-colors duration-300">
          {technology.name}
        </h3>

        {/* Decorative dots */}
        <div className="flex space-x-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="bg-accent h-1 w-1 animate-pulse rounded-full"></div>
          <div
            className="bg-primary h-1 w-1 animate-pulse rounded-full"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="bg-secondary h-1 w-1 animate-pulse rounded-full"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyShow;
