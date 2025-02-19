import { useState } from "react";
import { Card } from "../ui/card";
import Select from "../ui/select";
import StatsCard from "./StatsCard";
import { useStats } from "../../hooks/useStats";
import StatsCardSkeleton from "../statSkeleton";
import NotFound from "../ui/not-found";
import { ErrorDisplay } from "../erroDisplay";

const StatsViewer = () => {
  const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
  const [date, setDate] = useState("");

  const { data: stats, isLoading, error } = useStats({ viewType, date });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newDate = e.target.value;
      // Basic date validation
      if (newDate) {
        const [year, month, day] = newDate.split("-").map(Number);
        if (viewType === "daily" && (!year || !month || !day)) {
          throw new Error("Invalid date format");
        }
        if (viewType === "monthly" && (!year || !month)) {
          throw new Error("Invalid date format");
        }
      }
      setDate(newDate);
    } catch (error) {
      if (error instanceof Error) {
        // Handle validation error locally
        console.error("Date validation error:", error.message);
      }
      // Clear invalid date
      setDate("");
    }
  };

  const handleViewTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewType(e.target.value as "daily" | "monthly");
    setDate("");
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Earthquake Statistics</h2>
          <Select
            value={viewType}
            onChange={handleViewTypeChange}
            className="w-40"
          >
            <option value="daily">Daily View</option>
            <option value="monthly">Monthly View</option>
          </Select>
        </div>

        <div className="space-y-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select {viewType === "daily" ? "Date" : "Month"}
              </label>
              <input
                type={viewType === "daily" ? "date" : "month"}
                value={date}
                onChange={handleDateChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="2000-01-01"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </div>
          )}

          {error && <ErrorDisplay error={error} />}
          {!isLoading && !error && !stats && (
            <NotFound
              title="No Statistics Available"
              message={`Select a ${
                viewType === "daily" ? "date" : "month"
              } to view statistics`}
            />
          )}

          {!isLoading && stats && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatsCard
                title="Maximum Frequency"
                value={stats.max}
                unit="Hz"
                color="red"
              />
              <StatsCard
                title="Minimum Frequency"
                value={stats.min}
                unit="Hz"
                color="blue"
              />
              <StatsCard
                title="Total Readings"
                value={stats.count}
                unit="readings"
                color="green"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatsViewer;
