import { useState } from "react";
import { FiFolder, FiAward, FiCode, FiTrendingUp } from "react-icons/fi";

const Overview = () => {
  // Sample data - replace with actual data fetching
  const [stats, setStats] = useState({
    projects: 12,
    experiences: 5,
    technologies: 18,
    views: 247,
  });

  const [recentProjects, setRecentProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      tech: "React, Node.js",
      date: "2025-02-18",
    },
    {
      id: 2,
      name: "Portfolio Website",
      tech: "React, TailwindCSS",
      date: "2025-01-30",
    },
    {
      id: 3,
      name: "Mobile App",
      tech: "React Native, Firebase",
      date: "2025-01-15",
    },
  ]);

  const quotes = [
    "The best way to predict the future is to create it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    "The only way to learn a new programming language is by writing programs in it.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-poppins text-primary text-3xl font-bold">
          Dashboard Overview
        </h1>
        <p className="font-victor text-text/80 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiFolder className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Projects</p>
              <h3 className="font-poppins text-primary text-2xl font-bold">
                {stats.projects}
              </h3>
            </div>
          </div>
        </div>

        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiAward className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Experiences</p>
              <h3 className="font-poppins text-primary text-2xl font-bold">
                {stats.experiences}
              </h3>
            </div>
          </div>
        </div>

        <div className="border-secondary/20 bg-secondary/5 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-3">
              <FiCode className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-victor text-text/70">Technologies</p>
              <h3 className="font-poppins text-primary text-2xl font-bold">
                {stats.technologies}
              </h3>
            </div>
          </div>
        </div>

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
              {recentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="font-poppins text-text py-3">
                    {project.name}
                  </td>
                  <td className="font-victor text-text/80 py-3">
                    {project.tech}
                  </td>
                  <td className="font-jetBrains text-text/70 py-3 text-sm">
                    {new Date(project.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Motivation Quote */}
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
        <button className="bg-secondary font-poppins text-text hover:bg-secondary/80 rounded-md px-6 py-3 text-sm font-medium transition-colors duration-300">
          Add New Project
        </button>
      </div>
    </div>
  );
};

export default Overview;
