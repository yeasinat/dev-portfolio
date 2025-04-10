import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FiEdit2 } from "react-icons/fi";
import { fetchUser } from "../../api/userApi";

const SidebarProfile = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  return (
    <div className="text-accent mb-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
          {isLoading ? (
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-400"></div>
          ) : isError ? (
            <span className="text-sm font-bold text-red-500">!</span>
          ) : user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="flex h-10 w-10 items-center justify-center rounded-full object-scale-down"
            />
          ) : (
            <span className="text-sm font-bold">
              {user?.name?.charAt(0) || "U"}
            </span>
          )}
        </div>

        <div>
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
              <div className="h-2 w-12 animate-pulse rounded bg-gray-300"></div>
            </div>
          ) : isError ? (
            <p className="font-poppins text-sm text-red-500">
              Error loading user
            </p>
          ) : (
            <>
              <p className="font-poppins text-sm">
                {user?.name || "Unknown User"}
              </p>
              <p className="text-accent/70 text-xs">
                {user?.role || "Unknown Role"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Edit button - only show when user data is loaded */}
      {!isLoading && !isError && (
        <Link
          to="/dashboard/devdetails"
          className="group border-accent/20 hover:border-accent/50 hover:bg-accent/10 ml-2 flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
          title="Edit profile"
        >
          <FiEdit2 className="text-accent/50 group-hover:text-accent h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export default SidebarProfile;
