import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/app/components/dashboard/home/dashboard.service";

export function useDashboard() {
  const {
    data: stats = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  return {
    stats,
    isLoading,
    error,
    refetch,
  };
}