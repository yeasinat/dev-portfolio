import { useQuery } from "@tanstack/react-query";

import { fetchUser } from "../api/userApi";
import { fetchExperiences } from "../api/expApi";
import { fetchProjects } from "../api/projectApi";
import { fetchTechs } from "../api/techApi";

function useFront() {
  const { data: devData, isLoading: devDataLoading } = useQuery({
    queryKey: ["devData"],
    queryFn: fetchUser,
  });

  const { data: expData, isLoading: expDataLoading } = useQuery({
    queryKey: ["expData"],
    queryFn: fetchExperiences,
  });

  const { data: projectData, isLoading: projectDataLoading } = useQuery({
    queryKey: ["projectData"],
    queryFn: fetchProjects,
  });

  const { data: techsData, isLoading: techDataLoading } = useQuery({
    queryKey: ["techData"],
    queryFn: fetchTechs,
  });

  return {
    devData,
    devDataLoading,
    expData,
    expDataLoading,
    projectData,
    projectDataLoading,
    techsData,
    techDataLoading,
  };
}

export { useFront };
