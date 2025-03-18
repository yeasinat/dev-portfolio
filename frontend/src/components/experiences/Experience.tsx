import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from "react-icons/fi";

// Sample data for demonstration
const sampleExperiences = [
  {
    id: "1",
    position: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    description:
      "Led the development of the company's flagship SaaS product. Implemented new features, improved performance, and mentored junior developers. Worked with React, TypeScript, and GraphQL to build scalable frontend solutions.",
  },
  {
    id: "2",
    position: "Frontend Developer",
    company: "WebSolutions",
    description:
      "Developed responsive web applications for various clients. Created reusable component libraries and implemented CI/CD pipelines. Improved application performance by 30% through code optimization and modern web techniques.",
  },
  {
    id: "3",
    position: "Junior Web Developer",
    company: "StartupX",
    description:
      "Assisted in building user interfaces for an e-commerce platform. Collaborated with designers to implement pixel-perfect designs. Participated in code reviews and contributed to the company's design system.",
  },
];

const Experience = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-primary text-3xl font-bold">
            Experiences
          </h1>
          <p className="font-victor text-text/80 mt-2">
            Manage your professional experience and work history
          </p>
        </div>
        <button className="bg-secondary font-poppins text-text hover:bg-secondary/80 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors">
          <FiPlus /> Add Experience
        </button>
      </div>

      {/* Empty state */}
      {sampleExperiences.length === 0 && (
        <div className="border-secondary/20 bg-secondary/5 flex h-60 flex-col items-center justify-center rounded-lg border p-6 text-center">
          <FiBriefcase className="text-primary/50 mb-3 text-4xl" />
          <h3 className="font-poppins text-primary mb-2 text-lg font-medium">
            No experiences yet
          </h3>
          <p className="font-victor text-text/70">
            Add your professional experiences to showcase in your portfolio.
          </p>
          <button className="bg-secondary font-poppins text-text hover:bg-secondary/80 mt-4 rounded-md px-4 py-2 text-sm transition-colors">
            Add Your First Experience
          </button>
        </div>
      )}

      {/* Experiences List */}
      {sampleExperiences.length > 0 && (
        <div className="space-y-5">
          {sampleExperiences.map((experience) => (
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
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="text-text/70 hover:bg-secondary/20 rounded p-2 hover:text-red-400"
                    aria-label={`Delete ${experience.position} at ${experience.company}`}
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

export default Experience;
