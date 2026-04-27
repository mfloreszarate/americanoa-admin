import { sampleSales } from "@/data/sales";
import { API_URL, apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/types/api";
import type { SaleRow, SaleStatus } from "@/types/sale";
import type { SortDirection } from "@/hooks/usePaginatedTable";
import type { AxiosResponse } from "axios";

export interface SalesQuery {
  search?: string;
  status?: SaleStatus[];
  page?: number;
  pageSize?: number;
  sortBy?: keyof SaleRow | string;
  sortDir?: SortDirection;
}

const API_DELAY_MS = 350;

function serializeSalesQuery(query: SalesQuery) {
  return {
    search: query.search || undefined,
    status: query.status?.length ? query.status.join(",") : undefined,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    sortBy: query.sortBy ?? "dateTime",
    sortDir: query.sortDir ?? "desc",
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function compareSaleValues(
  left: SaleRow,
  right: SaleRow,
  sortBy: string,
  sortDir: SortDirection,
) {
  const direction = sortDir === "asc" ? 1 : -1;
  const leftValue = left[sortBy as keyof SaleRow];
  const rightValue = right[sortBy as keyof SaleRow];

  if (typeof leftValue === "number" && typeof rightValue === "number") {
    return (leftValue - rightValue) * direction;
  }

  return String(leftValue ?? "").localeCompare(String(rightValue ?? "")) * direction;
}

export async function getSales(
  query: SalesQuery,
): Promise<PaginatedResponse<SaleRow>> {
  // const { data } = await apiClient.get<AxiosResponse<PaginatedResponse<SaleRow>>>("/sales/list-page", {
  //   params: serializeSalesQuery(query),
  // });

  // return data.data;
  return {
    data: sampleSales,
    total: sampleSales.length,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
  };
}
