import { Card } from "../ui/card";
import { useUploadData } from "../../hooks/useUploadData";
// import { Button } from "../ui/button";

const DataUploader = () => {
  const { mutate: uploadData, isPending, error } = useUploadData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadData(file);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Data</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              File Format
            </h3>
            <pre className="text-xs text-gray-600 bg-white p-2 rounded">
              20230110 500 200 100 20230219 0.4 80 20230111 0.9 0.1
            </pre>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              disabled={isPending}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error instanceof Error ? error.message : "Upload failed"}
            </p>
          )}

          {isPending && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DataUploader;
