export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(`${errorData.message}`);
    }

    return response.json();
  }

  public async get<T>(endpoint: string): Promise<T> {
    console.log("base url >> ", this.baseUrl);
    return this.request<T>(endpoint, { method: "GET" });
  }

  public async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
