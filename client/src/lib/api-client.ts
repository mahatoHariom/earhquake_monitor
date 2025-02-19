import { env } from "../config/env";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    // Ensure baseUrl doesn't end with a slash
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  }

  private buildUrl(path: string): string {
    // Ensure path starts with a slash
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(this.buildUrl(path));
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(this.buildUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient(env.apiBaseUrl);
