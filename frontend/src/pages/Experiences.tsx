import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceShow from "../components/ui/ExperienceShow";
import Button from "../components/ui/Button";
import { useFront } from "../hooks/useFront";
import { ExperienceProps } from "../types/types";
import { HiBriefcase, HiPlus, HiTrendingUp } from "react-icons/hi";

const ExperiencesPage = () => {
  const { expData, expDataLoading } = useFront();

  // Loading state with skeleton
  if (expDataLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <div className="bg-accent/20 mx-auto mb-4 h-12 w-96 animate-pulse rounded-lg"></div>
          <div className="bg-text/20 mx-auto h-6 w-[600px] animate-pulse rounded-lg"></div>
        </div>

        <div className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex animate-pulse gap-6">
              <div className="bg-accent/20 h-12 w-12 flex-shrink-0 rounded-full"></div>
              <div className="glass flex-1 rounded-xl p-6">
                <div className="bg-text/20 mb-3 h-6 w-3/4 rounded"></div>
                <div className="bg-text/20 mb-4 h-4 w-1/2 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-text/20 h-4 w-full rounded"></div>
                  <div className="bg-text/20 h-4 w-4/5 rounded"></div>
                  <div className="bg-text/20 h-4 w-3/4 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!expData || expData.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-16">
        <div className="text-center">
          <div className="from-accent/20 to-primary/20 mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br">
            <HiBriefcase className="text-accent/60 text-6xl" />
          </div>
          <h2 className="font-jetBrains text-text mb-4 text-3xl font-bold">
            No Experience Added Yet
          </h2>
          <p className="font-victor text-text/70 mx-auto mb-8 max-w-md text-lg">
            Professional experiences and career milestones will appear here once
            they're added to your portfolio.
          </p>
          <Button variant="primary">
            <HiPlus className="mr-2" fontSize={20} />
            Add Experience
          </Button>
        </div>
      </div>
    );
  }

  // Calculate total years of experience
  const totalYearsExperience = expData.reduce(
    (total: number, exp: ExperienceProps) => {
      if (exp.startDate) {
        const startDate = new Date(exp.startDate);
        const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
        const years =
          (endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24 * 365);
        return total + years;
      }
      return total;
    },
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-accent/5 animate-float absolute top-1/4 left-1/3 h-96 w-96 rounded-full blur-3xl"></div>
        <div
          className="bg-primary/5 animate-float absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full blur-3xl"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="animate-fade-in mb-16 text-center">
        <h1 className="font-jetBrains text-text mb-6 text-4xl font-bold md:text-6xl">
          Professional{" "}
          <span className="from-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <p className="font-victor text-text/80 mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl">
          Explore my professional journey, the companies I've worked with, and
          the impact I've made throughout my career in software development.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-accent font-jetBrains flex items-center justify-center gap-2 text-3xl font-bold">
              <HiTrendingUp />
              {Math.ceil(totalYearsExperience)}+
            </div>
            <div className="text-text/60 font-victor text-sm">
              Years Experience
            </div>
          </div>
          <div className="bg-accent/30 h-12 w-px"></div>
          <div className="text-center">
            <div className="text-primary font-jetBrains text-3xl font-bold">
              {expData.length}
            </div>
            <div className="text-text/60 font-victor text-sm">
              Companies Worked
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Custom timeline styles */}
        <style>{`
          .vertical-timeline::before {
            background: linear-gradient(to bottom, #32e9c1, #90d7c8, #208f77) !important;
            width: 4px !important;
            left: 50% !important;
            margin-left: -2px !important;
          }
          
          .vertical-timeline-element-date {
            color: #32e9c1 !important;
            font-family: 'Victor Mono', monospace !important;
            font-weight: 600 !important;
          }

          /* Alternating timeline hover effects */
          .vertical-timeline-element:nth-child(odd) .vertical-timeline-element-content:hover {
            transform: translateY(-2px) translateX(5px) !important;
          }

          .vertical-timeline-element:nth-child(even) .vertical-timeline-element-content:hover {
            transform: translateY(-2px) translateX(-5px) !important;
          }

          @media only screen and (max-width: 1169px) {
            .vertical-timeline::before {
              left: 40px !important;
            }
            
            .vertical-timeline-element-date {
              color: #32e9c1 !important;
            }

            .vertical-timeline-element:nth-child(odd) .vertical-timeline-element-content:hover,
            .vertical-timeline-element:nth-child(even) .vertical-timeline-element-content:hover {
              transform: translateY(-2px) translateX(5px) !important;
            }
          }
        `}</style>

        <VerticalTimeline animate={true}>
          {expData
            .sort((a: ExperienceProps, b: ExperienceProps) => {
              // Sort by start date, most recent first
              const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
              const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
              return dateB - dateA;
            })
            .map((exp: ExperienceProps, index: number) => (
              <div
                key={exp.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ExperienceShow
                  experience={exp}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              </div>
            ))}
        </VerticalTimeline>
      </div>

      {/* Call to Action */}
      {/* <div className="mt-20 text-center">
        <div className="glass mx-auto max-w-2xl rounded-2xl p-8">
          <h3 className="font-jetBrains text-text mb-4 text-2xl font-bold">
            Ready for New Opportunities
          </h3>
          <p className="font-victor text-text/80 mb-6">
            I'm always excited to take on new challenges and contribute to
            innovative projects that make a difference.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              View My Work
            </Button>
            <Button variant="outline" size="lg">
              Get In Touch
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ExperiencesPage;
