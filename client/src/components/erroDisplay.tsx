interface ErrorDisplayProps {
  error: Error | null;
  className?: string;
}

export const ErrorDisplay = ({ error, className = "" }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className={`p-4 bg-red-50 text-red-700 rounded-lg ${className}`}>
      <p className="text-sm font-medium">{error.message}</p>
    </div>
  );
};
