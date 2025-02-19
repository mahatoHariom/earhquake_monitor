import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { StatsResponse } from "@/types";
import { formatApiError } from "@/lib/errorUtils";
// import { formatApiError } from "../";

interface StatsParams {
  viewType: "daily" | "monthly";
  date: string;
}

export const useStats = ({ viewType, date }: StatsParams) => {
  return useQuery<StatsResponse, Error>({
    queryKey: ["stats", viewType, date],
    queryFn: async () => {
      if (!date) {
        throw new Error("Please select a date");
      }

      try {
        let path = "/readings/";
        const dateParams = new URLSearchParams();

        if (viewType === "daily") {
          const [year, month, day] = date.split("-").map(Number);
          if (
            !year ||
            !month ||
            !day ||
            isNaN(year) ||
            isNaN(month) ||
            isNaN(day)
          ) {
            throw new Error("Invalid date format");
          }
          if (month < 1 || month > 12) {
            throw new Error("Invalid month");
          }
          if (day < 1 || day > 31) {
            throw new Error("Invalid day");
          }
          dateParams.set("year", year.toString());
          dateParams.set("month", month.toString());
          dateParams.set("day", day.toString());
          path += `daily?${dateParams.toString()}`;
        } else {
          const [year, month] = date.split("-").map(Number);
          if (!year || !month || isNaN(year) || isNaN(month)) {
            throw new Error("Invalid date format");
          }
          if (month < 1 || month > 12) {
            throw new Error("Invalid month");
          }
          dateParams.set("year", year.toString());
          dateParams.set("month", month.toString());
          path += `monthly?${dateParams.toString()}`;
        }

        return await apiClient.get<StatsResponse>(path);
      } catch (error) {
        throw new Error(formatApiError(error));
      }
    },
    enabled: !!date,
    retry: (failureCount, error) => {
      // Don't retry on validation errors
      if (error.message.includes("Invalid")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
