import { Card, CardContent } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  color: "blue" | "green" | "red";
}

const StatsCard = ({ title, value, unit, color }: StatsCardProps) => {
  const colorClasses = {
    red: "text-red-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>
            {value.toFixed(2)} {unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
