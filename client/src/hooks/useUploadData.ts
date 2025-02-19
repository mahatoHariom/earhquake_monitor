import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

interface UploadResponse {
  success: boolean;
  message: string;
}

export const useUploadData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const content = await file.text();
      return apiClient.post<UploadResponse>("/load-data", {
        fileContent: content,
      });
    },
    onSuccess: () => {
      // Invalidate both monthly and daily queries
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["frequency"] });
    },
  });
};
