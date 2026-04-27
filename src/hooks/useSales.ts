import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSales, type SalesQuery } from "@/services/salesApi";

export function useSales(query: SalesQuery) {
  return useQuery({
    queryKey: ["sales", query],
    queryFn: () => getSales(query),
    placeholderData: keepPreviousData,
  });
}
