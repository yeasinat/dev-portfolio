import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateUser } from "../api/userApi";

const useDev = () => {
  const {
    data: devData,
    isError: devDataError,
    isLoading: devDataLoading,
  } = useQuery({
    queryKey: ["devDetails"],
    queryFn: fetchUser,
  });

  return { devData, devDataError, devDataLoading };
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateUser(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["devDetails"] });
    },
  });
};

export { useDev, useUpdateUser };
