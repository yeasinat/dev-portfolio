import {
  FiFolder,
  FiAward,
  FiCode,
  FiTrendingUp,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { fetchProjects } from "../../api/projectApi";
import { fetchExperiences } from "../../api/expApi";
import { fetchTechs } from "../../api/techApi";
import { ProjectProps } from "../../types/types";

const Overview = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const {
    data: experiences,
    isLoading: experiencesLoading,
    isError: experiencesError,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  const {
    data: technologies,
    isLoading: technologiesLoading,
    isError: technologiesError,
  } = useQuery({
    queryKey: ["technologies"],
    queryFn: fetchTechs,
  });

  // Loading state for entire dashboard
  const isLoading =
    projectsLoading || experiencesLoading || technologiesLoading;

  // Error state for important sections
  const hasErrors = projectsError || experiencesError || technologiesError;

  const stats = {
    projects: projects?.length || 0,
    experiences: experiences?.length || 0,
    technologies: technologies?.length || 0,
    views: 247,
  };

  const quotes = [
    "The best way to predict the future is to create it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    "The only way to learn a new programming language is by writing programs in it.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return isLoading ? (
    <div className="flex h-screen flex-col items-center justify-center py-20">
      <div className="bg-secondary/10 rounded-full p-4">
        <FiLoader className="text-accent animate-spin text-3xl" />
      </div>
      <h3 className="font-poppins text-primary mt-4 text-xl font-medium">
        Loading dashboard...
      </h3>
      <p className="font-victor text-text/70 mt-2">
        Fetching your portfolio data
      </p>
    </div>
  ) : (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-poppins text-primary text-3xl font-bold">
          Dashboard Overview
        </h1>
        <p className="font-victor text-text/80 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Error Banner - Show if any query has an error */}
      {hasErrors && (
        <div className="rounded-lg border border-red-400/30 bg-red-50/10 p-4">
          <div className="flex items-center">
            <FiAlertTriangle className="mr-2 text-xl text-red-400" />
            <h3 className="font-poppins text-text font-medium">
              There were issues loading some data
            </h3>
          </div>
          <p className="font-victor text-text/80 mt-2">
            Some dashboard sections might show incomplete information. Try
            refreshing the page.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Projects Card */}
        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiFolder className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Projects</p>
              {projectsLoading ? (
                <div className="bg-secondary/20 h-8 w-16 animate-pulse rounded"></div>
              ) : projectsError ? (
                <p className="font-poppins text-sm text-red-400">
                  Error loading
                </p>
              ) : (
                <h3 className="font-poppins text-primary text-2xl font-bold">
                  {stats.projects}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Experiences Card */}
        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiAward className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Experiences</p>
              {experiencesLoading ? (
                <div className="bg-secondary/20 h-8 w-16 animate-pulse rounded"></div>
              ) : experiencesError ? (
                <p className="font-poppins text-sm text-red-400">
                  Error loading
                </p>
              ) : (
                <h3 className="font-poppins text-primary text-2xl font-bold">
                  {stats.experiences}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Technologies Card */}
        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiCode className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Technologies</p>
              {technologiesLoading ? (
                <div className="bg-secondary/20 h-8 w-16 animate-pulse rounded"></div>
              ) : technologiesError ? (
                <p className="font-poppins text-sm text-red-400">
                  Error loading
                </p>
              ) : (
                <h3 className="font-poppins text-primary text-2xl font-bold">
                  {stats.technologies}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Views Card - Static data, no loading state needed */}
        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiTrendingUp className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Portfolio Views</p>
              <h3 className="font-poppins text-primary text-2xl font-bold">
                {stats.views}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
        <h2 className="font-poppins text-accent mb-4 text-xl font-bold">
          Recent Projects
        </h2>
        {projectsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-secondary/10 h-12 w-full animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : projectsError ? (
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <FiAlertTriangle className="mx-auto text-3xl text-red-400" />
              <p className="font-victor text-text/70 mt-2">
                Could not load projects data. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-secondary/20 hover:bg-secondary/30 mt-4 rounded px-4 py-2 text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-secondary/30 border-b">
                <tr>
                  <th className="font-jetBrains text-text/70 pb-3 text-left text-sm font-medium">
                    Project Name
                  </th>
                  <th className="font-jetBrains text-text/70 pb-3 text-left text-sm font-medium">
                    Technologies
                  </th>
                  <th className="font-jetBrains text-text/70 pb-3 text-left text-sm font-medium">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-secondary/10 divide-y">
                {projects.map((project: ProjectProps) => (
                  <tr key={project.id}>
                    <td className="font-poppins text-text py-3">
                      {project.title}
                    </td>
                    <td className="font-victor text-text/80 py-3">
                      {project.technologiesUsed}
                    </td>
                    <td className="font-jetBrains text-text/70 py-3 text-sm">
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "No date available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <p className="font-victor text-text/70">
                No projects found. Get started by adding your first project.
              </p>
              <Link
                to="/dev-portfolio/dashboard/projects"
                className="bg-secondary font-poppins text-text hover:bg-secondary/80 mt-4 inline-block rounded-md px-4 py-2 text-sm transition-colors"
              >
                Add Project
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Motivation Quote - No loading state needed as it's local data */}
      <div className="border-accent/30 bg-accent/5 rounded-lg border p-6 shadow-sm">
        <div className="flex items-start">
          <div className="font-fancy text-accent text-4xl">"</div>
          <div className="mx-2">
            <p className="font-victor text-text/90 text-lg italic">
              {randomQuote}
            </p>
            <p className="font-jetBrains text-accent/80 mt-4 text-right text-sm">
              — Keep coding, keep creating
            </p>
          </div>
          <div className="font-fancy text-accent text-4xl">"</div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Link
          to="/dev-portfolio/dashboard/projects"
          className="bg-secondary font-poppins text-text hover:bg-secondary/80 rounded-md px-6 py-3 text-sm font-medium transition-colors duration-300"
        >
          Add New Project
        </Link>
      </div>
    </div>
  );
};

export default Overview;
