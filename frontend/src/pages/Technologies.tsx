import TechnologyShow from "../components/ui/TechnologyShow";
import Button from "../components/ui/Button";
import { useFront } from "../hooks/useFront";
import { TechnologyProps } from "../types/types";
import { HiCode, HiLightningBolt, HiPlus } from "react-icons/hi";

const Technologies = () => {
  const { techsData, techDataLoading } = useFront();

  // Categories for organizing technologies
  const categorizeTechnologies = (technologies: TechnologyProps[]) => {
    const categories = {
      frontend: [] as TechnologyProps[],
      backend: [] as TechnologyProps[],
      database: [] as TechnologyProps[],
      tools: [] as TechnologyProps[],
      other: [] as TechnologyProps[],
    };

    technologies.forEach((tech) => {
      const name = tech.name.toLowerCase();
      if (
        name.includes("react") ||
        name.includes("vue") ||
        name.includes("angular") ||
        name.includes("html") ||
        name.includes("css") ||
        name.includes("javascript") ||
        name.includes("typescript")
      ) {
        categories.frontend.push(tech);
      } else if (
        name.includes("node") ||
        name.includes("express") ||
        name.includes("python") ||
        name.includes("java") ||
        name.includes("php") ||
        name.includes("bun")
      ) {
        categories.backend.push(tech);
      } else if (
        name.includes("mysql") ||
        name.includes("mongo") ||
        name.includes("postgres") ||
        name.includes("redis") ||
        name.includes("sqlite")
      ) {
        categories.database.push(tech);
      } else if (
        name.includes("git") ||
        name.includes("docker") ||
        name.includes("aws") ||
        name.includes("vercel") ||
        name.includes("vscode")
      ) {
        categories.tools.push(tech);
      } else {
        categories.other.push(tech);
      }
    });

    return categories;
  };

  // Loading state with skeleton
  if (techDataLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <div className="bg-accent/20 mx-auto mb-4 h-12 w-80 animate-pulse rounded-lg"></div>
          <div className="bg-text/20 mx-auto h-6 w-[500px] animate-pulse rounded-lg"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {[...Array(16)].map((_, index) => (
            <div
              key={index}
              className="glass h-24 animate-pulse rounded-xl p-4"
            >
              <div className="bg-accent/20 mx-auto mb-2 h-12 w-12 rounded-lg"></div>
              <div className="bg-text/20 h-3 w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!techsData || techsData.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
        <div className="text-center">
          <div className="from-accent/20 to-primary/20 mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br">
            <HiCode className="text-accent/60 text-6xl" />
          </div>
          <h2 className="font-jetBrains text-text mb-4 text-3xl font-bold">
            No Technologies Yet
          </h2>
          <p className="font-victor text-text/70 mx-auto mb-8 max-w-md text-lg">
            Technologies and skills will appear here once they're added to your
            portfolio.
          </p>
          <Button variant="primary">
            <HiPlus className="mr-2" fontSize={20} />
            Add Technologies
          </Button>
        </div>
      </div>
    );
  }

  const categories = categorizeTechnologies(techsData);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-accent/5 animate-float absolute top-1/3 left-1/4 h-80 w-80 rounded-full blur-3xl"></div>
        <div
          className="bg-primary/5 animate-float absolute right-1/3 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="animate-fade-in mb-16 text-center">
        <h1 className="font-jetBrains text-text mb-6 text-4xl font-bold md:text-6xl">
          <span className="from-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
            Technologies
          </span>{" "}
          & Skills
        </h1>
        <p className="font-victor text-text/80 mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl">
          Explore the diverse range of technologies and tools I use to bring
          ideas to life and build modern, scalable applications.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-accent font-jetBrains flex items-center justify-center gap-2 text-3xl font-bold">
              <HiLightningBolt />
              {techsData.length}
            </div>
            <div className="text-text/60 font-victor text-sm">
              Technologies Mastered
            </div>
          </div>
        </div>
      </div>

      {/* All Technologies Grid - if no categories or showing all */}
      {Object.values(categories).every((cat) => cat.length === 0) ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {techsData.map((tech: TechnologyProps, index: number) => (
            <div
              key={tech.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TechnologyShow technology={tech} />
            </div>
          ))}
        </div>
      ) : (
        /* Categorized Technologies */
        <div className="space-y-12">
          {Object.entries(categories).map(
            ([categoryName, technologies]) =>
              technologies.length > 0 && (
                <div key={categoryName} className="animate-fade-in">
                  {/* Category Header */}
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-jetBrains text-text text-2xl font-bold capitalize">
                      {categoryName}
                    </h2>
                    <div className="from-accent/50 h-px flex-1 bg-gradient-to-r to-transparent"></div>
                    <span className="text-accent font-victor text-sm">
                      {technologies.length}{" "}
                      {technologies.length === 1
                        ? "technology"
                        : "technologies"}
                    </span>
                  </div>

                  {/* Technologies Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                    {technologies.map(
                      (tech: TechnologyProps, index: number) => (
                        <div
                          key={tech.id}
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <TechnologyShow technology={tech} />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <div className="glass mx-auto max-w-2xl rounded-2xl p-8">
          <h3 className="font-jetBrains text-text mb-4 text-2xl font-bold">
            Always Learning & Growing
          </h3>
          <p className="font-victor text-text/80 mb-6">
            Technology evolves rapidly, and I'm committed to staying updated
            with the latest trends and best practices in development.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary">View My Projects</Button>
            <Button variant="outline">Let's Collaborate</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
